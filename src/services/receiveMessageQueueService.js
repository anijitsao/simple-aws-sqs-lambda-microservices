// local dependencies
import { sendEmailHandler } from "./sendEmailService.js";
import { fileUploadHandler } from "./fileUploadService.js";

export async function receiveMessageQueueHandler(event) {
  console.log("SQS Event received\n", event);
  const msgFromQueue = event.Records[0];
  const msgBody = JSON.parse(msgFromQueue.body);
  const orderId = msgFromQueue.messageId;
  console.log("msg bdoy", msgBody);

  try {
    let fileContents = JSON.stringify(msgBody);
    let fileName = `sqsdemo/order-${orderId}.txt`;
    const eventBody = { body: { fileName, fileContents } };
    sendEmailHandler({ orderId });

    // calling the file upload lambda
    return fileUploadHandler(JSON.stringify(eventBody));
  } catch (error) {
    console.log("Error", error);
  }
}
