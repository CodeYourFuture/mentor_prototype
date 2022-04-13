require("dotenv").config();
import slack, { getSlackChannels } from "../../clients/slack";
import { getSchema } from "../../clients/apollo";
import { json2csvAsync } from "json-2-csv";
import updateGroup from "./utils/updateGroup";
import driveClient, { getChannelSheet, JwtClient } from "../../clients/sheets";
import getAllMessagesInChannel from "./utils/getAllMessagesInChannel";
import getAllUsersInChannel from "./utils/getAllUsersInChannel";
import getTrainee from "./utils/getTrainee";
import { google } from "googleapis";

// If we pay for hasura this delay should go away
const throttle = 2000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Get a single channel
async function getChannelData({ client, channel }) {
  try {
    const channelID = channel.id;
    const schema = await getSchema();
    const cohortList = await getAllUsersInChannel({ client, channelID });
    const mentorList = await getAllUsersInChannel({
      client,
      channelID: process.env.ACCESS_CHANNEL_ID,
    });
    const allMessages = await getAllMessagesInChannel({ client, channelID });
    const cohort = (
      await Promise.all(
        cohortList
          .filter((studentID) => !mentorList.includes(studentID))
          .map(async (studentID, i) => {
            await sleep(throttle * i);
            return await getTrainee({ studentID, client, allMessages, schema });
          })
      )
    ).filter(Boolean) as any;
    return await json2csvAsync(cohort, { emptyFieldValue: "" });
  } catch (e) {
    console.error(e);
  }
}
// Get all channels
export default async () => {
  // return await adminapi();
  const drive = await driveClient();
  for (const channel of await getSlackChannels()) {
    console.log("\n✨", channel.name);
    const csv = await getChannelData({ client: slack.client, channel });
    const mimeType = "application/vnd.google-apps.spreadsheet";
    const file = await getChannelSheet({
      client: drive,
      channelID: channel.id,
    });
    const requestBody = { name: `${channel.name}`, mimeType };
    const media = { mimeType: "text/csv", body: csv };
    const fields = "id, webViewLink, webContentLink";
    const permissionBody = {
      role: "reader",
      type: "user",
      emailAddress: "mentor@dom.vin",
    };
    await updateGroup({ slack: slack.client });
    if (!file) {
      const newFile = await drive.files.create({ requestBody, media, fields });
      await drive.permissions.create({
        requestBody: permissionBody,
        fileId: newFile.data.id,
        fields: "id",
      });
    } else {
      await drive.files.update({
        fileId: file.id,
        requestBody,
        media,
        fields,
      });
      await drive.permissions.update({
        requestBody: permissionBody,
        fileId: file.id,
        fields: "id",
      });
    }
  }
};
