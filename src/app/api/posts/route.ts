import { cacheKeys } from "@/lib/cacheKeys";
import { TFeedPost } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import PostService from "@/lib/drizzle/services/PostService";
import StoryService from "@/lib/drizzle/services/StoryService";
import { getAuth } from "@/lib/next.auth";
import { page } from "@/lib/pages";
import StorageService from "@/lib/StorageService";
import { convertFileToString } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { NextResponse } from "next/server";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const POST = async (request: Request) => {
  const session = await getAuth();
  if (!session) {
    redirect(page.login, RedirectType.replace);
  }

  const schema = zfd.formData({
    description: zfd.text(z.string().optional()),
    location: zfd.text(z.string().optional()),
    images: zfd
      .file()
      .or(zfd.file().array())
      .transform(async (v) => {
        if (v instanceof File) {
          return [v];
        }
        return v;
      }),
  });

  const formData = await request.formData();

  const { success, data, error } = await schema.safeParseAsync(formData);

  if (!success) {
    const errors = error.flatten().fieldErrors;
    return NextResponse.json(errors, {
      status: 400,
    });
  }

  const {
    user: { id: userId },
  } = session;

  const storageService = new StorageService();
  const postService = new PostService();
  const storyService = new StoryService();

  const promises = data.images.map(async (file) => {
    const fileStr = await convertFileToString(file);
    const { url, fileId } = await storageService.upload(
      fileStr,
      file.name,
      "post",
    );
    return { url, fileId };
  });

  const pinataUrls = await Promise.all(promises);

  const [newPost] = await postService.create({
    urls: pinataUrls.map(({ fileId, url }) => ({
      url,
      type: "image",
      publicId: fileId,
    })),
    userId,
    description: data.description,
    location: data.location,
  });

  revalidateTag(cacheKeys.posts.home);
  revalidateTag(cacheKeys.posts.user);
  revalidateTag(cacheKeys.users.profile);

  const isUserStoryExists = await storyService.isUserStoriesExists(
    session.user.id,
  );

  const feedPost: TFeedPost = {
    ...newPost,
    avatar: session.user.image,
    username: session.user.username,
    isLiked: false,
    isSaved: false,
    isUserFollowed: false,
    isUserStoryExists,
    sumComments: 0,
    sumLikes: 0,
  };

  return NextResponse.json(
    { post: feedPost, message: "New post created successfully" },
    { status: 201 },
  );
};
