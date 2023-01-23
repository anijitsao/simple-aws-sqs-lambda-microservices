// AWS SDK dependencies
import { SendEmailCommand } from "@aws-sdk/client-ses";

// local dependencies
import { emailClient } from "./libs/emailClient.js";
import { listGenericIdentities } from "./helpers/listGenericEmailIdentities.js";
import { sampleEmailTemplate } from "./helpers/generateTemplates.js";
import { sendResponse } from "./helpers/sendResponse.js";

export async function cronFileUploadHandler(event) {
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
              Data: sampleEmailTemplate.emailContent,
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

      // for HTTP API events send the response with some headers
      if (event && event.routeKey) {
        const res = {
          genericAccounts,
          sendEmailCode: emailData["$metadata"].httpStatusCode,
        };
        return sendResponse(process.env.SUCCESS_CODE, res);
      }
      return;
    }
  } catch (error) {
    // for HTTP API events send the response with some headers
    if (event && event.routeKey) {
      const res = { msg: "Unable to send Emails", error };
      return sendResponse(process.env.ERROR_CODE, res);
    }
    return;
  }
}
