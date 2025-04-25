"server only";

import { PinataSDK } from "pinata-web3";
import { env } from "@/env";
import ImageKit from "imagekit";

export const pinata = new PinataSDK({
  pinataJwt: `${env.pinataJwt}`,
  pinataGateway: `${env.pinataGateway}`,
});

export const uploadFileToPinata = async (file: File) => {
  const result = await pinata.upload.file(file);
  const url = await pinata.gateways.convert(result.IpfsHash);
  return url;
};

export const deleteFileFromPinataByCids = async (cids: string[]) => {
  await pinata.unpin(cids);
};

export const deleteFileFromPinataByUrl = async (url: string) => {
  const cid = url.split("/").reduce((pv, cv) => {
    pv = cv;
    return pv;
  }, "");
  await pinata.unpin([cid]);
};

export const imageKit = new ImageKit({
  privateKey: env.imageKitPrivateKey,
  publicKey: env.imageKitPublicKey,
  urlEndpoint: env.imageKitUrlEndpoint,
});
