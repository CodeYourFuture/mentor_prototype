import sheets from "..";
(async () => {
  const { RUN_EXPORT_TO_SHEETS_EVERY_MINUTES: mins } = process.env;
  console.log(`Export-to-sheets: schedule (every ${mins} mins)`);
  require("node-cron").schedule(`*/${mins} * * * *`, sheets);
})();
