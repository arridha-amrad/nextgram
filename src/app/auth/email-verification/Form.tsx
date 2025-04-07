"use client";

import InputWithFloatingLabel from "@/components/InputWithFloatingLabel";
import { useState } from "react";
import { verifyEmail } from "./action";
import { useAction } from "next-safe-action/hooks";
import SubmitButtonWithSpinner from "@/components/SubmitButtonWithSpinner";

function Form({ id }: { id: string }) {
  const [state, setState] = useState("");
  const { execute, isPending, result } = useAction(verifyEmail.bind(null, id));
  const codeError = result.validationErrors?.code?._errors;
  const actionError = result.serverError;

  return (
    <fieldset disabled={isPending} className="w-full">
      <form action={execute} className="w-full space-y-2">
        {actionError && (
          <section className="text-center text-sm">
            <p className="text-red-500">{actionError}</p>
          </section>
        )}
        <InputWithFloatingLabel
          label="Code"
          name="code"
          onChange={(e) => setState(e.target.value)}
          type="text"
          value={state}
          error={codeError && codeError[0]}
        />
        <SubmitButtonWithSpinner isLoading={isPending} label="Continue" />
      </form>
    </fieldset>
  );
}

export default Form;
