require("dotenv").config();
import slack, { getSlackChannels } from "../../clients/slack";
import { getSchema } from "../../clients/apollo";
import { json2csvAsync } from "json-2-csv";
import updateGroup from "./utils/updatePermissions";
import driveClient, { getChannelSheet } from "../../clients/sheets";
import getAllMessagesInChannel from "./utils/getAllMessagesInChannel";
import getAllUsersInChannel from "./utils/getAllUsersInChannel";
import getTrainee from "./utils/getTrainee";
import { GoogleSpreadsheet } from "google-spreadsheet";
import populateSheet from "./utils/populateSheet";

// If we pay for hasura this delay should go away
const throttle = 4000;
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
    return cohort;
    // return await json2csvAsync(cohort, { emptyFieldValue: "" });
  } catch (e) {
    console.error(e);
  }
}
// Get all channels
export default async () => {
  // return await adminapi();
  const drive = await driveClient();

  const bot = await slack.client.auth.test();
  for (const channel of await getSlackChannels({ userID: bot.user_id })) {
    console.log("\n🚚", channel.name);
    const csv = await getChannelData({ client: slack.client, channel });
    const mimeType = "application/vnd.google-apps.spreadsheet";
    // const file = await getChannelSheet({
    //   client: drive,
    //   channelID: channel.id,
    // });
    const requestBody = {
      name: `${channel.name} (updated ${new Date().toISOString()})`,
      mimeType,
    };
    const media = { mimeType: "text/csv", body: "" };
    const fields = "id, webViewLink, webContentLink";
    const permissionBody = {
      role: "reader",
      type: "user",
      emailAddress: "mentor@dom.vin",
    };
    await updateGroup({ slack: slack.client });
    // if (!file) {
    const newFile = await drive.files.create({
      requestBody,
      media,
      fields,
    });
    await drive.permissions.create({
      requestBody: permissionBody,
      fileId: newFile.data.id,
      fields: "id",
    });
    const doc = new GoogleSpreadsheet(newFile.data.id);
    await populateSheet({ doc, data: csv });
    console.log(
      `👉 ${newFile.data.webViewLink.replace("/edit", "/template/preview")}`
    );
    // } else {
    //   await drive.files.update({
    //     fileId: file.id,
    //     requestBody,
    //     media,
    //     fields,
    //   });
    //   await drive.permissions.update({
    //     requestBody: permissionBody,
    //     fileId: file.id,
    //     fields: "id",
    //   });
    //   console.log(
    //     `👆 ${file.webViewLink.replace("/edit", "/template/preview")}`
    //   );
    // }
  }
};
