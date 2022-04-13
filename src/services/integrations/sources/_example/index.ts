import { Response } from "../..";

//
// Integration service: example.io
//

// An integration is a FUNCTION which runs PER TRAINEE
export default async function (
  id: string, // The trainee's ID for this integration service
  group?: Response[] // Data of other trainees (for comparison)
): Promise<Response> {
  //
  // Fetch data from an external service
  const key = process.env.api_key; // see default_config.json
  const { score }: any = await fetch(`example.io/user=${id}&key=${key}`);

  // Compare this trainee's score to their classmates
  const scores = group.map((t) => t.find((d) => d.key === "score").value);
  const isTopScore = Math.max(...(scores as number[])) === score;
  const sentiment = isTopScore ? "positive" : "neutral";

  // This response data is stored against the user in JSON format, ready for querying
  return [
    { key: "isTopScore", value: isTopScore, favourite: true }, // 'favourite' identifies this as a key metric
    { key: "score", value: score, sentiment }, // 'sentiment' determines the colour of the cell in google sheets
  ];
}
