"use client";

import Button from "@/components/core/Button";
import TextInput from "@/components/core/TextInput";
import { showToast } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { changeUsername } from "./action";
import { useUpdateSession } from "@/hooks/useUpdateSession";

const FormChangeUsername = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [state, setState] = useState({
    currentUsername: "",
    newUsername: "",
  });

  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { execute, result, isPending, hasSucceeded } = useAction(
    changeUsername.bind(null, pathname),
    {
      async onSuccess() {
        showToast("Username updated successfully", "success");
        setState({
          currentUsername: "",
          newUsername: "",
        });
      },
    },
  );

  useUpdateSession(hasSucceeded, { username: result.data?.username });

  const currUsernameErrValidation =
    result.validationErrors?.currentUsername?._errors;

  const newUsernameErrValidation =
    result.validationErrors?.newUsername?._errors;

  const actionError = result.serverError;

  return (
    <form
      ref={formRef}
      className="flex w-full max-w-md flex-col"
      action={execute}
    >
      <fieldset className="w-full space-y-3" disabled={isPending}>
        {actionError && (
          <p className="text-skin-error text-sm">{actionError}</p>
        )}
        <TextInput
          onChange={handleChange}
          value={state.currentUsername}
          errorMessage={
            currUsernameErrValidation && currUsernameErrValidation[0]
          }
          name="currentUsername"
          label="Current username"
        />
        <TextInput
          onChange={handleChange}
          value={state.newUsername}
          errorMessage={newUsernameErrValidation && newUsernameErrValidation[0]}
          name="newUsername"
          label="New username"
        />
        <div className="flex justify-end">
          <Button
            disabled={!state.currentUsername || !state.newUsername || isPending}
            isLoading={isPending}
            type="submit"
            className="disabled:bg-skin-primary/70 w-20"
          >
            Update
          </Button>
        </div>
      </fieldset>
    </form>
  );
};

export default FormChangeUsername;
