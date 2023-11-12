import {
  Button,
  Input,
  Spacer,
  Spinner,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useState } from "react";
import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import CloseIcon from "@heroicons/react/24/outline/XMarkIcon";

type Props = {
  close: VoidFunction;
};

export default function SearchSidebar({ close }: Props) {
  const [search, setSearch] = useState("");
  return (
    <div className="fixed inset-0 z-50">
      <div onClick={close} className="absolute inset-0 bg-background/50" />
      <div className="relative h-screen w-[300px] bg-background">
        <div className="flex items-center h-14">
          <h1 className="text-2xl font-semibold px-4">Search</h1>
        </div>
        <div className="px-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="flat"
            size="sm"
            fullWidth
            classNames={{
              input: ["text-base"],
            }}
            type="text"
            placeholder="Search"
            onClear={() => setSearch("")}
            startContent={
              <SearchIcon className="w-5 h-5 pointer-events-none" />
            }
          />
        </div>

        {!!search && (
          <>
            <Spacer y={4} />
            <div className="px-4 flex items-center gap-3">
              <Spinner color="current" size="sm" />
              <p className="text-sm">
                Searching for :{" "}
                <span className="font-bold text-sm">{search}</span>
              </p>
            </div>
          </>
        )}

        <Spacer y={5} />
        <div className="px-1 space-y-2">
          {[...Array(5).fill("")].map((_, i) => (
            <div
              className="rounded-2xl flex items-center justify-between px-2 hover:bg-default/50 cursor-pointer py-1"
              key={i}
            >
              <User
                name="Jane Doe"
                description="Product Designer"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
              <Tooltip content="close" size="sm">
                <Button isIconOnly variant="light" size="sm">
                  <CloseIcon className="w-5 h-5" />
                </Button>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
