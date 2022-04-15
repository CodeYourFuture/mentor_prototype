import { IntegrationResponse } from "../..";

export default async function (config, id, group) {
  const throttle = 1000;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let prs = {};
  let i = 0;
  for (const repo of config.repos) {
    const endpoint = `https://api.github.com/search/issues?q=is:pr+repo:${config.org}/${repo}/+author:${id}`;
    const headers = { authorization: `token ${config.token}` };
    const response = await fetch(endpoint, { headers });
    sleep(i++ * throttle);
    const json = await response.json();
    const hasPR = json.total_count > 0;
    if (json) prs[`hasPR_${repo}`] = { value: hasPR };
  }
  const totalPRs = Object.values(prs).filter((pr) => (pr as any).value).length;
  const totalObj = { value: totalPRs, favourite: true, sentiment: "neutral" };
  const github = { "Total PRs": totalObj, ...prs };
  if (group?.length) {
    const maxPRs = group?.filter((t) => t["Total PRs"].value).length;
    if (totalPRs >= maxPRs - 1) github["Total PRs"].sentiment = "positive";
    else if (totalPRs >= maxPRs - 3) github["Total PRs"].sentiment = "caution";
    else github["Total PRs"].sentiment = "negative";
  }
  return github as IntegrationResponse;
}
