//AWS dependencies
import { ListQueuesCommand } from "@aws-sdk/client-sqs";

// local dependencies
import { messageQueueClient } from "../libs/queueClient.js";

export async function listAllQueues() {
  const listOfQueues = await messageQueueClient.send(new ListQueuesCommand({}));
  return listOfQueues.QueueUrls;
}
