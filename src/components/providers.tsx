"use client";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <main className="text-foreground bg-background">
        <div className="container mx-auto min-h-screen">{children}</div>
      </main>
    </NextUIProvider>
  );
}
