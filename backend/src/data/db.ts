import { Pool } from 'pg';

import { env } from '../config/env';

let pool: Pool | null = null;

const hasDatabase = Boolean(env.DATABASE_URL);

if (hasDatabase) {
  pool = new Pool({
    connectionString: env.DATABASE_URL,
    max: 8,
    idleTimeoutMillis: 10_000
  });

  pool.on('error', (error) => {
    console.error('Unexpected Postgres error', error);
  });
}

export const database = {
  enabled: hasDatabase,
  getPool(): Pool {
    if (!pool) {
      throw new Error('Database connection is not configured. Set DATABASE_URL to enable Postgres persistence.');
    }
    return pool;
  }
};
