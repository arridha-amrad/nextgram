import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-full flex items-center mt-4 justify-center">
      <Spinner />
    </div>
  );
}
