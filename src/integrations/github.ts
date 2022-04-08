// define funciton type that returns an array
export type IntegrationType = (
  integrationID: string
) => Promise<{ column: string; value: number | string }>[];

const repos = [
  "GitHomeworkFixErrors",
  "bikes-for-refugees",
  "HTML-CSS-Coursework-Week2",
  "HTML-CSS-Coursework-Week3",
  "JavaScript-Core-1-Coursework-Week1",
  "JavaScript-Core-1-Coursework-Week2",
  "JavaScript-Core-1-Coursework-Week3-London8",
  "JavaScript-Core-1-Coursework-Week4-London8",
  "JavaScript-Core-2-Coursework-Week1-London8",
  "JavaScript-Core-2-Coursework-Week2-London8",
  "JavaScript-Core-2-Coursework-Week3-London8",
  "JavaScript-Core-2-Coursework-Week4-London8",
  "JavaScript-Core-3-Coursework-Week1-London8",
  "JavaScript-Core-3-Coursework-Week2",
  "JavaScript-Core-3-Coursework-Week3",
  "JavaScript-Core-3-Coursework-Week4-London8",
  "cyf-hotel-react",
  "node-challenge-quote-server",
  "node-challenge-chat-server",
  "node-challenge-hotel-server",
  "SQL-Coursework-Week1",
  "SQL-Coursework-Week2",
  "SQL-Coursework-Week3",
];

const Integration = async (githubID) => {
  // const GITHUBIDS = SpreadsheetApp.getActive().getSheetByName('Trainee Info').getRange('E:E').getValues();
  // const PRTAB = SpreadsheetApp.getActive().getSheetByName('Pull Reqs');
  // const REPOSITORIES = SpreadsheetApp.getActive().getSheetByName('Pull Reqs').getDataRange().getValues()[1]
  // const canGitHubFetch = (sheet, headings, repo) => getRangeByHeading(sheet, headings, repo).getValues().some(cell => cell[0] === 'Pull');
  // // THIS RUNS ONCE A DAY SEE TIME TRIGGERS
  // // IF IT'S NOT WORKING TRY CHANGING THE TOGGLE TO PULL ON THE BOTTOM ROW
  // function batchPRs() {
  //   REPOSITORIES.forEach((repo, rowIndex) => rowIndex > 0 ? columnPull(PRTAB, repo, rowIndex, GITHUBIDS) : repo);
  // }
  // function columnPull(sheet, repo, colIndex, authors) {
  //   let range = getColumnLetterByIndex(sheet, colIndex +1) ;
  //   let columnForWeek = sheet.getRange(`${range}:${range}`);
  //   if(canGitHubFetch(sheet, REPOSITORIES, repo)) {
  //    let pullPerTrainee = authors.map((author, rowIndex) => [getPull(repo, author[0])] );
  //     // get util rows from column and add to remapped array
  //     pullPerTrainee[0] = [repo];
  //     pullPerTrainee = [columnForWeek.getValues()[0], ...pullPerTrainee, columnForWeek.getValues().pop()]
  //     // we do this per column for speed and also to prevent rate limiting by GH
  //     columnForWeek.setValues(pullPerTrainee)
  //   }
  // }
  // /**
  //  * Check for PR against week repo and dev id
  //  * @param {string} Github ID .
  //  * @return {string} API call to Github returning total_count of PR
  //  * @customfunction
  //  */
  // function getPull(repo,author) {
  //    // horrible rate limiting sorry
  //    Utilities.sleep(7400)
  //     const endpoint = `https://api.github.com/search/issues?q=is:pr+repo:CodeYourFuture/${repo}/+author:${author}`;
  //   try {
  //     const response = UrlFetchApp.fetch(endpoint);
  //     const pullreq = JSON.parse(response.getContentText());
  //     return pullreq.total_count > 0 ? 1 : 0; // prs are rounded to 1 per repo (so 2 one week doesn't count as 2 weeks by mistake but if you want to see the number, round it somewhere else!)
  //   }
  //   catch(e) {
  //     return 0;
  //   }
  // }

  return [
    { column: "test", value: 1 },
    { column: "test2", value: 2 },
  ];
};

export default Integration as unknown as IntegrationType;
