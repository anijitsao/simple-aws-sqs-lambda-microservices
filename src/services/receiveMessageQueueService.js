// local dependencies
import { sendEmailHandler } from "./sendEmailService.js";

export async function receiveMessageQueueHandler(event) {
  console.log("SQS Event received\n", event);
  event.Records.forEach((ele) => {
    if (ele.eventSourceARN === process.env.QUEUE_ARN) {
      processEvent(ele);
    }
  });
}

function processEvent(eventData) {
  console.log(JSON.parse(eventData.body));
  console.log("Message attributes are\n", eventData.messageAttributes);
  return sendEmailHandler(eventData);
}
