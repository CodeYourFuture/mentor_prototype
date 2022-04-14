import { IntegrationResponse } from "../..";
const fs = require("fs");

export default async function (
  id: string, // The trainee's ID for this integration service
  group?: IntegrationResponse[] // Data of other trainees (for comparison)
): Promise<IntegrationResponse> {
  const config = JSON.parse(
    fs.readFileSync(__dirname + "/default_config.json")
  );
  let prs = {};
  for (const repo of config.repos) {
    const endpoint = `https://api.github.com/search/issues?q=is:pr+repo:CodeYourFuture/${repo}/+author:${id}`;
    const response = await fetch(endpoint, {
      headers: { authorization: `token ${config.token}` },
    });
    const { total_count } = await response.json();
    const hasPR = total_count > 0;
    prs[`hasPR_${repo}`] = { value: hasPR };
  }
  const totalPRs = Object.values(prs).filter((pr) => (pr as any).value).length;
  const response = {
    "Total PRs": { value: totalPRs, favourite: true, sentiment: "neutral" },
    ...prs,
  };
  if (group?.length) {
    const maxPRs = group?.filter((t) => t["Total PRs"].value).length;
    if (totalPRs >= maxPRs - 1) response["Total PRs"].sentiment = "positive";
    else if (totalPRs >= maxPRs - 3)
      response["Total PRs"].sentiment = "caution";
    else response["Total PRs"].sentiment = "negative";
  }
  return response as IntegrationResponse;
}
