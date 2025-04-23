"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import Histories from "../Histories";
import SearchInput from "../SearchInput";
import SearchResult from "../SearchResult";

export type SearchUser = {
  id: string;
  username: string;
  name: string;
  avatar: string | null;
};

function Search() {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState<SearchUser[]>([]);
  const [value, { isPending }] = useDebounce(searchKey, 1000);
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative">
      <SearchInput
        setSearchResult={setSearchResult}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        loading={loading || isPending()}
        setLoading={setLoading}
        valueKey={value}
      />
      <hr className="border-foreground/20 my-6" />
      {isPending() || loading ? (
        <div className="space-y-4 px-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex w-full animate-pulse items-center gap-4"
            >
              <div className="bg-foreground/30 size-[44px] shrink-0 rounded-full" />
              <div className="w-full space-y-2">
                <div className="bg-foreground/30 h-3 w-3/4"></div>
                <div className="bg-foreground/30 h-3 w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : !!searchKey ? (
        <SearchResult users={searchResult} />
      ) : (
        <Histories />
      )}
    </div>
  );
}

export default Search;
