import { pgEnum } from "drizzle-orm/pg-core";

export const emailFrequencyEnum = pgEnum("email_frequency", [
  "daily",
  "weekly",
  "monthly",
]);

// Add other enums here as needed
// Example:
// export const userRoleEnum = pgEnum("user_role", ["admin", "user", "moderator"]);
// export const notificationTypeEnum = pgEnum("notification_type", ["info", "warning", "error"]);
