// this lambda will upload file in interval when deployed

// local dependencies
import { fileUploadHandler } from "./fileUploadService.js";
export async function cronFileUploadServiceHandler(event) {
  // setting file name based on current date time
  const currentTime = new Date();
  const fileName = `${currentTime.toISOString()}.txt`;

  const fileContents = `Logging from CRON lambda. Current time is ${currentTime.toISOString()}`;
  const eventBody = { body: { fileName, fileContents } };
  // calling the file upload lambda
  return fileUploadHandler(JSON.stringify(eventBody));
}
