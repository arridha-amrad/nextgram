"use client";

import { Button } from "@nextui-org/react";
import GearIcon from "@heroicons/react/24/outline/Cog6ToothIcon";

const ProfileSettingsButton = () => {
  return (
    <Button variant="light" isIconOnly>
      <GearIcon className="w-5 h-5" />
    </Button>
  );
};

export default ProfileSettingsButton;
