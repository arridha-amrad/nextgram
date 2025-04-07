"use client";

import InputWithFloatingLabel from "@/components/InputWithFloatingLabel";
import { useState } from "react";
import { forgotPassword } from "./action";
import { useAction } from "next-safe-action/hooks";
import SubmitButtonWithSpinner from "@/components/SubmitButtonWithSpinner";

function FormForgotPassword() {
  const [identity, setIdentity] = useState("");
  const { execute, isPending, result } = useAction(forgotPassword);
  const emailError = result.validationErrors?.email?._errors;
  const actionError = result.serverError;
  const message = result.data;

  return (
    <fieldset disabled={isPending} className="w-full">
      <form action={execute} className="w-full space-y-2">
        {(actionError || message) && (
          <div className="pb-2 text-center text-sm">
            {actionError && <p className="text-red-400">{actionError}</p>}
            {message && <p className="text-green-500">{message}</p>}
          </div>
        )}
        <InputWithFloatingLabel
          label="Username or email"
          name="email"
          onChange={(e) => setIdentity(e.target.value)}
          type="text"
          value={identity}
          error={emailError && emailError[0]}
        />
        <p className="text-skin-muted text-xs">
          You may receive email notifications from us for security and login
          purposes.
        </p>
        <SubmitButtonWithSpinner isLoading={isPending} label="Continue" />
      </form>
    </fieldset>
  );
}

export default FormForgotPassword;
