// local dependencies
import { sendResponse } from "../helpers/sendResponse.js";
import { listAllQueues } from "../helpers/listQueuesHelper.js";
import { addMessageToQueue } from "../helpers/addMessageToQueueHelper.js";

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

    // extracting the message from the API body
    const messageReceived = event?.body && JSON.parse(event.body);
    if (
      !messageReceived ||
      !messageReceived.itemPurchased ||
      !messageReceived.storeName
    ) {
      return sendResponse(process.env.ERROR_CODE, {
        message: "Purchase Data is Missing",
      });
    }
    const addMessageData = await addMessageToQueue(
      messageReceived,
      appQueueUrl
    );
    const res = {
      appQueueUrl,
      messageId: addMessageData.MessageId,
    };
    return sendResponse(process.env.SUCCESS_CODE, res);
  } catch (error) {
    const res = { message: "Error occurred", error: error.toString() };
    return sendResponse(process.env.ERROR_CODE, res);
  }
}
