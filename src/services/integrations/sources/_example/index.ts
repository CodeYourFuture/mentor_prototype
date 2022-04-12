//
// Integration service: example.io
//
type Response = { score: number; isTopScore: boolean };

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
  const isTopScore = Math.max(...group.map(({ score }) => score)) === score;

  // This response data is stored against the user in JSON format, ready for querying
  return { score, isTopScore };
}
