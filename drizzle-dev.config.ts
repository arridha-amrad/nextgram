import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/drizzle/schema.ts",
  out: "./src/lib/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DEV_DB_URL!,
  },
  strict: true,
  verbose: true,
} satisfies Config;
