// AWS SDK dependencies
import { ListObjectsCommand } from "@aws-sdk/client-s3";

// local dependencies
import { sendResponse } from "../helpers/sendResponse.js";
import { s3Ops } from "../libs/s3Client.js";

export async function listContentsHandler(event) {
  // if userId is available list only the users folder content
  // suffix is supplied for file extensions

  try {
    const params = {
      Bucket: process.env.FILE_UPLOAD_BUCKET,
      Prefix: event.queryStringParameters?.userId || "",
      Suffix: "",
    };
    const { Contents, IsTruncated, Name, Marker, Prefix, Suffix } =
      await s3Ops.send(new ListObjectsCommand(params));
    // if some contents is there add the public url of each key
    Array.isArray(Contents) &&
      Contents.map((ele) => {
        ele[
          "url"
        ] = `https://${process.env.FILE_UPLOAD_BUCKET}.s3.${process.env.REGION}.${process.env.AMAZON_URL}/${ele.Key}`;
      });
    const res = { Contents, IsTruncated, Name, Marker, Prefix, Suffix };
    return sendResponse(process.env.SUCCESS_CODE, res);
  } catch (error) {
    const res = { message: "Unable to find Bucket Contents", error };
    return sendResponse(process.env.ERROR_CODE, res);
  }
}
