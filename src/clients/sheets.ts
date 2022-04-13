import { google } from "googleapis";

export const JwtClient = function () {
  const { SHEETS_CLIENT_EMAIL: EMAIL, SHEETS_PRIVATE_KEY: KEY } = process.env;
  const scope = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/admin.directory.user",
    "https://www.googleapis.com/auth/admin.directory.group",
  ];
  return new google.auth.GoogleAuth({
    keyFilename: "./src/clients/cyfbot-3ff286a4571b.json",
    // keyFile: "./src/clients/cyfbot-3ff286a4571b.json",
    scopes: scope,
    projectId: "cyfbot",
  });
};

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

const driveClient = async function () {
  const drive = google.drive({ version: "v3", auth: JwtClient() });
  return drive;
};
export default driveClient;
