import database, { getSchema } from "../clients/apollo";
import getStudent from "../queries/getStudent.graphql";
import getCheckInReporters from "../queries/getCheckInReporters.graphql";
import { json2csvAsync } from "json-2-csv";
import { google } from "googleapis";
import fs from "fs";

export default async function ({ say, client, channelID, reporterID }) {
  const { SHEETS_CLIENT_EMAIL: EMAIL, SHEETS_PRIVATE_KEY: KEY } = process.env;
  const scope = ["https://www.googleapis.com/auth/drive"];
  const JwtClient = new google.auth.JWT(
    EMAIL,
    null,
    KEY.replace(/\\n/g, "\n"),
    scope
  );
  const drive = google.drive({ version: "v3", auth: JwtClient });

  const { channel } = await client.conversations.info({ channel: channelID });

  // TODO, get the channel name
  try {
    const files = await drive.files.list({ q: `name='${channel.name}'` });
    const file = files.data.files[0];
    const url = `https://drive.google.com/file/u/0/d/${file.id}/preview`;
    say(url);
  } catch (e) {
    say(
      `Access denied. Please add CYFBot to the ${channel.name} channel to generate a report.`
    );
  }
}
