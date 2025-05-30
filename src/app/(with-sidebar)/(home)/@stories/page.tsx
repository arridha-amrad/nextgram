import Carousel from "./Carousel";
import ModalCreateStory from "./ModalCreateStory";
import { getAuth } from "@/lib/next.auth";
import { redirect } from "next/navigation";
import { page } from "@/lib/pages";
import { fetchStories } from "@/lib/drizzle/queries/stories/fetchStories";

export default async function Page() {
  const session = await getAuth();
  if (!session) redirect(page.home);

  const { data } = await fetchStories(session.user.id);

  return (
    <div className="flex w-full items-start gap-x-3 rounded-full px-2 pt-16 md:py-2 md:pt-4">
      <ModalCreateStory />
      <Carousel data={data} />
    </div>
  );
}
