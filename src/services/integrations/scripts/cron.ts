import { integrations } from "..";

(async () => {
  const { RUN_INTEGRATIONS_EVERY_MINUTES: mins } = process.env;
  console.log(`Export-to-sheets: schedule (every ${mins || 60} mins)`);
  require("node-cron").schedule(`*/${mins || 60} * * * *`, integrations);
})();
