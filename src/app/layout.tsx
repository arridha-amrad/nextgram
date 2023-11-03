// app/layout.tsx
import { Providers } from "@/components/providers";
import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Nextgram",
  description: "Instagram alternative",
};

const testNetwork = async () => {
  return fetch("http://dummyjson.com/test").then((res) => res.json());
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get("theme")?.value;

  const networkResult = (await testNetwork()) as { status: string };

  return (
    <html lang="en" className={theme ?? "dark"}>
      <body>
        {networkResult.status === "ok" ? (
          <Providers>{children}</Providers>
        ) : (
          <p>Connection failure</p>
        )}
      </body>
    </html>
  );
}
