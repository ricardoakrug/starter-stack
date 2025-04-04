import { Client, LocalAuth, Message, GroupChat } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

interface ProcessedMessage {
  messageId: string;
  sender: string;
  timestamp: number;
  content: string;
  type: string;
  quotedMessage?: {
    messageId: string;
    content: string;
  };
  mentions?: string[];
}

interface GroupInfo {
  id: string;
  name: string;
  participants: string[];
  description?: string;
  createdAt: Date;
}

export class WhatsAppScraper {
  private client: Client;
  private isReady: boolean = false;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: ["--no-sandbox"],
      },
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.client.on("qr", qr => {
      console.log("QR RECEIVED. Scan with WhatsApp mobile app:");
      qrcode.generate(qr, { small: true });
    });

    this.client.on("ready", () => {
      console.log("Client is ready!");
      this.isReady = true;
    });

    this.client.on("auth_failure", msg => {
      console.error("Authentication failed:", msg);
    });

    this.client.on("disconnected", reason => {
      console.log("Client was disconnected:", reason);
      this.isReady = false;
    });
  }

  public async initialize() {
    try {
      await this.client.initialize();
    } catch (error) {
      console.error("Failed to initialize WhatsApp client:", error);
      throw error;
    }
  }

  public isClientReady(): boolean {
    return this.isReady;
  }

  /**
   * Get all group chats
   */
  public async getAllGroupChats(): Promise<GroupChat[]> {
    if (!this.isReady) {
      throw new Error("Client is not ready");
    }
    const chats = await this.client.getChats();
    return chats.filter(chat => chat.isGroup) as GroupChat[];
  }

  /**
   * Get detailed information about a specific group
   */
  public async getGroupInfo(groupId: string): Promise<GroupInfo> {
    if (!this.isReady) {
      throw new Error("Client is not ready");
    }

    const chat = (await this.client.getChatById(groupId)) as GroupChat;

    if (!chat.isGroup) {
      throw new Error("Specified chat is not a group");
    }

    return {
      id: chat.id._serialized,
      name: chat.name,
      participants: chat.participants.map(p => p.id._serialized),
      description: chat.description,
      createdAt: chat.createdAt,
    };
  }

  /**
   * Process a message into a standardized format
   */
  private async processMessage(msg: Message): Promise<ProcessedMessage> {
    const quotedMsg = msg.hasQuotedMsg ? await msg.getQuotedMessage() : undefined;

    return {
      messageId: msg.id._serialized,
      sender: msg.author || msg.from,
      timestamp: msg.timestamp,
      content: msg.body,
      type: msg.type,
      ...(quotedMsg && {
        quotedMessage: {
          messageId: quotedMsg.id._serialized,
          content: quotedMsg.body,
        },
      }),
      ...(msg.mentionedIds && {
        mentions: msg.mentionedIds.map(id => id._serialized),
      }),
    };
  }

  /**
   * Get messages from a specific group chat with processing
   */
  public async getGroupMessages(
    groupId: string,
    options: {
      limit?: number;
      fromDate?: Date;
      toDate?: Date;
    } = {}
  ): Promise<ProcessedMessage[]> {
    if (!this.isReady) {
      throw new Error("Client is not ready");
    }

    const chat = (await this.client.getChatById(groupId)) as GroupChat;

    if (!chat.isGroup) {
      throw new Error("Specified chat is not a group");
    }

    const messages = await chat.fetchMessages({ limit: options.limit });

    // Filter messages by date if specified
    const filteredMessages = messages.filter(msg => {
      if (!options.fromDate && !options.toDate) return true;

      const msgDate = new Date(msg.timestamp * 1000);

      if (options.fromDate && msgDate < options.fromDate) return false;
      if (options.toDate && msgDate > options.toDate) return false;

      return true;
    });

    // Process all messages
    const processedMessages = await Promise.all(
      filteredMessages.map(msg => this.processMessage(msg))
    );

    return processedMessages;
  }

  /**
   * Listen for new messages in specific groups
   */
  public async watchGroups(groupIds: string[], callback: (message: ProcessedMessage) => void) {
    if (!this.isReady) {
      throw new Error("Client is not ready");
    }

    this.client.on("message", async msg => {
      if (groupIds.includes(msg.from)) {
        const processedMessage = await this.processMessage(msg);
        callback(processedMessage);
      }
    });
  }

  public async destroy() {
    if (this.client) {
      await this.client.destroy();
      this.isReady = false;
    }
  }
}
