import { integrations } from ".";

var cron = require("node-cron");

(async () => {
  console.log("integrations cron");
  cron.schedule("*/30 * * * *", () => {
    integrations();
  });
})();
