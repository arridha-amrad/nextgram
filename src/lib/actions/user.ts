"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { cacheKeys } from "../cacheKeys";
import UserService from "../drizzle/services/UserService";
import { SafeActionError } from "../errors/SafeActionError";
import { authActionClient } from "../safeAction";
import StorageService from "../StorageService";
import { convertFileToString } from "../utils";

const MAX_FILE_SIZE = 1024 * 1024;
export const updateAvatar = authActionClient
  .schema(
    zfd.formData({
      image: zfd.file().refine(async (file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be less than or equal to 1MB",
      }),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { image } }) => {
    const userService = new UserService();
    const storageService = new StorageService();

    const { id } = session.user;
    const user = await userService.findUserById(id);
    if (user.length === 0) {
      throw new SafeActionError("User not found");
    }

    const avatarPublicId = user[0].avatarPublicId;
    if (avatarPublicId) {
      await storageService.remove([avatarPublicId]);
    }

    const fileStr = await convertFileToString(image);
    const { url, fileId } = await storageService.upload(
      fileStr,
      image.name,
      "avatar",
    );

    const [result] = await userService.updateUser(id, {
      avatar: url,
      avatarPublicId: fileId,
    });

    revalidateTag(cacheKeys.users.profile);

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
    revalidateTag(cacheKeys.users.histories);
    return result;
  });

export const removeAllSearchHistories = authActionClient
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session } }) => {
    const userService = new UserService();
    const result = await userService.removeAllUserFromSearchHistory(
      session.user.id,
    );
    revalidateTag(cacheKeys.users.histories);
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
    revalidateTag(cacheKeys.users.histories);
    return result;
  });
