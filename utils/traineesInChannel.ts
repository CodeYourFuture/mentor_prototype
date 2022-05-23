import database from "../clients/apollo";
import { accessChannelID, getUsersInChannel } from "../clients/slack";
import getTraineesInTeamGraphql from "../queries/getTraineesInTeam.graphql";

export default async ({ channelID }) => {
  const channelUserList = await getUsersInChannel({ channelID });
  const mentorList = await getUsersInChannel({
    channelID: await accessChannelID(),
  });
  const traineesInTeam = await database.query({
    query: getTraineesInTeamGraphql,
    variables: { teamID: process.env.TEAM_ID },
    fetchPolicy: "network-only",
  });
  const listOfTrainees = traineesInTeam.data.updates.map(
    ({ student }) => student
  );
  const trainees = channelUserList.filter(
    (studentID) =>
      !mentorList.includes(studentID) && listOfTrainees.includes(studentID)
  );
  return trainees;
};
