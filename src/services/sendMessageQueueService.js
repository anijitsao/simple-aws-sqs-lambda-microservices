//AWS dependencies
// import { ListQueuesCommand } from "@aws-sdk/client-sqs";

// local dependencies
import { sendResponse } from "../helpers/sendResponse.js";
// import { messageQueueClient } from "../lib/queueClient.js";
import { listAllQueues } from "../helpers/listQueuesHelper.js";
import { addMessageToQueue } from "../helpers/sendMessageToQueueHelper.js";

export async function sendMessageQueueHandler(event) {
  try {
    // listing all the message queues in that region and check
    // if the app mentioned queue is present there
    const queueURLs = await listAllQueues();
    let queueExists = false;
    let appQueueUrl = "";
    for (let i = 0; i < queueURLs.length; i++) {
      if (queueURLs[i].indexOf(process.env.QUEUE_NAME) !== -1) {
        queueExists = true;
        appQueueUrl = queueURLs[i];
        break;
      }
    }
    if (!queueExists) {
      return sendResponse(process.env.ERROR_CODE, {
        message: "Application mentioned Queue is not present",
      });
    }
    const addMessageData = await addMessageToQueue({
      itemName: "Tata Salt",
      qtyPurchased: "6",
      queueUrl: appQueueUrl,
    });
    const res = {
      message: "API endpoint reached",
      queueURLs,
      addMessageData,
    };
    return sendResponse(process.env.SUCCESS_CODE, res);
  } catch (error) {
    const res = { message: "Error occurred", error };
    return sendResponse(process.env.ERROR_CODE, res);
  }
}
