import { ReactNode } from "react";
import { StoryStoreProvider } from "./Provider";

export default function Layout({ children }: { children: ReactNode }) {
  return <StoryStoreProvider>{children}</StoryStoreProvider>;
}
