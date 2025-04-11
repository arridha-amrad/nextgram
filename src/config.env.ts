import envSchema, { JSONSchemaType } from "env-schema";

type Env = {
  AUTH_GITHUB_ID: string;
  AUTH_GITHUB_SECRET: string;
  AUTH_GOOGLE_ID: string;
  AUTH_GOOGLE_SECRET: string;
  AUTH_SECRET: string;
  BASE_URL: string;
  DB_URL: string;
  GOOGLE_REFRESH_TOKEN: string;
  GOOGLE_USER: string;
  TOKEN_SECRET_KEY: string;
  NEXT_PUBLIC_BASE_URL: string;
};

const schema: JSONSchemaType<Env> = {
  type: "object",
  required: [
    "AUTH_GITHUB_ID",
    "AUTH_GITHUB_SECRET",
    "AUTH_GOOGLE_ID",
    "AUTH_GOOGLE_SECRET",
    "AUTH_SECRET",
    "BASE_URL",
    "DB_URL",
    "GOOGLE_REFRESH_TOKEN",
    "GOOGLE_USER",
    "TOKEN_SECRET_KEY",
    "NEXT_PUBLIC_BASE_URL",
  ],
  properties: {
    AUTH_GITHUB_ID: {
      type: "string",
    },
    AUTH_GITHUB_SECRET: {
      type: "string",
    },
    AUTH_GOOGLE_ID: {
      type: "string",
    },
    AUTH_GOOGLE_SECRET: {
      type: "string",
    },
    BASE_URL: {
      type: "string",
    },
    GOOGLE_REFRESH_TOKEN: {
      type: "string",
    },
    DB_URL: {
      type: "string",
    },
    AUTH_SECRET: {
      type: "string",
    },
    GOOGLE_USER: {
      type: "string",
    },
    TOKEN_SECRET_KEY: {
      type: "string",
    },
    NEXT_PUBLIC_BASE_URL: {
      type: "string",
    },
  },
};

const config = envSchema({
  schema,
  dotenv: true, // load .env if it is there, default: false
});

export default config;
