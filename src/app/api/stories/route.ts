import { cacheKeys } from "@/lib/cacheKeys";
import StoryService from "@/lib/drizzle/services/StoryService";
import { getAuth } from "@/lib/next.auth";
import StorageService from "@/lib/StorageService";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { zfd } from "zod-form-data";

export const POST = async (req: Request) => {
  const session = await getAuth();
  if (!session) {
    return NextResponse.json(
      { message: "You are not authorized" },
      {
        status: 400,
      },
    );
  }

  const ACCEPTED_TYPES = ["image/jpeg", "image/png"];
  const schema = zfd.formData({
    file: zfd
      .file()
      .refine((file) => ACCEPTED_TYPES.includes(file.type), {
        message: "Only JPEG and PNG files are allowed",
      })
      .refine((file) => file.size <= 1024 * 1000, {
        message: "File size must be less than 1 MB",
      }),
  });

  const formData = await req.formData();

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
  const storyService = new StoryService();

  const arrayBuffer = await data.file.arrayBuffer();
  const base64File = Buffer.from(arrayBuffer).toString("base64");

  const { url, fileId } = await storageService.upload(
    base64File,
    data.file.name,
    "story",
  );

  await storyService.create({
    publicId: fileId,
    type: "image",
    url,
    userId,
  });

  revalidateTag(cacheKeys.stories.feed);
  revalidateTag(cacheKeys.stories.user);

  return NextResponse.json(
    {
      message: "New story created successfully",
    },
    { status: 201 },
  );
};
