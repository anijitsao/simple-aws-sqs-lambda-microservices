//AWS dependencies
import { SendMessageCommand } from "@aws-sdk/client-sqs";

// npm dependencies
import { v4 as uuidv4 } from "uuid";

// local dependencies
import { messageQueueClient } from "../libs/queueClient.js";

export async function addMessageToQueue(messageData, queueUrl) {
  const { itemPurchased, storeName } = messageData;
  const params = {
    // DelaySeconds: 10,
    MessageAttributes: {
      StoreName: {
        DataType: "String",
        StringValue: storeName,
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
    MessageBody: JSON.stringify(itemPurchased),
  };
  const data = messageQueueClient.send(new SendMessageCommand(params));
  return data;
}
