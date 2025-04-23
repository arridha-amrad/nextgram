"use server";

import { cookies } from "next/headers";

export const changeLang = async (lang: string) => {
  const cookie = await cookies();
  cookie.set("NEXT_LOCALE", lang, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
};
