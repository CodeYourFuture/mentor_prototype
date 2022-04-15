import database, { getSchema } from "../../../clients/apollo";
import getStudent from "../../../queries/getStudent.graphql";
import getCheckInReporters from "../../../queries/getCheckInReporters.graphql";
import { json2csvAsync } from "json-2-csv";
import { google } from "googleapis";
import fs from "fs";
import { getChannelSheet } from "./../../../clients/sheets";

export default async function ({ say, client, channelID, timestamp }) {
  const { channel } = await client.conversations.info({ channel: channelID });

  // TODO, get the channel name
  try {
    const file = await getChannelSheet({ client, channelID: channel.id });
    if (!file) {
      await say({
        text: "No data found",
        thread_ts: timestamp,
      });
    }
    const url = `https://drive.google.com/file/u/0/d/${file.id}/template/preview`;
    await say({
      text: url,
      thread_ts: timestamp,
    });
  } catch (e) {
    await say({
      text: `Access denied. Please add CYFBot to the ${channel.name} channel to generate a report.`,
      thread_ts: timestamp,
    });
    console.log(e);
  }
}
