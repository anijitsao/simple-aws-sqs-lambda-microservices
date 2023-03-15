import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { s3Ops } from "../libs/s3Client.js";

export async function checkIfBucketExists(bucketToCheck) {
  // data contains $metadata, Buckets and Owner info
  const data = await s3Ops.send(new ListBucketsCommand({}));

  // checking if the bucket is actually present
  for (let i = 0; i < data.Buckets.length; i++) {
    if (data.Buckets[i].Name === bucketToCheck) {
      return true;
    }
  }
  return false;
}
