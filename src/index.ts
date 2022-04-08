require("dotenv").config();
import slack from "./clients/slack";
import listeners from "./listeners";
import {
  TimerBasedCronScheduler as scheduler,
  parseCronExpression,
} from "cron-schedule";
import sheets from "./sheets";

(async () => {
  await slack.start(Number(process.env.PORT) || 5000);
  listeners.forEach((listen) => listen(slack));
  console.log("⚡️ CYFBot is listening!");

  // Update the sheet every 15 mins
  const cron = parseCronExpression("*/15 * * * *");
  scheduler.setInterval(cron, sheets);
})();
