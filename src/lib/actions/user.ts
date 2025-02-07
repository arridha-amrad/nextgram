"use server";

import { searchUser as su } from "@/lib/drizzle/queries/users/searchUser";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { USERS } from "../cacheKeys";
import UserService from "../drizzle/services/UserService";
import { actionClient, authActionClient } from "../safeAction";
import { SafeActionError } from "../errors/SafeActionError";
import {
  deleteFileFromPinataByUrl,
  uploadFileToPinata,
} from "../fileUploadHandler";

export const searchUser = actionClient
  .schema(
    zfd.formData({
      key: zfd.text(z.string()),
    }),
  )
  .action(async ({ parsedInput: { key } }) => {
    const users = await su(key);
    return users;
  });

export const updateAvatar = authActionClient
  .schema(
    zfd.formData({
      image: zfd.file(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { image } }) => {
    const userService = new UserService();

    const { id } = session.user;
    const user = await userService.findUserById(id);
    if (user.length === 0) {
      throw new SafeActionError("User not found");
    }

    const avatarUrl = user[0].avatar;
    if (avatarUrl && avatarUrl.includes("mypinata")) {
      await deleteFileFromPinataByUrl(avatarUrl);
    }

    const newUrl = await uploadFileToPinata(image);

    const [result] = await userService.updateUser(id, {
      avatar: newUrl,
    });

    revalidateTag(USERS.profile);
    revalidateTag(USERS.profileDetails);

    return {
      id: result.id,
      name: result.name,
      image: result.avatar as string,
      username: result.username,
      email: result.email,
    };
  });

export const saveUserToSearchHistory = authActionClient
  .schema(
    z.object({
      searchId: z.string(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { searchId } }) => {
    const userService = new UserService();
    const result = await userService.addUserToSearchHistory({
      userId: session.user.id,
      searchId,
    });
    revalidateTag(USERS.searchHistories);
    return result;
  });

export const removeAllSearchHistories = authActionClient
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session } }) => {
    const userService = new UserService();
    const result = await userService.removeAllUserFromSearchHistory(
      session.user.id,
    );
    revalidateTag(USERS.searchHistories);
    return result;
  });

export const removeUserFromSearchHistory = authActionClient
  .schema(
    z.object({
      searchId: z.string(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { searchId } }) => {
    const userService = new UserService();
    const result = await userService.removeUserFromSearchHistory({
      searchId,
      userId: session.user.id,
    });
    revalidateTag(USERS.searchHistories);
    return result;
  });
