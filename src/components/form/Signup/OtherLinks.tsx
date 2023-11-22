import { Spacer, Link } from "@nextui-org/react";
import NextLink from "next/link";

export default function OtherLinks() {
  return (
    <>
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
    </>
  );
}
