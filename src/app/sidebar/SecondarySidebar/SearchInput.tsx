"use client";

import Spinner from "@/components/Spinner";
import { TSearchUser } from "@/lib/drizzle/queries/users/fetchSearchHistories";
import { Button, Input } from "@headlessui/react";
import {
  Dispatch,
  FormEvent,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { toast } from "react-toastify";
import { CloseIcon } from "../Icons";
import { useTranslations } from "next-intl";

const searchUser = async (username: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${username}`,
    );
    if (!res.ok) {
      throw new Error("Failed to search user");
    }
    return res.json();
  } catch (err) {
    throw err;
  }
};

type Props = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSearchResult: Dispatch<SetStateAction<TSearchUser[]>>;
  setSearchKey: Dispatch<SetStateAction<string>>;
  searchKey: string;
  valueKey: string;
} & HTMLAttributes<HTMLInputElement>;

function SearchInput({
  setSearchResult,
  setSearchKey,
  searchKey,
  loading,
  valueKey,
  setLoading,
  ...props
}: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const users = (await searchUser(valueKey)) as TSearchUser[];
      setSearchResult(users);
    } catch {
      toast.error("Failed to perform search");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!!valueKey) {
      formRef.current?.requestSubmit();
    }
  }, [valueKey]);

  const t = useTranslations("Search");

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="relative px-4">
      <Input
        name="searchUser"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder={t("inputPlaceHolder")}
        className="bg-foreground/10 h-10 w-full rounded-lg pr-10 pl-4 outline-hidden"
        {...props}
      />
      <div className="absolute top-1/2 right-7 -translate-y-1/2">
        {loading ? (
          <Spinner />
        ) : (
          <Button
            onClick={() => {
              setSearchKey("");
            }}
            type="button"
            className="bg-foreground/20 text-foreground flex aspect-square size-4 items-center justify-center rounded-full"
          >
            <CloseIcon className="text-foreground/50 size-3" />
          </Button>
        )}
      </div>
    </form>
  );
}

export default SearchInput;
