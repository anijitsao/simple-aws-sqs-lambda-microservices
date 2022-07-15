//AWS dependencies
import { SendMessageCommand } from "@aws-sdk/client-sqs";

// npm dependencies
import { v4 as uuidv4 } from "uuid";

// local dependencies
import { messageQueueClient } from "../lib/queueClient.js";

export async function addMessageToQueue(messageData) {
  const { itemName, qtyPurchased, queueUrl } = messageData;
  const params = {
    // DelaySeconds: 10,
    MessageAttributes: {
      ItemName: {
        DataType: "String",
        StringValue: itemName,
      },
      PurchasedTime: {
        DataType: "String",
        StringValue: new Date().toISOString(),
      },
    },
    QueueUrl: queueUrl,
    // following fields are must for FIFO queue
    MessageDeduplicationId: uuidv4(),
    MessageGroupId: process.env.MESSAGE_GROUP_ID,
    MessageBody: JSON.stringify({ itemName, qtyPurchased }),
  };
  const data = messageQueueClient.send(new SendMessageCommand(params));
  return data;
}
