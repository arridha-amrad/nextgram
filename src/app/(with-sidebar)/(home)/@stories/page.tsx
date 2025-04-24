import Carousel from "./Carousel";
import ModalCreateStory from "./ModalCreateStory";

export default function Page() {
  return (
    <div className="flex w-full items-start gap-x-3 rounded-full pt-16 md:py-2 md:pt-4">
      <ModalCreateStory />
      <Carousel />
    </div>
  );
}
