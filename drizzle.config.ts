import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable. Please set it in .env.local or .env');
}

try {
  const parsed = new URL(databaseUrl);
  if (parsed.protocol !== 'postgres:' && parsed.protocol !== 'postgresql:') {
    throw new Error('Invalid protocol');
  }
} catch {
  throw new Error('Invalid DATABASE_URL format. Expected a valid PostgreSQL connection URI.');
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  schemaFilter: ['public'],
  dbCredentials: { url: databaseUrl },
  verbose: true,
});
