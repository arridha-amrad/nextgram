"use client";

import { Button, Input, Spacer } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import NextLink from "next/link";
import { Link } from "@nextui-org/react";

export default function SignUpForm() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form>
      <Input variant="flat" size="sm" type="text" label="Email" />
      <Spacer y={2} />
      <Input variant="flat" size="sm" type="text" label="FullName" />
      <Spacer y={2} />
      <Input variant="flat" size="sm" type="text" label="Username" />
      <Spacer y={2} />
      <Input
        size="sm"
        variant="flat"
        label="Password"
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
      <p className="text-center text-skin-accent text-sm">
        People who use our service may have uploaded your contact information to
        Instagram.{" "}
        <Link size="sm" href="/" as={NextLink}>
          Learn More
        </Link>
      </p>
      <Spacer y={4} />
      <p className="text-center text-skin-accent text-sm">
        By signing up, you agree to our{" "}
        <Link size="sm" href="/" as={NextLink}>
          Terms
        </Link>
        ,{" "}
        <Link size="sm" href="/" as={NextLink}>
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link size="sm" href="/" as={NextLink}>
          Cookies Policy .
        </Link>{" "}
      </p>
      <Spacer y={4} />
      <Button
        isLoading={false}
        className="font-semibold"
        isDisabled
        variant="solid"
        color="primary"
        fullWidth
      >
        Sign Up
      </Button>
    </form>
  );
}
