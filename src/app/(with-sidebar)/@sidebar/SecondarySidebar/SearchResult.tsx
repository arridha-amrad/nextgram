import { useSidebarContext } from "../Context";
import UserCard from "../UserCard";

function SearchResult() {
  const { searchResult } = useSidebarContext();

  return (
    <>
      <div className="w-full space-y-4">
        {searchResult.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}

export default SearchResult;
