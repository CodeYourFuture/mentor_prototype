import database from '../clients/apollo';
import getStudent from '../queries/getStudent.graphql';
import schema from '../schema';
import { json2csvAsync } from 'json-2-csv';
import { google } from 'googleapis';

export default async function ({
  say,
  client,
  channelID,
  timestamp,
  reporterID,
}) {
  const { profile } = await client.users.profile.get({ user: reporterID });
  say({
    text: `I'll generate a report and send it to ${profile.email}. Keep an eye on your inbox.`,
    thread_ts: timestamp,
  });
  const { members: cohortList } = await client.conversations.members({
    channel: channelID,
  });
  const { members: volunteerList } = await client.conversations.members({
    channel: process.env.ACCESS_CHANNEL_ID,
  });
  //
  // Fetch data for all members of channel (filter out volunteers)
  const cohort = (await Promise.all(
    cohortList
      .filter((studentID) => !volunteerList.includes(studentID))
      .map(async (studentID) => {
        const { profile } = await client.users.profile.get({ user: studentID });
        const { data } = await database.query({
          query: getStudent,
          variables: { studentID },
          fetchPolicy: 'network-only',
        });
        const values = data.updates_aggregate?.nodes;
        return {
          Name: profile.real_name,
          ...[...schema]
            .map(({ key, label, defaultValue, integration }) => {
              const dbVal = values?.find(({ key: k }) => k === key)?.value;
              const value = integration
                ? '🔗'
                : dbVal || defaultValue || 'Unknown';
              return { column: label, value };
            })
            .reduce(
              (acc, { column, value }) => ({ ...acc, [column]: value }),
              {}
            ),
        };
      })
  )) as any;
  //
  // Convert to CSV
  const csv = await json2csvAsync(cohort);

  //
  // Send to google sheets
  const { SHEETS_CLIENT_EMAIL: EMAIL, SHEETS_PRIVATE_KEY: KEY } = process.env;
  const scope = ['https://www.googleapis.com/auth/drive'];
  const JwtClient = new google.auth.JWT(EMAIL, null, KEY, scope);
  const drive = google.drive({ version: 'v3', auth: JwtClient });
  const mimeType = 'application/vnd.google-apps.spreadsheet';
  const newFile = await drive.files.create({
    requestBody: { name: 'Chort', mimeType },
    media: { mimeType: 'text/csv', body: csv },
    fields: 'id',
  });
  await drive.permissions.create({
    requestBody: { role: 'reader', type: 'user', emailAddress: profile.email },
    fileId: newFile.data.id,
    fields: 'id',
  });
}
