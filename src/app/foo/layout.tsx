import { ReactNode } from "react";

async function Layout({
  children,
  searchParams,
}: {
  children: ReactNode;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  console.log("sp : ", sp);

  return children;
}

export default Layout;
