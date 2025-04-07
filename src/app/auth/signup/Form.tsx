"use client";

import InputWithFloatingLabel from "@/components/InputWithFloatingLabel";
import SubmitButtonWithSpinner from "@/components/SubmitButtonWithSpinner";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { signUp } from "./action";

export default function FormSignup() {
  const [state, setState] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { execute, isPending, result } = useAction(signUp);

  const nameError = result.validationErrors?.fullname?._errors;
  const usernameError = result.validationErrors?.username?._errors;
  const emailError = result.validationErrors?.email?._errors;
  const passwordError = result.validationErrors?.password?._errors;
  const actionError = result.serverError;

  return (
    <fieldset disabled={isPending}>
      <form action={execute}>
        {actionError && (
          <div className="pb-2 text-center">
            <p className="text-sm text-red-400">{actionError}</p>
          </div>
        )}
        <div className="w-full space-y-2">
          <InputWithFloatingLabel
            label="Email"
            name="email"
            onChange={onChange}
            type="text"
            value={state.email}
            error={emailError && emailError[0]}
          />
          <InputWithFloatingLabel
            label="Password"
            name="password"
            onChange={onChange}
            type="password"
            value={state.password}
            error={passwordError && passwordError[0]}
          />
          <InputWithFloatingLabel
            label="Full Name"
            name="fullname"
            onChange={onChange}
            type="text"
            value={state.fullname}
            error={nameError && nameError[0]}
          />
          <InputWithFloatingLabel
            label="Username"
            name="username"
            onChange={onChange}
            type="text"
            value={state.username}
            error={usernameError && usernameError[0]}
          />
        </div>
        <div className="mt-4 mb-2">
          <p className="text-skin-muted text-center text-xs">
            People who use our service may have uploaded your contact
            information to Instagram
            <br />
            <Link href="/" className="text-skin-link py-1 font-semibold">
              Learn More.
            </Link>
          </p>
        </div>
        <div className="mb-2">
          <p className="text-skin-muted text-center text-xs">
            By signing up, you agree to our&nbsp;
            <Link href="/" className="text-skin-link font-semibold">
              Terms
            </Link>
            &nbsp; ,&nbsp;
            <Link href="/" className="text-skin-link font-semibold">
              Privacy Policy
            </Link>
            &nbsp; and&nbsp;
            <Link className="text-skin-link font-semibold" href="/">
              Cookies Policy.
            </Link>
          </p>
        </div>
        <div className="my-2 w-full">
          <SubmitButtonWithSpinner isLoading={isPending} label="Sign up" />
        </div>
      </form>
    </fieldset>
  );
}
