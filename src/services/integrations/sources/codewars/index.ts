import { IntegrationType } from "../github";

const Integration = (integrationID) => {
  // /** Codewars has a public API; docs here:
  //  * https://dev.codewars.com/#introduction
  //  */
  // const CODEWARSIDS = SpreadsheetApp.getActive()
  //   .getSheetByName("Trainee Info")
  //   .getRange("F:F")
  //   .getValues();
  // //arggh off by one
  // CODEWARSIDS.unshift([]);
  // function batchRank() {
  //   const rankColumn = SpreadsheetApp.getActive()
  //     .getSheetByName("Performance")
  //     .getRange("C:C");
  //   const rankOfTrainees = CODEWARSIDS.map((userName, rowIndex) =>
  //     rowIndex > 1 ? [getRank(userName)] : ["CW Rank"]
  //   );
  //   rankColumn.setValues(rankOfTrainees);
  // }
  // function batchPoints() {
  //   const rankColumn = SpreadsheetApp.getActive()
  //     .getSheetByName("Performance")
  //     .getRange("D:D");
  //   const rankOfTrainees = CODEWARSIDS.map((userName, rowIndex) =>
  //     rowIndex > 1 ? [getPoints(userName)] : ["JS Points"]
  //   );
  //   // off by one!
  //   rankColumn.setValues(rankOfTrainees);
  // }
  // function getCodewars() {
  //   batchPoints();
  //   batchRank();
  // }
  // /**
  //  * Converts Codewars Name to Codewars Rank
  //  * Available as a formula anywhere, expensive!
  //  * @param {string} Codewars username .
  //  * @return {string} API call to Codewars returning Javascript rank
  //  * @customfunction
  //  */
  // function getRank(userName) {
  //   const endpoint = "https://www.codewars.com/api/v1/users/" + userName;
  //   try {
  //     const response = UrlFetchApp.fetch(endpoint);
  //     const profile = JSON.parse(response.getContentText());
  //     return profile.ranks.languages.javascript.name.replace("kyu", "");
  //   } catch (e) {
  //     return 9;
  //   }
  // }
  // /**
  //  * Converts Codewars Name to Codewars Points
  //  * Available as a formula anywhere, but expensive!
  //  * @param {string} Codewars username .
  //  * @return {string} API call to Codewars returning Javascript points
  //  * @customfunction
  //  */
  // function getPoints(userName) {
  //   const endpoint = "https://www.codewars.com/api/v1/users/" + userName;
  //   try {
  //     const response = UrlFetchApp.fetch(endpoint);
  //     const profile = JSON.parse(response.getContentText());
  //     return profile.ranks.languages.javascript.score;
  //   } catch (e) {
  //     return 0;
  //   }
  // }
  // /**
  //  * Fetches the challenges done for one traineeID
  //  *
  //  * @param {string} Codewars ID.
  //  * @param {number} Page. 200 results per page, starting at page 0.
  //  * @return array of challenges that have been completed by this codewars ID or an empty array if something went wrong.
  //  * private @customfunction
  //  */
  // function getTraineeChallenges_(cwID, page) {
  //   const urlPath =
  //     apiPath + `users/${cwID}/code-challenges/completed?page=${page}`;
  //   try {
  //     const response = UrlFetchApp.fetch(urlPath);
  //     const challenges = JSON.parse(response.getContentText()).data;
  //     return challenges;
  //   } catch (e) {
  //     return [];
  //   }
  // }
};

export default Integration as IntegrationType;
