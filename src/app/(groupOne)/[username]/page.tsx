import Posts from "@/components/ProfilePage/Posts";
import axios from "axios";

const fetchImage = async () => {
  try {
    const res = await axios.get(
      "https://api.pexels.com/v1/search?query=people",
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
        params: {
          per_page: 17,
          page: 35,
        },
      }
    );
    const data = res.data.photos.map((photo: any) => photo.src.medium);
    return data;
  } catch (err) {
    throw err;
  }
};

export default async function ProfilePostsPage() {
  const fetched = (await fetchImage()) as string[];

  return (
    <div className="grid grid-cols-3 gap-2 w-full mt-4 pb-52">
      <Posts fetched={fetched} />
    </div>
  );
}
