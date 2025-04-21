import { getAuth } from "@/lib/next.auth";
import { page } from "@/lib/pages";
import { redirect } from "next/navigation";
import FormChangeUsername from "./Form";
import Footer from "@/components/Footer";

const Page = async () => {
  const session = await getAuth();
  if (!session) {
    redirect(`${page.login}?cbUrl=${page.changeUsername}`);
  }
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-auto w-full flex-1 px-10 xl:max-w-[706px]">
        <div className="flex h-[100px] items-center justify-start">
          <h1 className="text-xl font-bold">Change username</h1>
        </div>
        <FormChangeUsername />
      </div>
      <div className="mt-10 flex items-center justify-center gap-2">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
