import { integrations } from ".";

var cron = require("node-cron");

(async () => {
  console.log("fetch integrations");
  await integrations();
  cron.schedule("*/30 * * * *", () => {
    integrations();
  });
})();
