import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  whatsappGroups,
  whatsappParticipants,
  whatsappMessages,
  whatsappMentions,
  groupMemberships,
} from "@/lib/db/schema/whatsapp";
import type { Message } from "whatsapp-web.js";

// Define types that were previously imported from wp-scraper
export interface ProcessedMessage {
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

export interface GroupInfo {
  id: string;
  name: string;
  participants: string[];
  description?: string;
  createdAt: Date;
}

export class WhatsAppDBService {
  /**
   * Save or update group information
   */
  async upsertGroup(groupInfo: GroupInfo) {
    // Insert or update group
    await db
      .insert(whatsappGroups)
      .values({
        id: groupInfo.id,
        name: groupInfo.name,
        description: groupInfo.description,
        createdAt: groupInfo.createdAt,
        lastScrapedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: whatsappGroups.id,
        set: {
          name: groupInfo.name,
          description: groupInfo.description,
          lastScrapedAt: new Date(),
        },
      });

    // Handle group memberships
    for (const participantId of groupInfo.participants) {
      // First ensure the participant exists
      await db
        .insert(whatsappParticipants)
        .values({
          id: participantId,
          phoneNumber: participantId.split("@")[0], // Extract phone number from ID
          createdAt: new Date(),
        })
        .onConflictDoNothing();

      // Then update group membership
      await db
        .insert(groupMemberships)
        .values({
          groupId: groupInfo.id,
          participantId: participantId,
          joinedAt: new Date(),
        })
        .onConflictDoNothing();
    }
  }

  /**
   * Save a message and its related data
   */
  async saveMessage(groupId: string, message: ProcessedMessage) {
    // Insert the message
    await db
      .insert(whatsappMessages)
      .values({
        id: message.messageId,
        groupId,
        senderId: message.sender,
        content: message.content,
        messageType: message.type,
        timestamp: new Date(message.timestamp * 1000),
        ...(message.quotedMessage && {
          quotedMessageId: message.quotedMessage.messageId,
        }),
      })
      .onConflictDoNothing();

    // Insert mentions if any
    if (message.mentions && message.mentions.length > 0) {
      const mentionsData = message.mentions.map(participantId => ({
        messageId: message.messageId,
        participantId,
      }));

      await db.insert(whatsappMentions).values(mentionsData).onConflictDoNothing();
    }
  }

  /**
   * Get the last scraped timestamp for a group
   */
  async getLastScrapedTimestamp(groupId: string): Promise<Date | null> {
    const result = await db
      .select({ lastScrapedAt: whatsappGroups.lastScrapedAt })
      .from(whatsappGroups)
      .where(eq(whatsappGroups.id, groupId))
      .limit(1);

    return result[0]?.lastScrapedAt ?? null;
  }

  /**
   * Get messages from a specific time range
   */
  async getMessages(groupId: string, fromDate?: Date, toDate?: Date) {
    const conditions = [eq(whatsappMessages.groupId, groupId)];

    if (fromDate) {
      conditions.push(gte(whatsappMessages.timestamp, fromDate));
    }
    if (toDate) {
      conditions.push(lte(whatsappMessages.timestamp, toDate));
    }

    return await db
      .select()
      .from(whatsappMessages)
      .where(and(...conditions));
  }
}
