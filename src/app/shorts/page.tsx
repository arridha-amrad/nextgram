// app/page.tsx
import ShortsCarousel from "./ShortCarousel";

const shortsData = [
  {
    id: "1",
    contentUrl: "https://images.unsplash.com/photo-1683120020344-45785c61dfdb",
    duration: 3000,
  },
  {
    id: "2",
    contentUrl: "https://images.unsplash.com/photo-1722272982973-1dbd83b610aa",
    duration: 3000,
  },
  // Add more items...
];

export default function Home() {
  return (
    <main>
      <ShortsCarousel items={shortsData} />
    </main>
  );
}
