"use client";

import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { Input } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

const SearchResult = dynamic(() => import("../SearchResult"), { ssr: false });

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const [isFocus, setFocus] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        options: {
          strategy: "fixed",
        },
      },
    ],
  });

  return (
    <div ref={setReferenceElement} className="relative w-full">
      <Input
        isClearable
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="flat"
        size="sm"
        fullWidth
        type="text"
        placeholder="Search"
        onClear={() => setSearch("")}
        classNames={{ input: ["text-md"] }}
        startContent={<SearchIcon className="w-5 h-5 pointer-events-none" />}
      />
      {isFocus &&
        typeof window === "object" &&
        createPortal(
          <div
            style={{ ...styles.popper, width: referenceElement?.clientWidth }}
            {...attributes.popper}
            ref={setPopperElement}
          >
            <SearchResult searchKey={search} />
          </div>,
          document.body
        )}
    </div>
  );
}
