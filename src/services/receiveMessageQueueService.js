export async function receiveMessageQueueHandler(event) {
  console.log("SQS Event received\n", event);
  console.log("Printing event body");
  event.Records.forEach((ele) => {
    if (ele.eventSourceARN === process.env.QUEUE_ARN) {
      processEvent(ele);
    }
  });
}

function processEvent(eventData) {
  console.log(JSON.parse(ele.body));
  console.log("Message attributes are\n", ele.messageAttributes);
}
