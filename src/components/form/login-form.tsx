"use client";

import { Button, Input, Spacer } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form className="px-4">
      <Input variant="flat" size="sm" type="text" label="username or email" />
      <Spacer y={2} />
      <Input
        size="sm"
        variant="flat"
        label="password"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashIcon className="h-6 w-6 pointer-events-none" />
            ) : (
              <EyeIcon className="h-6 w-6 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
      />{" "}
      <Spacer y={4} />
      <Button isDisabled variant="solid" color="primary" fullWidth>
        Login
      </Button>
    </form>
  );
}
