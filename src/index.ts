import { fullPair, pairProp } from './pairs';
import { refreshData } from './refresh';

const onOpen = (): void => {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  spreadsheet.addMenu('DEX Screener', [
    { name: 'Refresh', functionName: 'DEX_SCREENER_REFRESH' },
  ]);
};

// GAS do not support export
// https://github.com/mahaker/esbuild-tutorial/blob/main/src/index.ts
declare let global: any;
global.DEX_SCREENER_PAIR_PROP = pairProp;
global.DEX_SCREENER_PAIR = fullPair;
global.DEX_SCREENER_REFRESH = refreshData;
global.onOpen = onOpen;
