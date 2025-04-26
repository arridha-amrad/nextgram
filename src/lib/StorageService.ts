import { env } from "@/env";
import ImageKit from "imagekit";
import { PinataSDK } from "pinata-web3";

export default class StorageService {
  private pinata: PinataSDK;
  private imageKit: ImageKit;

  constructor() {
    this.pinata = new PinataSDK({
      pinataJwt: env.pinataJwt,
      pinataGateway: env.pinataGateway,
    });

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
    await this.pinata.unpin(publicId);
    await this.imageKit.bulkDeleteFiles(publicId);
  }
}
