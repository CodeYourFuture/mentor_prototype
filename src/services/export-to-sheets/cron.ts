import { sheets } from ".";
var cron = require("node-cron");

(async () => {
  // await slack.start(Number(process.env.PORT) || 5000);
  // listeners.forEach((listen) => listen(slack));
  // console.log("⚡️ CYFBot is listening!");

  // Update the sheet every 15 mins
  console.log("schedule cron");
  await sheets();
  cron.schedule("*/30 * * * *", () => {
    sheets();
  });
})();
