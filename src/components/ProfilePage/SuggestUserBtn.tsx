import { Button } from "@nextui-org/react";
import UserPlusIcon from "@heroicons/react/24/outline/UserPlusIcon";
import UserPlusIconFilled from "@heroicons/react/24/outline/UserPlusIcon";

const SuggestUserButton = () => {
  return (
    <Button isIconOnly size="sm" variant="light">
      <UserPlusIcon className="w-5 h-5" />
    </Button>
  );
};

export default SuggestUserButton;
