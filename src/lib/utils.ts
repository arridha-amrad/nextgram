import { encodeBase32UpperCaseNoPadding } from "@oslojs/encoding";
import { type ClassValue, clsx } from "clsx";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { TUserPost } from "./drizzle/queries/posts/fetchUserPosts";

export const convertFileToString = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const base64File = Buffer.from(arrayBuffer).toString("base64");
  return base64File;
};

export const toMatrixPost = (data: TUserPost[]) => {
  const size = 3;
  const result: TUserPost[][] = [];
  for (let i = 0; i < data.length; i += size) {
    result.push(data.slice(i, i + size));
  }
  return result;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const showToast = (message: string, variant: "success" | "error") => {
  const theme = localStorage.getItem("theme") ?? "light";
  if (variant === "error") {
    return toast.error(message, { theme });
  }
  return toast.success(message, { theme });
};

export function generateRandomOTP(): string {
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  const code = encodeBase32UpperCaseNoPadding(bytes);
  return code;
}

export const getEmailVerificationRequestCookie = async (
  cookie: ReadonlyRequestCookies,
) => {
  const data = cookie.get("email_verification")?.value;
  return data;
};

export async function setEmailVerificationRequestCookie(
  id: string,
  expiresAt: Date,
  cookie: ReadonlyRequestCookies,
) {
  cookie.set("email_verification", id, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(expiresAt),
  });
}

export async function deleteEmailVerificationRequestCookie(
  cookie: ReadonlyRequestCookies,
) {
  cookie.set("email_verification", "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
}

export const rgbDataURL = (r: number, g: number, b: number) => {
  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

  return `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
};

export const getUniqueById = <T extends { id: string }>(currPosts: T[]) => {
  const seenIds = new Set<string>();
  const result = [] as T[];
  for (const post of currPosts) {
    if (!seenIds.has(post.id)) {
      result.push(post);
      seenIds.add(post.id);
    }
  }
  return result;
};
