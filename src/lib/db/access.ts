import { db, withTransaction } from "./index";
import { eq, sql } from "drizzle-orm";
import { users, userSettings } from "./schema/auth";
import { logError } from "@/lib/security/error-handling";
import type { InferModel } from "drizzle-orm";

// Sanitize input to prevent SQL injection
function sanitizeInput(input: string): string {
  return input.replace(/[^a-zA-Z0-9_-]/g, "");
}

type User = InferModel<typeof users>;
type UserSettings = InferModel<typeof userSettings>;

// Database access layer with security checks
export const dbAccess = {
  // User operations
  users: {
    async getById(id: string) {
      const sanitizedId = sanitizeInput(id);
      return withTransaction(async () => {
        return db.select().from(users).where(eq(users.id, sanitizedId)).limit(1);
      });
    },

    async getByEmail(email: string) {
      return withTransaction(async () => {
        return db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
      });
    },

    async update(id: string, data: Partial<User>) {
      const sanitizedId = sanitizeInput(id);
      return withTransaction(async () => {
        return db
          .update(users)
          .set({
            ...data,
            updatedAt: new Date(),
          })
          .where(eq(users.id, sanitizedId));
      });
    },

    async delete(id: string) {
      const sanitizedId = sanitizeInput(id);
      return withTransaction(async () => {
        return db.delete(users).where(eq(users.id, sanitizedId));
      });
    },
  },

  // User settings operations
  settings: {
    async getByUserId(userId: string) {
      const sanitizedUserId = sanitizeInput(userId);
      return withTransaction(async () => {
        return db
          .select()
          .from(userSettings)
          .where(eq(userSettings.userId, sanitizedUserId))
          .limit(1);
      });
    },

    async update(userId: string, data: Partial<UserSettings>) {
      const sanitizedUserId = sanitizeInput(userId);
      return withTransaction(async () => {
        return db.update(userSettings).set(data).where(eq(userSettings.userId, sanitizedUserId));
      });
    },
  },

  // Audit logging
  async logAuditEvent(userId: string, action: string, details: Record<string, unknown>) {
    const sanitizedUserId = sanitizeInput(userId);
    return withTransaction(async () => {
      // In a production environment, you would want to use a dedicated audit log table
      console.log(`[AUDIT] User ${sanitizedUserId} performed ${action}:`, details);
    });
  },

  // Database health check
  async checkHealth() {
    try {
      await db.execute(sql`SELECT 1`);
      return { status: "healthy" };
    } catch (error) {
      logError(error, "Database health check failed");
      return { status: "unhealthy", error: "Database connection failed" };
    }
  },
};
