export const NEXT_PUBLIC_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PRO_NEXT_PUBLIC_BASE_URL
    : process.env.DEV_NEXT_PUBLIC_BASE_URL;
