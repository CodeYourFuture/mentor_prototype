import database from '../clients/apollo';
import getStudent from '../queries/getStudent.graphql';
import schema from '../schema';
import { json2csvAsync } from 'json-2-csv';

export default async function ({
  say,
  client,
  channelID,
  timestamp,
  reporterID,
}) {
  const { members } = await client.conversations.members({
    channel: channelID,
  });

  const { members: volunteerList } = await client.conversations.members({
    channel: process.env.PERMISSIONS_CHANNEL_ID,
  });
  // TODO: filter cohort to exclude volunteers
  const cohort = (await Promise.all(
    members
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
  const csv = await json2csvAsync(cohort);
  await client.files.upload({
    content: csv,
    filename: `${timestamp}-cohort.csv`,
    filetype: 'csv',
    thread_ts: timestamp,
    channels: `${reporterID}`,
    initial_comment: 'Google sheets link coming soon',
  });
}
