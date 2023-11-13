"use client";

import { Button, Input, Spacer } from "@nextui-org/react";

export default function ForgotPasswordReset() {
  return (
    <form>
      <Input variant="flat" size="sm" type="text" label="Username or Email" />
      <Spacer y={2} />
      <Button isDisabled variant="solid" color="primary" fullWidth>
        Login
      </Button>
    </form>
  );
}
