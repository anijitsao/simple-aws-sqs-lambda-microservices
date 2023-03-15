import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Ops } from "../libs/s3Client.js";

export async function createBucket(bucketToCreate) {
  const data = await s3Ops.send(
    new CreateBucketCommand({ Bucket: bucketToCreate })
  );
  return data; 
}
