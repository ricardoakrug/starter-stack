import type { User as NextAuthUser } from "next-auth";

export interface User extends NextAuthUser {
  emailVerified?: Date | null;
}
