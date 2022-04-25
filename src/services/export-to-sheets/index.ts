require("dotenv").config();
import slack, {
  getSlackChannels,
  getMessagesInChannel,
} from "../../clients/slack";
import { getSchema } from "../../clients/apollo";
import updateGroup from "./components/updatePermissions";
import driveClient from "../../clients/sheets";
import getTrainee from "./components/getTrainee";
import { GoogleSpreadsheet } from "google-spreadsheet";
import populateSheet from "./components/populateSheet";
import { sleep } from "../../utils/methods";
import getTraineesInChannel from "../../utils/traineesInChannel";

const THROTTLE = 2000; // hasura

// For each channel
export default async () => {
  const drive = await driveClient();
  const bot = await slack.client.auth.test();
  const channels = await getSlackChannels({ userID: bot.user_id });
  const schema = await getSchema();
  for (const channel of channels) {
    console.log("🚚", channel.name);
    const trainees = await getTraineesInChannel({ channelID: channel.id });
    const allMessages = await getMessagesInChannel({ channelID: channel.id });

    // create new sheet
    const newFile = await drive.files.create({
      requestBody: {
        name: `${channel.name}`,
        mimeType: "application/vnd.google-apps.spreadsheet",
      },
      media: { mimeType: "text/csv", body: "" },
      fields: "id, webViewLink, webContentLink",
    });
    const doc = new GoogleSpreadsheet(newFile.data.id);

    // Add trainees to sheet
    let data = [];
    for (const studentID of trainees) {
      const trainee = await getTrainee({
        studentID,
        allMessages,
        schema,
      });
      if (trainee) data.push(trainee);
      await sleep(THROTTLE);
    }
    await populateSheet({ doc, data });

    // set permissions
    await updateGroup();
    await drive.permissions.create({
      requestBody: {
        role: "reader",
        type: "user",
        emailAddress: process.env.SHEETS_ACCESS_GROUP_EMAIL,
      },
      fileId: newFile.data.id,
      fields: "id",
    });
    const url = newFile.data.webViewLink.replace("/edit", "/template/preview");
    console.log(`👉 ${url}`);
  }

  console.log("✨ Export complete");
};
