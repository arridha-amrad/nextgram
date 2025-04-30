"use server";

import { z } from "zod";
import { authActionClient } from "../safeAction";
import StoryService from "../drizzle/services/StoryService";
import { revalidateTag } from "next/cache";
import { cacheKeys } from "../cacheKeys";

export const readStory = authActionClient
  .schema(
    z.object({
      storyId: z.string(),
    }),
  )
  .action(async ({ ctx, parsedInput }) => {
    const watcherId = ctx.session.user.id;
    const { storyId } = parsedInput;
    const storyService = new StoryService();
    await storyService.addWatcher(watcherId, storyId);

    revalidateTag(cacheKeys.stories.user);
    revalidateTag(cacheKeys.stories.index);
  });
