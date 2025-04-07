"use client";

import { Button } from "@headlessui/react";
import UserCard from "../UserCard";

function SearchResult() {
  return (
    <>
      <div className="mb-4 flex justify-between">
        <h1 className="text-skin-muted text-sm font-bold">Recent</h1>
        <Button className="text-skin-primary text-sm font-bold">
          Clear all
        </Button>
      </div>
      <div className="w-full space-y-4">
        <UserCard />
        <UserCard />
      </div>
    </>
  );
}

export default SearchResult;
