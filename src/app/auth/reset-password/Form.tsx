"use client";

import InputWithFloatingLabel from "@/components/InputWithFloatingLabel";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { resetPassword } from "./action";
import SubmitButtonWithSpinner from "@/components/SubmitButtonWithSpinner";

function FormResetPassword() {
  const params = useSearchParams();

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { execute, isPending, result } = useAction(
    resetPassword.bind(null, params.get("token")),
  );

  const passwordError = result.validationErrors?.password?._errors;
  const confirmPasswordError =
    result.validationErrors?.confirmPassword?._errors;
  const actionError = result.serverError;

  console.log({ passwordError, confirmPasswordError });

  return (
    <fieldset className="w-full" disabled={isPending}>
      <form action={execute} className="w-full space-y-3">
        <section className="pb-2 text-center text-sm">
          {actionError && <p className="text-red-400">{actionError}</p>}
        </section>
        <InputWithFloatingLabel
          label="New password"
          name="password"
          onChange={onChange}
          type="password"
          value={state.password}
          error={passwordError && passwordError[0]}
        />
        <InputWithFloatingLabel
          label="Confirm wew password"
          name="confirmPassword"
          onChange={onChange}
          type="password"
          value={state.confirmPassword}
          error={confirmPasswordError && confirmPasswordError[0]}
        />
        <SubmitButtonWithSpinner
          isLoading={isPending}
          label="Reset my password"
        />
      </form>
    </fieldset>
  );
}

export default FormResetPassword;
