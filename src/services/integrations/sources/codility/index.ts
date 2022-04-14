import { IntegrationResponse } from "../..";

// An integration is a FUNCTION which runs PER TRAINEE
export default async function (
  id: string, // The trainee's ID for this integration service
  group?: IntegrationResponse[] // Data of other trainees (for comparison)
): Promise<IntegrationResponse> {
  //   // /**
  //   //  * TODO I think this is misaligned by one row also it's SUPER FRAGILE as it increments so if the PROMs run it twice everything goes wrong REALLY could do with  a bit of a rethink PLS
  //   //  * Score (for now, until our tests are better targeted)
  //   //  *
  //   //  * 1 for not taking the test
  //   //  * 2 for taking it
  //   //  * 3 for getting any score
  //   //  *
  //   //  * Probably just do this in a batch as it will have a manual component anyway when the PrOMs add the Codility export csv
  //   //  * Unless someone feels moved to pull from the Codility API (overkill?)
  //   //  * https://developers.google.com/apps-script/quickstart/custom-functions
  //   //  */
  //   // const CODILITYSHEET =
  //   //   SpreadsheetApp.getActive().getSheetByName("codility-export");
  //   // const CODILITYHEADERS = SpreadsheetApp.getActive()
  //   //   .getSheetByName("codility-export")
  //   //   .getDataRange()
  //   //   .getValues()[0];
  //   // const quantifyCodility = (score) =>
  //   //   score === "NA" ? 1 : score === 0 ? 2 : 3;
  //   // function batchCodility() {
  //   //   warnCodility();
  //   // }
  //   // function getCodility() {
  //   //   CODILITYSHEET.setFrozenRows(1); // freeze the headers here because it will be a new sheet each time
  //   //   sortTabByName(
  //   //     CODILITYSHEET,
  //   //     getColumnNumberByHeading(CODILITYHEADERS, "First Name")
  //   //   );
  //   //   let codilityScores = getRangeByHeading(
  //   //     CODILITYSHEET,
  //   //     CODILITYHEADERS,
  //   //     "% total score"
  //   //   ).getValues();
  //   //   let codilityColumn = SpreadsheetApp.getActive()
  //   //     .getSheetByName("Performance")
  //   //     .getRange("E:E");
  //   //   let currentScores = codilityColumn.getValues();
  //   //   let scoresOfTrainees = codilityScores.map((score, rowIndex) =>
  //   //     rowIndex > 0
  //   //       ? [+currentScores[rowIndex + 1] + +quantifyCodility(score[0])]
  //   //       : ["Codility"]
  //   //   );
  //   //   scoresOfTrainees = [currentScores[0], ...scoresOfTrainees];
  //   //   codilityColumn.setValues(scoresOfTrainees);
  //   // }
  //   // function warnCodility() {
  //   //   let result = SpreadsheetApp.getUi().alert(
  //   //     "⚠️ You're about to run a destructive function",
  //   //     "I am a Programme Manager and I have correctly exported the latest scores from Codility.",
  //   //     SpreadsheetApp.getUi().ButtonSet.YES_NO
  //   //   );
  //   //   if (result === SpreadsheetApp.getUi().Button.YES) {
  //   //     getCodility();
  //   //     SpreadsheetApp.getActive().toast(
  //   //       "Codility sheet was alphabetised and Performance score was incremented."
  //   //     );
  //   //   } else {
  //   //     SpreadsheetApp.getActive().toast("Phew. It's all fine, don't worry!");
  //   //   }
  //   // }
  return;
}
