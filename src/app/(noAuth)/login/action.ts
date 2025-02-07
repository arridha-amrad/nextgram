"use server";

import { signIn } from "@/auth";
import UserService from "@/lib/drizzle/services/UserService";
import { SafeActionError } from "@/lib/errors/SafeActionError";
import { verifyPasswordHash } from "@/lib/passwordHandler";
import { actionClient } from "@/lib/safeAction";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  identity: zfd.text(z.string()),
  password: zfd.text(z.string()),
});

export const login = actionClient
  .schema(schema)
  .bindArgsSchemas<[cbUrl: z.ZodNullable<z.ZodString>]>([z.string().nullable()])
  .action(
    async ({
      bindArgsParsedInputs: [cbUrl],
      parsedInput: { identity, password },
    }) => {
      const userService = new UserService();
      const users = identity.includes("@")
        ? await userService.findUserByEmail(identity)
        : await userService.findUserByUsername(identity);

      if (users.length === 0) {
        throw new SafeActionError("User not found");
      }

      const isMatch = !users[0].password
        ? false
        : await verifyPasswordHash(users[0].password, password);

      if (!isMatch) {
        throw new SafeActionError("Invalid credentials");
      }

      if (users[0].verifiedAt === null) {
        throw new SafeActionError("Please verify your email");
      }

      await signIn("credentials", {
        id: users[0].id,
        name: users[0].name,
        email: users[0].email,
        image: users[0].avatar,
        username: users[0].username,
        redirectTo: cbUrl ?? "/",
      });
    },
  );
