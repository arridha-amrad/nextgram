import { Button } from "@nextui-org/react";
import { FaSquareFacebook } from "react-icons/fa6";

type Props = {
  type: "light" | "solid";
};

export default function FacebookButton({ type }: Props) {
  return (
    <Button
      startContent={<FaSquareFacebook className="w-5 h-5" />}
      color="primary"
      fullWidth
      variant={type}
      className="font-semibold"
    >
      Login with Facebook
    </Button>
  );
}
