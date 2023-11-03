import { Divider, ScrollShadow, Spinner, User } from "@nextui-org/react";

type Props = {
  searchKey: string;
};

export default function SearchResult({ searchKey }: Props) {
  return (
    <div className="relative w-full mt-4">
      <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 blur" />
      <div className="relative z-50 overflow-y-auto bg-background border border-skin-base rounded-2xl">
        {!!searchKey && (
          <div className="relative h-12 flex items-center justify-between px-4 py-2">
            <Divider className="absolute inset-x-0 bottom-0" />
            <p className="text-sm mb-4 pt-3">
              <span className="font-semibold text-skin-accent">
                Searching for
              </span>
              <span className="italic font-bold ml-1">
                &quot;{searchKey}&quot;
              </span>
            </p>
            <Spinner color="default" size="sm" />
          </div>
        )}
        {!searchKey && (
          <div className="py-2 px-4 h-12 flex items-center justify-center">
            <p className="text-skin-accent">
              Type something to start searching
            </p>
          </div>
        )}
        {true && (
          <ScrollShadow className="flex flex-col py-2 items-start max-h-[80vh] min-h-80 overflow-y-auto">
            <User
              className="cursor-pointer"
              classNames={{
                base: [
                  "hover:dark:bg-neutral-800",
                  "hover:bg-neutral-100",
                  "py-2",
                  "px-4",
                  "rounded-none",
                  "w-full",
                  "justify-start",
                ],
              }}
              name="Jane Doe"
              description="Product Designer"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
            <User
              className="cursor-pointer"
              classNames={{
                base: [
                  "hover:dark:bg-neutral-800",
                  "hover:bg-neutral-100",
                  "py-2",
                  "px-4",
                  "rounded-none",
                  "w-full",
                  "justify-start",
                ],
              }}
              name="Jane Doe"
              description="Product Designer"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
            <User
              className="cursor-pointer"
              classNames={{
                base: [
                  "hover:dark:bg-neutral-800",
                  "hover:bg-neutral-100",
                  "py-2",
                  "px-4",
                  "rounded-none",
                  "w-full",
                  "justify-start",
                ],
              }}
              name="Jane Doe"
              description="Product Designer"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
          </ScrollShadow>
        )}
      </div>
    </div>
  );
}
