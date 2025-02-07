import {
  BookmarkIcon as Bookmark,
  TagIcon as Tag,
  Squares2X2Icon as Squares2X2,
} from "@heroicons/react/24/solid";
import Tab from "./Tab";
import {
  BookmarkIcon,
  TagIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

type Props = {
  username: string;
};

const tabs = [
  {
    name: "Posts",
    href: "",
    icon: <Squares2X2Icon className="w-4" />,
    fillIcon: <Squares2X2 className="w-4" />,
  },
  {
    name: "Saved",
    href: "saved",
    icon: <BookmarkIcon className="w-4" />,
    fillIcon: <Bookmark className="w-4" />,
  },
  {
    name: "Tagged",
    href: "tagged",
    icon: <TagIcon className="w-4" />,
    fillIcon: <Tag className="w-4" />,
  },
];

export type TTab = (typeof tabs)[number];

export default function Tabs({ username }: Props) {
  return (
    <section className="border-skin-border mt-20 flex items-center justify-center gap-10 border-t">
      {tabs.map((tab) => (
        <Tab key={tab.name} username={username} tab={tab} />
      ))}
    </section>
  );
}
