import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const acceptedLangs = ["en", "id", "jp"];
  const cookie = await cookies();
  const lang = cookie.get("NEXT_LOCALE")?.value ?? "en";
  const locale = acceptedLangs.find((l) => l === lang) ?? "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
