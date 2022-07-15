//AWS dependencies
// import { ListQueuesCommand } from "@aws-sdk/client-sqs";

// local dependencies
import { sendResponse } from "../helpers/sendResponse.js";
// import { messageQueueClient } from "../lib/queueClient.js";
import { listAllQueues } from "../helpers/listQueuesHelpers.js";

export async function sendMessageQueueHandler(event) {
  try {
    const queueURLs = await listAllQueues();
    const res = {
      message: "API endpoint reached",
      queueURLs,
    };
    return sendResponse(process.env.SUCCESS_CODE, res);
  } catch (error) {
    const res = { message: "Error occurred", error };
    return sendResponse(process.env.ERROR_CODE, res);
  }
}
