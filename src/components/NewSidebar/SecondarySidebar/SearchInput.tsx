"use client";

import { Button, Input } from "@headlessui/react";
import { CloseIcon } from "../Icons";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLInputElement>;

function SearchInput(props: Props) {
  return (
    <div className="relative">
      <Input
        placeholder="Search"
        className="bg-foreground/10 h-10 w-full rounded-lg pr-10 pl-4 outline-hidden"
        {...props}
      />
      <Button className="bg-skin-muted/20 text-foreground absolute top-1/2 right-3 flex aspect-square size-5 -translate-y-1/2 items-center justify-center rounded-full text-xs">
        <CloseIcon className="size-3" />
      </Button>
    </div>
  );
}

export default SearchInput;
