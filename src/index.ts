require("dotenv").config();
import slack from "./clients/slack";
import listeners from "./listeners";
import sheets from "./sheets";
var cron = require("node-cron");

(async () => {
  await slack.start(Number(process.env.PORT) || 5000);
  listeners.forEach((listen) => listen(slack));
  console.log("⚡️ CYFBot is listening!");

  // Update the sheet every 15 mins

  cron.schedule("*/15 * * * *", () => {
    sheets();
  });
})();
