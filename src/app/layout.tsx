// app/layout.tsx
import AuthProvider from "@/providers/AuthProvider";
import { Providers } from "@/providers/UiProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";
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

  const session = await getServerSession();

  return (
    <html lang="en" className={theme ?? "dark"}>
      <body>
        <AuthProvider session={session}>
          <NextTopLoader showSpinner={false} color="#0095F6" />
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
