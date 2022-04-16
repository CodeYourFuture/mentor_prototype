require("dotenv").config();
import { GoogleSpreadsheet } from "google-spreadsheet";
import { sleep } from "../../../utils/methods";
import { colours } from "../../../utils/styles";
const THROTTLE = 1000; // sheets

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// Get all channels
export default async ({ doc, data }: { doc: GoogleSpreadsheet; data: any }) => {
  await doc.useServiceAccountAuth({
    client_email: process.env.SHEETS_CLIENT_EMAIL,
    private_key: process.env.SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
  await doc.loadInfo();

  // overview
  console.log("Format rows");
  const overview = doc.sheetsByIndex[0];
  let overviewHeaderValues = [];
  if (!data?.length) throw new Error("No data to export");
  for (const trainee of data) {
    const additionalValues = Object.entries(trainee)
      .filter(([key, value]: any) => !value?.integration || value.favourite)
      .map(([key]) => key);
    overviewHeaderValues = [...overviewHeaderValues, ...additionalValues];
  }
  await overview.resize({
    rowCount: data.length + 1,
    columnCount: overviewHeaderValues.length,
  });
  await overview.updateProperties({
    title: `Overview (updated ${new Date().toISOString()})`,
  });
  await overview.setHeaderRow(overviewHeaderValues.filter(onlyUnique));
  for (const trainee of data) {
    const row = overviewHeaderValues.reduce((acc: any, key: string) => {
      acc[key] = JSON.stringify(trainee[key]) || "";
      return acc;
    }, {});
    await overview.addRow(row);
    await sleep(THROTTLE);
  }

  // apply styling
  console.log("Apply styling");
  await overview.loadCells();
  data.forEach((_, y) => {
    overviewHeaderValues.forEach((_, x) => {
      try {
        const cell = overview.getCell(y + 1, x);
        const data = JSON.parse((cell?.value as any) || {});
        cell.value = data.value || "";
        if (data.value && data.sentiment)
          cell.backgroundColor = colours[data?.sentiment || "neutral"];
      } catch (error) {}
    });
  });
  await overview.saveUpdatedCells();

  // integrations
  console.log("Parse integrations");
  const integrations = data
    .map((trainee) => {
      return Object.values(trainee).map(({ integration }: any) => integration);
    })
    .flat()
    .filter(Boolean)
    .filter(onlyUnique);
  for (const integration of integrations) {
    let integrationHeaderValues = [];
    for (const trainee of data) {
      const additionalValues = Object.entries(trainee)
        .filter(
          ([key, value]: any) =>
            value?.integration === integration || key === "Trainee"
        )
        .map(([key]) => key);
      integrationHeaderValues = [
        ...integrationHeaderValues,
        ...additionalValues,
      ];
    }
    const newSheet = await doc.addSheet({ title: integration });
    await newSheet.resize({
      rowCount: data.length + 1,
      columnCount: integrationHeaderValues.length,
    });
    await newSheet.setHeaderRow(integrationHeaderValues.filter(onlyUnique));
    for (const trainee of data) {
      const row = integrationHeaderValues.reduce((acc: any, key: string) => {
        acc[key] = JSON.stringify(trainee[key]?.value) || "";
        return acc;
      }, {});
      await newSheet.addRow(row);
      await sleep(THROTTLE);
    }
  }
};
