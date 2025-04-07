"use client";

import InputWithFloatingLabel from "@/components/InputWithFloatingLabel";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { login } from "./action";

import SubmitButtonWithSpinner from "@/components/SubmitButtonWithSpinner";
import { ChangeEvent, useState } from "react";

export default function FormLogin() {
  const [state, setState] = useState({
    identity: "",
    password: "",
  });

  const params = useSearchParams();

  const { execute, isPending, result } = useAction(
    login.bind(null, params.get("cb_url")),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const identityError = result.validationErrors?.identity?._errors;
  const passwordError = result.validationErrors?.password?._errors;
  const actionError = result.serverError;
  const message = params.get("message");

  return (
    <fieldset className="w-full" disabled={isPending}>
      <form action={execute} className="relative w-full space-y-2 px-6">
        {actionError && (
          <p className="text-center text-sm text-red-400">{actionError}</p>
        )}
        {message && (
          <p className="text-center text-sm text-green-400">{message}</p>
        )}
        <InputWithFloatingLabel
          name="identity"
          label="Email or Username"
          onChange={handleChange}
          type="text"
          value={state.identity}
          error={identityError && identityError[0]}
        />
        <InputWithFloatingLabel
          name="password"
          label="Password"
          onChange={handleChange}
          type="password"
          value={state.password}
          error={passwordError && passwordError[0]}
        />
        <SubmitButtonWithSpinner isLoading={isPending} label="Log in" />
      </form>
    </fieldset>
  );
}
