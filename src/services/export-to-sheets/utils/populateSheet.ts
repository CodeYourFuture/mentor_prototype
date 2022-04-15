require("dotenv").config();
import { GoogleSpreadsheet } from "google-spreadsheet";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// Get all channels
export default async ({ doc, data }: { doc: GoogleSpreadsheet; data: any }) => {
  // auth
  await doc.useServiceAccountAuth({
    client_email: process.env.SHEETS_CLIENT_EMAIL,
    private_key: process.env.SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
  await doc.loadInfo();

  // sleep function
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // overview
  const overview = doc.sheetsByIndex[0];
  let throttle = 500;
  let index = 0;
  let overviewHeaderValues = [];
  for (const trainee of data) {
    await sleep(throttle * index++);
    const additionalValues = Object.entries(trainee)
      .filter(([key, value]: any) => !value?.integration || value.favourite)
      .map(([key]) => key);
    overviewHeaderValues = [...overviewHeaderValues, ...additionalValues];
  }
  await overview.resize({
    rowCount: data.length + 1,
    columnCount: overviewHeaderValues.length,
  });
  await overview.updateProperties({ title: "Overview" });
  await overview.setHeaderRow(overviewHeaderValues.filter(onlyUnique));
  for (const trainee of data) {
    const row = overviewHeaderValues.reduce((acc: any, key: string) => {
      acc[key] = JSON.stringify(trainee[key]) || "";
      return acc;
    }, {});
    // const row = Object.values(trainee).map(({ value }: any) => value);
    await overview.addRow(row);
  }

  await overview.loadCells();

  const colours = {
    positive: {
      red: 185 / 255,
      green: 222 / 255,
      blue: 204 / 255,
      alpha: 1,
    },
    caution: {
      red: 253 / 255,
      green: 234 / 255,
      blue: 178 / 255,
      alpha: 1,
    },
    negative: {
      red: 241 / 255,
      green: 199 / 255,
      blue: 200 / 255,
      alpha: 1,
    },
    neutral: {
      red: 255 / 255,
      green: 255 / 255,
      blue: 255 / 255,
      alpha: 1,
    },
  };

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
  index = 0;
  const integrations = data
    .map((trainee) => {
      return Object.values(trainee).map(({ integration }: any) => integration);
    })
    .flat()
    .filter(Boolean)
    .filter(onlyUnique);
  for (const integration of integrations) {
    await sleep(throttle * index++);
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
      // const row = Object.values(trainee).map(({ value }: any) => value);
      await newSheet.addRow(row);
    }

    // loop through every cell and convert sentiment to bgcol
  }
  // } else {
  //   await drive.files.update({
  //     fileId: file.id,
  //     requestBody,
  //     media,
  //     fields,
  //   });
  //   await drive.permissions.update({
  //     requestBody: permissionBody,
  //     fileId: file.id,
  //     fields: "id",
  //   });
  //   console.log(
  //     `👆 ${file.webViewLink.replace("/edit", "/template/preview")}`
  //   );
  // }
};
