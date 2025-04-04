import { Message } from "whatsapp-web.js";
import { db } from "@/lib/db";
import {
  whatsappMessages,
  whatsappParticipants,
  participantInteractions,
  participantInterests,
  messageTopics,
  messageEntities as messageEntitiesTable,
  entities as entitiesTable,
  topics,
  topicParticipants,
  participantLanguages,
  languages,
} from "@/lib/db/schema/whatsapp";
import { eq, and, sql } from "drizzle-orm";

interface AnalyzedMessage {
  sentiment: number;
  topics: string[];
  entities: {
    organizations: string[];
    locations: string[];
    products: string[];
    urls: string[];
  };
  intentType: string;
  language: string;
}

interface EntityInfo {
  name: string;
  type: "organization" | "location" | "product" | "url";
}

export class WhatsAppAnalyzer {
  /**
   * Analyze a message using AI to extract insights
   */
  private async analyzeMessage(message: Message): Promise<AnalyzedMessage> {
    // TODO: Implement actual AI analysis using your preferred AI service
    // This is a placeholder that should be replaced with real AI analysis
    return {
      sentiment: 0,
      topics: [],
      entities: {
        organizations: [],
        locations: [],
        products: [],
        urls: [],
      },
      intentType: "statement",
      language: "en",
    };
  }

  /**
   * Update participant interests based on message analysis
   */
  private async updateParticipantInterests(
    participantId: string,
    messageTopics: string[],
    confidence: number = 0.7
  ) {
    for (const topic of messageTopics) {
      await db
        .insert(participantInterests)
        .values({
          participantId,
          interestId: topic, // Note: You'll need to create/get interest IDs first
          confidence,
          firstMentioned: new Date(),
          lastMentioned: new Date(),
          mentionCount: 1,
        })
        .onConflictDoUpdate({
          target: [participantInterests.participantId, participantInterests.interestId],
          set: {
            confidence: sql`GREATEST(${participantInterests.confidence}, ${confidence})`,
            lastMentioned: new Date(),
            mentionCount: sql`${participantInterests.mentionCount} + 1`,
          },
        });
    }
  }

  /**
   * Update participant language proficiency
   */
  private async updateParticipantLanguage(
    participantId: string,
    languageCode: string,
    confidence: number = 0.7
  ) {
    // Ensure language exists
    await db
      .insert(languages)
      .values({
        code: languageCode,
        name: languageCode.toUpperCase(), // This should be properly mapped in production
      })
      .onConflictDoNothing();

    // Update participant language proficiency
    await db
      .insert(participantLanguages)
      .values({
        participantId,
        languageCode,
        proficiency: confidence,
        usageFrequency: 0.1,
      })
      .onConflictDoUpdate({
        target: [participantLanguages.participantId, participantLanguages.languageCode],
        set: {
          proficiency: sql`GREATEST(${participantLanguages.proficiency}, ${confidence})`,
          usageFrequency: sql`${participantLanguages.usageFrequency} + 0.1`,
        },
      });
  }

  /**
   * Update interaction patterns between participants
   */
  private async updateInteractions(
    senderId: string,
    messageId: string,
    messageAnalysis: AnalyzedMessage
  ) {
    const message = await db
      .select()
      .from(whatsappMessages)
      .where(eq(whatsappMessages.id, messageId))
      .limit(1);

    if (!message[0]) return;

    if (message[0].quotedMessageId) {
      const quotedMessage = await db
        .select()
        .from(whatsappMessages)
        .where(eq(whatsappMessages.id, message[0].quotedMessageId))
        .limit(1);

      if (quotedMessage[0]) {
        await this.updateParticipantInteraction(
          senderId,
          quotedMessage[0].senderId,
          messageAnalysis.sentiment
        );
      }
    }
  }

  /**
   * Update the interaction metrics between two participants
   */
  private async updateParticipantInteraction(
    participant1Id: string,
    participant2Id: string,
    sentiment: number
  ) {
    // Ensure consistent ordering of participant IDs
    const [p1, p2] = [participant1Id, participant2Id].sort();

    await db
      .insert(participantInteractions)
      .values({
        participant1_id: p1,
        participant2_id: p2,
        interactionCount: 1,
        lastInteraction: new Date(),
        relationshipStrength: 0.1 + (sentiment + 1) / 20, // Convert -1 to 1 sentiment to 0 to 0.1 bonus
      })
      .onConflictDoUpdate({
        target: [participantInteractions.participant1_id, participantInteractions.participant2_id],
        set: {
          interactionCount: sql`${participantInteractions.interactionCount} + 1`,
          lastInteraction: new Date(),
          relationshipStrength: sql`LEAST(1.0, ${participantInteractions.relationshipStrength} + ${
            0.1 + (sentiment + 1) / 20
          })`,
        },
      });
  }

  /**
   * Save message topics and update topic analysis
   */
  private async saveMessageTopics(messageId: string, topics: string[], confidence: number = 0.7) {
    for (const topic of topics) {
      await db.insert(messageTopics).values({
        messageId,
        topic,
        confidence,
      });
    }
  }

  /**
   * Convert analyzed entities to a flat list of entity info
   */
  private convertEntitiesToList(entities: AnalyzedMessage["entities"]): EntityInfo[] {
    return [
      ...entities.organizations.map(name => ({ name, type: "organization" as const })),
      ...entities.locations.map(name => ({ name, type: "location" as const })),
      ...entities.products.map(name => ({ name, type: "product" as const })),
      ...entities.urls.map(name => ({ name, type: "url" as const })),
    ];
  }

  /**
   * Save message entities
   */
  private async saveMessageEntities(
    messageId: string,
    messageEntities: AnalyzedMessage["entities"],
    confidence: number = 0.7
  ) {
    const entityList = this.convertEntitiesToList(messageEntities);

    for (const entityInfo of entityList) {
      // Insert or get entity
      const [savedEntity] = await db
        .insert(entitiesTable)
        .values({
          name: entityInfo.name,
          type: entityInfo.type,
          verified: false,
        })
        .onConflictDoUpdate({
          target: [entitiesTable.name, entitiesTable.type],
          set: {},
        })
        .returning();

      if (savedEntity) {
        // Link entity to message
        await db.insert(messageEntitiesTable).values({
          messageId,
          entityId: savedEntity.id,
          confidence,
        });
      }
    }
  }

  /**
   * Process a new message and update all analytics
   */
  public async processMessage(message: Message) {
    const analysis = await this.analyzeMessage(message);
    const messageId = message.id._serialized;

    // Update message with analysis
    await db
      .update(whatsappMessages)
      .set({
        sentiment: analysis.sentiment,
        intentType: analysis.intentType,
        language: analysis.language,
      })
      .where(eq(whatsappMessages.id, messageId));

    // Update participant interests and language
    const participantId = message.author || message.from;
    await this.updateParticipantInterests(participantId, analysis.topics);
    await this.updateParticipantLanguage(participantId, analysis.language);

    // Save message topics and entities
    await this.saveMessageTopics(messageId, analysis.topics);
    await this.saveMessageEntities(messageId, analysis.entities);

    // Update interactions
    await this.updateInteractions(participantId, messageId, analysis);
  }
}
