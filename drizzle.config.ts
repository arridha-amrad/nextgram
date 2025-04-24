import { defineConfig } from "drizzle-kit";

console.log("db url : ", process.env.DB_URL);

export default defineConfig({
  schema: "./src/lib/drizzle/schema.ts", // or wherever your schema file is
  out: "./src/lib/drizzle/migrations", // optional output folder
  dialect: "postgresql", // make sure this is set to 'pg' for Postgres
  dbCredentials: {
    url: process.env.DB_URL!, // or a hardcoded string
  },
});

// export default {
//   schema: "./src/lib/drizzle/schema.ts",
//   out: "./src/lib/drizzle/migrations",
//   dialect: "postgresql",
//   dbCredentials: {

//     url: process.env.DB_URL!,
//   },
//   strict: true,
//   verbose: true,
// } satisfies Config;
