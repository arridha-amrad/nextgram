import { Pool } from "@neondatabase/serverless";
import { ExtractTablesWithRelations } from "drizzle-orm";
import {
  drizzle as neonDrizzle,
  NeonQueryResultHKT,
} from "drizzle-orm/neon-serverless";
import { PgTransaction } from "drizzle-orm/pg-core";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";

export const db =
  process.env.NODE_ENV === "development"
    ? pgDrizzle(process.env.DEV_DB_URL!)
    : neonDrizzle(pool, {
        schema,
      });

export type DrizzleDatabase = typeof db;
export type DrizzleTransactionDatabase = PgTransaction<
  NeonQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;
