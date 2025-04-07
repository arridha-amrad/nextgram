import { Button } from "@headlessui/react";
import Spinner from "./Spinner";

type Props = {
  label: string;
  isLoading: boolean;
};

function SubmitButtonWithSpinner({ isLoading, label }: Props) {
  return (
    <Button
      type="submit"
      className="disabled:bg-bg-secondary bg-skin-primary mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium"
    >
      {label}
      {isLoading && <Spinner className="size-4" />}
    </Button>
  );
}

export default SubmitButtonWithSpinner;
