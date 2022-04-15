import { integrations } from "..";

(async () => {
  const { RUN_INTEGRATIONS_EVERY_MINUTES: mins } = process.env;
  console.log(`Integrations: schedule (every ${mins || 60} mins)`);
  require("node-cron").schedule(`*/${mins || 60} * * * *`, integrations);
})();
