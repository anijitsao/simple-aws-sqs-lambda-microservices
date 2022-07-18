// AWS SDK dependencies
import { ListIdentitiesCommand } from "@aws-sdk/client-ses";

// local dependencies
import { emailClient } from "../libs/emailClient.js";

export async function listGenericIdentities() {
  try {
    // list upto 10 Generic Email Accounts
    const params = {
      IdentityType: "EmailAddress",
      MaxRecords: 10,
    };

    const { Identities } = await emailClient.send(
      new ListIdentitiesCommand(params)
    );
    return Identities;
  } catch (error) {
    return error;
  }
}