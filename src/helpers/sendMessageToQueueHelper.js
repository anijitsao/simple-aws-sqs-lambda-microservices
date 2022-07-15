//AWS dependencies
import { SendMessageCommand } from "@aws-sdk/client-sqs";

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
      QuantityPurchased: {
        DataType: "Number",
        StringValue: qtyPurchased,
      },
    },
    QueueUrl: queueUrl,
    // following fields are must for FIFO queue
    MessageDeduplicationId: "TheWhistler",
    MessageGroupId: "Group1",
    MessageBody: "This items are purchased from the store",
  };
  const data = messageQueueClient.send(new SendMessageCommand(params));
  return data;
}
