require("dotenv").config();

(async () => {
  console.log(process.env);
  console.log("cron");
  // - List cohorts by listing all of the channels cyfbot is in (except permissions channel)
  // - Create one spreadsheet per cohort
  // - Update on cron every 15 mins
  // - One tab per integration
})();
