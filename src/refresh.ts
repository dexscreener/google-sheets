// https://stackoverflow.com/questions/23177356/how-to-force-new-google-spreadsheets-to-refresh-and-recalculate

const formulaMatcher = 'DEX_SCREENER';

const refreshSheet = (sheet: GoogleAppsScript.Spreadsheet.Sheet): void => {
  Logger.log({ sheet, lastRow: sheet.getLastRow() });

  const range = sheet.getDataRange();
  const rows = range.getNumRows();
  const columns = range.getNumColumns();

  for (let row = 1; row <= rows; row += 1) {
    for (let column = 1; column <= columns; column += 1) {
      const originalFormula = range.getCell(row, column).getFormula();

      if (!originalFormula || !originalFormula.includes(formulaMatcher)) continue;

      const cell = range.getCell(row, column);
      cell.setValue('#BUSY');
      SpreadsheetApp.flush();
      cell.setFormula(originalFormula);
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
