// local dependencies
import { sendEmailHandler } from "./sendEmailService.js";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client({ region: process.env.REGION });

export async function receiveMessageQueueHandler(event) {
  console.log("SQS Event received\n", event);
  const msgFromQuue = event.Records[0];
  const msgBody = JSON.parse(msgFromQuue.body);
  const messageAttributes = msgFromQuue.messageAttributes;
  const orderId = msgFromQuue.messageId;
  console.log("msg bdoy", msgBody);

  try {
    const bucketParams = {
      Bucket: "file-uploads-bucket-s3",
      Key: `sqsdemo/order-${orderId}.txt`,
      Body: JSON.stringify(msgBody),
    };
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log("data", data);
    sendEmailHandler({ orderId });
  } catch (error) {
    console.log("Error", error);
  }
}
