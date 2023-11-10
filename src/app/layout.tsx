// app/layout.tsx
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nextgram",
  description: "Instagram Future",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get("theme")?.value;

  return (
    <html lang="en" className={theme ?? "dark"}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
