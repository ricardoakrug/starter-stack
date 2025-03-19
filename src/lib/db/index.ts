import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/lib/db/schema';
import { handleError, logError } from '@/lib/security/error-handling';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

// Parse the connection string to ensure it's valid
const connectionString = process.env.DATABASE_URL;
if (!connectionString.startsWith('postgres://') && !connectionString.startsWith('postgresql://')) {
  throw new Error('Invalid database URL format');
}

// Configure connection pool with security settings
const client = postgres(connectionString, {
  max: 10, // Maximum number of connections in the pool
  idle_timeout: 20, // Max idle time in seconds
  connect_timeout: 10, // Connection timeout in seconds
  ssl: {
    rejectUnauthorized: true, // Verify SSL certificate
    require: true, // Require SSL connection
  },
  prepare: false, // Disable prepared statements for better security
  max_lifetime: 60 * 60 * 1000, // Connection lifetime in milliseconds (1 hour)
  transform: {
    undefined: null, // Transform undefined to null
  },
});

// Create a wrapper for database operations with error handling
export const db = drizzle(client, { schema });

// Helper function to execute database operations with error handling
export async function withTransaction<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    logError(error, 'Database operation failed');
    throw handleError(error);
  }
}

// Export a function to check database connection
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await client`SELECT 1`;
    return true;
  } catch (error) {
    logError(error, 'Database connection check failed');
    return false;
  }
}
