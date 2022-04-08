require("dotenv").config();
import slack from "./clients/slack";
import listeners from "./listeners";
import {
  TimerBasedCronScheduler as scheduler,
  parseCronExpression,
} from "cron-schedule";
import sheets from "./sheets";

(async () => {
  sheets();
})();
