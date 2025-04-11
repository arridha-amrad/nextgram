"use client";

import Avatar from "@/components/Avatar";
import {
  removeUserFromSearchHistory,
  saveUserToSearchHistory,
} from "@/lib/actions/user";
import { TSearchUser } from "@/lib/drizzle/queries/type";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

type Props = {
  user: TSearchUser;
  isRemovable: boolean;
};

const UserCard = ({
  user: { avatar, name, username, id },
  isRemovable,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = async () => {
    saveUserToSearchHistory
      .bind(
        null,
        pathname,
      )({
        searchId: id,
      })
      .finally(() => {
        router.push(`/${username}`);
      });
  };

  const remove = async () => {
    await removeUserFromSearchHistory.bind(null, pathname)({ searchId: id });
  };

  return (
    <div
      onClick={navigate}
      className="hover:bg-skin-fill/20 flex cursor-pointer gap-3 rounded-md px-2 py-2"
    >
      <div className="flex-none"></div>
      <div className="flex-1 text-sm">
        <h1>{username}</h1>
        <p className="text-skin-muted">{name}</p>
      </div>
      {isRemovable && (
        <button
          onClick={async (e) => {
            e.stopPropagation();
            await remove();
          }}
          type="submit"
          className="flex-none"
        >
          <XMarkIcon className="aspect-square w-5" />
        </button>
      )}
    </div>
  );
};

export default UserCard;
