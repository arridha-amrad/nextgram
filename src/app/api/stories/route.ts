import { pinata } from "@/lib/fileUploadHandler";
import { getAuth } from "@/lib/next.auth";
import { NextResponse } from "next/server";
import { z } from "zod";
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

  const schema = zfd.formData({
    file: zfd.file(),
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

  const uploadData = await pinata.upload;
  const url = await pinata.gateways.convert(uploadData.IpfsHash);
  return url;
};
