// import the SES client
import { SESClient } from "@aws-sdk/client-ses";

// initialize the client and export
const emailClient = new SESClient({ region: process.env.REGION });
export { emailClient };