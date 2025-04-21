import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Inter, Lobster } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const lobster = Lobster({
  variable: "--font-title",
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nextgram",
  description: "Created by Arridha Amrad",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          lobster.variable,
          "bg-background text-skin-base",
        )}
      >
        <NextTopLoader showSpinner={false} color="#0095f6" />
        <SessionProvider>
          <ThemeProvider enableColorScheme={false} attribute="class">
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </SessionProvider>
        <ToastContainer
          pauseOnHover={false}
          hideProgressBar={true}
          position="bottom-right"
        />
      </body>
    </html>
  );
}
