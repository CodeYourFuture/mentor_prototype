import fieldsList from "../blocks/fieldsList";
import quickUpdateButtons from "../blocks/quickUpdateButtons";
import traineeCohortList from "../blocks/traineeCohortList";
import database, { getSchema } from "../../../clients/apollo";
import getStudent from "../../api/queries/getStudent.graphql";

// When the user @mention's a student
// Show them the student home form

type StudentHome = {
  studentName: string;
  studentID: string;
  timestamp: Date;
  slackClient: any;
};

export const studentHome = async (params: StudentHome) => {
  const { data } = await database.query({
    query: getStudent,
    variables: { studentID: params.studentID },
    fetchPolicy: "network-only",
  });
  const schema = await getSchema();
  const quickButtons = quickUpdateButtons(params);
  const fieldButtons = fieldsList({ ...params, data, schema });
  const traineeCohorts = await traineeCohortList(params);
  return [
    ...quickButtons,
    { type: "divider" },
    ...traineeCohorts,
    ...fieldButtons,
  ];
};

export default async function ({ say, client, studentID, timestamp }) {
  const indicator = await say({
    text: "Fetching trainee information...",
    thread_ts: timestamp,
  });
  const profile = await client.users.profile.get({ user: studentID });
  const studentName = profile.profile.display_name;
  const homeBlocks = await studentHome({
    studentName,
    studentID,
    timestamp,
    slackClient: client,
  });
  await client.chat.delete({
    channel: indicator.channel,
    ts: indicator.ts,
  });
  await say({ blocks: homeBlocks, text: "", thread_ts: timestamp });
}
