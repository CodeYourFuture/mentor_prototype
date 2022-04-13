import { google } from "googleapis";

const driveClient = async function () {
  const { SHEETS_CLIENT_EMAIL: EMAIL, SHEETS_PRIVATE_KEY: KEY } = process.env;
  const scope = ["https://www.googleapis.com/auth/drive"];
  const JwtClient = new google.auth.JWT(
    EMAIL,
    null,
    KEY.replace(/\\n/g, "\n"),
    scope
  );
  const drive = google.drive({ version: "v3", auth: JwtClient });
  return drive;
};
export default driveClient;

export const getChannelSheet = async ({ client, channelID }) => {
  try {
    const { channel } = await client.conversations.info({ channel: channelID });
    const drive = await driveClient();
    const files = await drive.files.list({ q: `name='${channel.name}'` });
    const file = files.data.files[0];
    return file;
  } catch {
    return undefined;
  }
};
