import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/lib/db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString, {
  max: 1,
  ssl: "require",
  prepare: false,
});

export const db = drizzle(client, { schema });
