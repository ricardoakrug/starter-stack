import type { User as NextAuthUser } from "next-auth";
import type { InferModel } from "drizzle-orm";
import type { users, userSettings } from "@/lib/db/schema/auth";

export type User = InferModel<typeof users> & NextAuthUser;
export type UserSettings = InferModel<typeof userSettings>;
