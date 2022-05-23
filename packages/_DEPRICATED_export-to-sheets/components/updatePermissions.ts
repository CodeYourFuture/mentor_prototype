import { JwtClient } from "../../../cyfbot/CYFBot/src/clients/sheets";
import slack, {
  accessChannelID,
  getUsersInChannel,
} from "../../../cyfbot/CYFBot/src/clients/slack";
require("dotenv").config();
const { google } = require("googleapis");

export default async () => {
  const mentorList = await getUsersInChannel({
    channelID: await accessChannelID(),
  });
  const mentorEmails = (
    (await Promise.all(
      mentorList.map(async (mentorID) => {
        const { profile } = await slack.client.users.profile.get({
          user: mentorID,
        });
        return (
          profile.email || profile.fields?.[process.env.EMAIL_FIELD_ID]?.value
        );
      })
    )) || []
  ).filter(Boolean);

  const groupKey = process.env.SHEETS_ACCESS_GROUP_KEY;
  const service = google.admin({ auth: JwtClient(), version: "directory_v1" });

  for (const memberKey of mentorEmails) {
    try {
      await service.members.hasMember({ groupKey, memberKey });
      console.log(`🔑 ${memberKey}`);
    } catch (e) {
      console.log(`🔑 ${memberKey}`);
      try {
        await service.members.insert({
          groupKey,
          requestBody: {
            email: memberKey,
            role: "MEMBER",
          },
        });
      } catch (e) {}
    }
  }
};
