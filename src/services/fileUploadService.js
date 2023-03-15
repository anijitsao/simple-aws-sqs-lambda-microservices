// AWS SDK dependencies
import { PutObjectCommand } from "@aws-sdk/client-s3";

// local dependencies
import { s3Ops } from "../libs/s3Client.js";
import { checkIfBucketExists } from "../helpers/checkBucketExists.js";
import { createBucket } from "../helpers/createBucket.js";
import { sendResponse } from "../helpers/sendResponse.js";

export async function fileUploadHandler(event) {
  const { fileName, fileContents, userId } = JSON.parse(event.body);
  try {
    // check if the bucket is present
    let ifBucketExist = await checkIfBucketExists(
      process.env.FILE_UPLOAD_BUCKET
    );
    let bucketCreated = false;

    // if the bucket is not exists create the same
    if (!ifBucketExist) {
      bucketCreated = await createBucket(process.env.FILE_UPLOAD_BUCKET);
    }
    // if userId present, create a folder with same and place the file
    const params = {
      Bucket: process.env.FILE_UPLOAD_BUCKET,
      Key: userId ? `${userId}/${fileName}` : fileName,
      Body: fileContents,
    };
    const uploadResult = await s3Ops.send(new PutObjectCommand(params));
    const res = {
      ifBucketExist,
      bucketCreated,
      fileUploadStatus: uploadResult["$metadata"].httpStatusCode,
      uploadedFile: {
        fileName,
        url: `https://${process.env.FILE_UPLOAD_BUCKET}.s3.${process.env.REGION}.${process.env.AMAZON_URL}/${params.Key}`,
      },
    };
    return sendResponse(process.env.SUCCESS_CODE, res);
  } catch (error) {
    const res = { message: "Unable to access the Bucket", error };
    return sendResponse(process.env.ERROR_CODE, res);
  }
}
