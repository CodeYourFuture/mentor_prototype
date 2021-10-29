import fieldsList from '../blocks/fieldsList';
import quickUpdateButtons from '../blocks/quickUpdateButtons';
import database, { getSchema } from '../clients/apollo';
import getStudent from '../queries/getStudent.graphql';

// When the user @mention's a student
// Show them the student home form

type StudentHome = {
  studentName: string;
  studentID: string;
  timestamp: Date;
};

export const studentHome = async (params: StudentHome) => {
  const { data } = await database.query({
    query: getStudent,
    variables: { studentID: params.studentID },
    fetchPolicy: 'network-only',
  });
  const schema = await getSchema();
  const quickButtons = quickUpdateButtons(params);
  const fieldButtons = fieldsList({ ...params, data, schema });
  return [...quickButtons, { type: 'divider' }, ...fieldButtons];
};

export default async function ({ say, client, studentID, timestamp }) {
  const profile = await client.users.profile.get({ user: studentID });
  const studentName = profile.profile.display_name;
  const homeBlocks = await studentHome({
    studentName,
    studentID,
    timestamp,
  });
  await say({ blocks: homeBlocks, text: '', thread_ts: timestamp });
}
