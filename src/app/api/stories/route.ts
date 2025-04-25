import StoryService from "@/lib/drizzle/services/StoryService";
import { imageKit } from "@/lib/fileUploadHandler";
import { getAuth } from "@/lib/next.auth";
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

  const arrayBuffer = await data.file.arrayBuffer();
  const base64File = Buffer.from(arrayBuffer).toString("base64");

  const { url, fileId } = await imageKit.upload({
    file: base64File,
    fileName: data.file.name,
  });

  const storyService = new StoryService();

  await storyService.create({
    publicId: fileId,
    type: "image",
    url,
    userId,
  });

  return NextResponse.json(
    {
      message: "New story created successfully",
    },
    { status: 201 },
  );
};
