"server only";

import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.PINATA_GATEWAY}`,
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
