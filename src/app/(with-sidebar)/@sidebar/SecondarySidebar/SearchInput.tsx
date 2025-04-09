"use client";

import { Button, Input } from "@headlessui/react";
import { CloseIcon } from "../Icons";
import { HTMLAttributes, useState } from "react";
import Form from "next/form";

type Props = HTMLAttributes<HTMLInputElement>;

function SearchInput(props: Props) {
  const [searchKey, setSearchKey] = useState("");
  return (
    <Form action="" className="relative">
      <Input
        name="searchUser"
        value={searchKey}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.form?.requestSubmit();
          }
        }}
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder="Search"
        className="bg-foreground/10 h-10 w-full rounded-lg pr-10 pl-4 outline-hidden"
        {...props}
      />
      <Button
        onClick={() => {
          setSearchKey("");
        }}
        type="button"
        className="bg-skin-muted/20 text-foreground absolute top-1/2 right-3 flex aspect-square size-5 -translate-y-1/2 items-center justify-center rounded-full text-xs"
      >
        <CloseIcon className="size-3" />
      </Button>
    </Form>
  );
}

export default SearchInput;
