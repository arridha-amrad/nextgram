export const NEXT_PUBLIC_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRO_BASE_URL
    : process.env.NEXT_PUBLIC_DEV_BASE_URL;
