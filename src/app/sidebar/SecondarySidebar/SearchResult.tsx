import { TSearchUser } from "@/lib/drizzle/queries/users/fetchSearchHistories";
import UserCard from "../UserCard";

type Props = {
  users: TSearchUser[];
};

function SearchResult({ users }: Props) {
  return (
    <div className="w-full">
      {users.map((user) => (
        <UserCard isRemovable={false} key={user.id} user={user} />
      ))}
    </div>
  );
}

export default SearchResult;
