// https://stackoverflow.com/questions/23177356/how-to-force-new-google-spreadsheets-to-refresh-and-recalculate

const formulaMatcher = 'DEX_SCREENER_REFRESH_INTERVAL';

const refreshCell = (cell: GoogleAppsScript.Spreadsheet.Range): void => {
  const originalFormula = cell.getFormula();

  if (!originalFormula || !originalFormula.includes(formulaMatcher)) return;

  cell.setValue(cell.getValue());
  SpreadsheetApp.flush();
  cell.setFormula(originalFormula);
};

const refreshSheet = (sheet: GoogleAppsScript.Spreadsheet.Sheet): void => {
  const range = sheet.getDataRange();
  const rows = range.getNumRows();
  const columns = range.getNumColumns();

  for (let row = 1; row <= rows; row += 1) {
    for (let column = 1; column <= columns; column += 1) {
      const cell = range.getCell(row, column);
      refreshCell(cell);
    }
  }
};

export const refreshData = (): void => {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = spreadsheet.getSheets();
  sheets.forEach((sheet) => {
    spreadsheet.toast('Refreshing DEX Screener data...');
    refreshSheet(sheet);
    spreadsheet.toast('DEX Screener data refresed!');
  });
};

export const refreshInterval = (seconds: number): Date => {
  const refreshAt = new Date();
  refreshAt.setSeconds(refreshAt.getSeconds() + seconds);
  return refreshAt;
};
