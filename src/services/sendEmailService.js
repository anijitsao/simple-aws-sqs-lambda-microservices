// AWS SDK dependencies
import { SendEmailCommand } from "@aws-sdk/client-ses";

// local dependencies
import { emailClient } from "../libs/emailClient.js";
import { listGenericIdentities } from "../helpers/listGenericEmailIdentities.js";
import { sampleEmailTemplate } from "../helpers/generateTemplates.js";

export async function sendEmailHandler(event) {
  try {
    // list set of Generic Email Accounts which will send the emails
    const genericAccounts = await listGenericIdentities();

    if (Array.isArray(genericAccounts)) {
      const emailParams = {
        Destination: {
          CcAddresses: [],
          // list of receiver accounts
          ToAddresses: ["anijitsau@gmail.com"],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: sampleEmailTemplate.emailContent.replace(
                "{{orderId}}",
                event.orderId
              ),
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: process.env.SAMPLE_EMAIL_SUBJECT,
          },
        },
        Source: genericAccounts[0],
        ReplyToAddresses: [],
      };

      // sending the Email
      const emailData = await emailClient.send(
        new SendEmailCommand(emailParams)
      );

      return;
    }
  } catch (error) {
    return error.toString();
  }
}
