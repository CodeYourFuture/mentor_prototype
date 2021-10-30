import database, { getSchema } from '../clients/apollo';
import getStudent from '../queries/getStudent.graphql';
import { json2csvAsync } from 'json-2-csv';
import { google } from 'googleapis';

// When the user #mention's a channel
// Generate a Google Sheet and email it to them

export default async function ({ say, client, channelID, reporterID }) {
  const { profile } = await client.users.profile.get({ user: reporterID });
  const { channel: cohortInfo } = await client.conversations.info({
    channel: channelID,
  });
  const schema = await getSchema();
  say({
    text: `I'll generate a report for #${cohortInfo.name} and send it to ${profile.email}. Keep an eye on your inbox.`,
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
        return {
          StudentID: studentID,
          Name: profile.real_name,
          ...[...schema]
            .map(({ key, label, default_value, integration }) => {
              const dbVal = data.updates?.nodes?.find(
                ({ key: k }) => k === key
              )?.value;
              const value = integration
                ? '🔗'
                : dbVal || default_value || 'Unknown';
              return { column: label, value };
            })
            .reduce(
              (acc, { column, value }) => ({ ...acc, [column]: value }),
              {}
            ),
          'Check-ins': data.quick_ALL.aggregate.count,
          Overachieving: !data.quick_OVERACHIEVING.aggregate.count
            ? '0%'
            : `${
                (data.quick_OVERACHIEVING.aggregate.count /
                  data.quick_ALL.aggregate.count) *
                100
              }%`,
          Concerns: data.quick_CONCERN.aggregate.count,
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
  const sheetName = `${cohortInfo.name} (${new Date().toISOString()})`;
  const newFile = await drive.files.create({
    requestBody: { name: sheetName, mimeType },
    media: { mimeType: 'text/csv', body: csv },
    fields: 'id',
  });
  await drive.permissions.create({
    requestBody: { role: 'reader', type: 'user', emailAddress: profile.email },
    fileId: newFile.data.id,
    fields: 'id',
  });
}
