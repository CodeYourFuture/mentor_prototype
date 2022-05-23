import { sleep } from "../../../CONFIG";

export const fetchData = async (config, id) => {
  let prs = {};
  const fetchConfig = { headers: { authorization: `token ${config.token}` } };
  for (const repo of config.repos) {
    try {
      const endpoint = `https://api.github.com/search/issues?q=is:pr+repo:${config.org}/${repo}/+author:${id}`;
      const response = await fetch(endpoint, fetchConfig);
      const json = await response.json();
      if (json) prs[`${repo}`] = { value: json.total_count > 0 };
    } catch (e) {
      console.error(e);
    }
    await sleep();
  }
  return prs;
};

export const processData = (fetchedData, others) => {
  const getTotalPRs = (data) =>
    Object.values(data).filter((pr) => (pr as any).value).length;
  const myPRs = getTotalPRs(fetchedData);
  const maxPRs = Math.max(myPRs, ...others.map(getTotalPRs));
  const PRsBehind = maxPRs - myPRs;
  const sentiment =
    PRsBehind <= 1 ? "positive" : PRsBehind <= 3 ? "caution" : "negative";
  const total = { value: myPRs, favourite: true, sentiment };
  return { "Total PRs": total, ...fetchedData };
};
