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
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
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
