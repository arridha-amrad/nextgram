import { DropdownItem } from "@nextui-org/react";
import LogoutIcon from "@heroicons/react/24/outline/ArrowLeftOnRectangleIcon";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const logout = async () => {
    await signOut({ callbackUrl: "/accounts/login", redirect: true });
  };
  return (
    <DropdownItem
      onClick={logout}
      className="h-10"
      startContent={<LogoutIcon className="w-5 h-5" />}
      key="logout"
    >
      Log Out
    </DropdownItem>
  );
}
