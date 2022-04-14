import { google } from "googleapis";

export const JwtClient = function () {
  const { SHEETS_CLIENT_EMAIL: EMAIL, SHEETS_PRIVATE_KEY: KEY } = process.env;
  const scope = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/admin.directory.user",
    "https://www.googleapis.com/auth/admin.directory.group",
  ];

  const JwtClient = new google.auth.JWT(
    EMAIL,
    null,
    KEY.replace(/\\n/g, "\n"),
    scope
  );
  return JwtClient;
};

export const getChannelSheet = async ({ client, channelID }) => {
  try {
    const { channel } = await client.conversations.info({ channel: channelID });
    const drive = await driveClient();
    const files = await drive.files.list({ q: `name='${channel.name}'` });
    // console.log({ files });
    const file = files.data.files[0];
    return file;
  } catch (e) {
    // console.error(e);
    return undefined;
  }
};

const driveClient = async function () {
  const drive = google.drive({ version: "v3", auth: JwtClient() });
  return drive;
};
export default driveClient;
