// AWS dependencies
import { SQSClient } from "@aws-sdk/client-sqs";

// initialize the client
const messageQueueClient = new SQSClient({ region: process.env.REGION });

export { messageQueueClient };
