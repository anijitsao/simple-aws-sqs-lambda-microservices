// import the S3 client
import { S3Client } from "@aws-sdk/client-s3";

// initialize the client and export
const s3Ops = new S3Client({ region: process.env.REGION });
export { s3Ops };
