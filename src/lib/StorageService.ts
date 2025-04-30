import { env } from "@/env";
import ImageKit from "imagekit";

export default class StorageService {
  private imageKit: ImageKit;

  constructor() {
    this.imageKit = new ImageKit({
      privateKey: env.imageKitPrivateKey,
      publicKey: env.imageKitPublicKey,
      urlEndpoint: env.imageKitUrlEndpoint,
    });
  }

  public async upload(
    file: string | Buffer<ArrayBufferLike>,
    fileName: string,
    folderName: "story" | "post" | "avatar",
  ) {
    const result = await this.imageKit.upload({
      file,
      fileName,
      folder: `/nextgram/${folderName}`,
    });
    return result;
  }

  public async remove(publicId: string[]) {
    await this.imageKit.bulkDeleteFiles(publicId);
  }
}
