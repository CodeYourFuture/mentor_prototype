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

  // overview
  const overview = doc.sheetsByIndex[0];
  let overviewHeaderValues = [];
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
  await overview.updateProperties({ title: "Overview" });
  await overview.setHeaderRow(overviewHeaderValues.filter(onlyUnique));
  for (const trainee of data) {
    const row = overviewHeaderValues.reduce((acc: any, key: string) => {
      acc[key] = trainee[key]?.value || "";
      return acc;
    }, {});
    // const row = Object.values(trainee).map(({ value }: any) => value);
    await overview.addRow(row);
  }

  // integrations
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
        acc[key] = trainee[key]?.value || "";
        return acc;
      }, {});
      // const row = Object.values(trainee).map(({ value }: any) => value);
      await newSheet.addRow(row);
    }
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
