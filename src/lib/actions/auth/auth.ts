// Schemas
import { loginSchema } from "@/lib/schemas/login";

// Auth
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";

// Database
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "no-reply@kubrick.pro",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});

export async function handleLogin(formData: FormData) {
  "use server";

  const rawData = Object.fromEntries(formData.entries());
  const result = loginSchema.safeParse(rawData);

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const { email } = result.data;

  await signIn("resend", { email }, { redirectTo: "/dashboard" });
}
