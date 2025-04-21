"use server";

import { cookies } from "next/headers";

export const changeLang = async (lang: string) => {
  const cookie = await cookies();
  cookie.set("NEXT_LOCALE", lang);
};
