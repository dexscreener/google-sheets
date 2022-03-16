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

/**
 * A custom function o grab pair details from DEX Screener API
 *
 * @param {String} platformId (ethereum | bsc | polygon | fantom | harmony | avalanche | arbitrum | optimism | celo | cronos | moonriver | velas | zyx | elastos | polis | xdai | boba | kcc | aurora | oec | heco | zilliqa | elrond | smartbch | fuse | hsc | metis | oasisemerald | iotex | wanchain | kardiachain | moonbeam | telos | klaytn | meter | syscoin)
 * @param {String} pairAddress
 * @param {String} prop (for example priceUsd)
 * @customfunction
 */
// @__PURE__ this comment technically belongs to the previous line
function BATATA() { console.log('aaaaaaaa'); }

global.DEX_SCREENER_PAIR_PROP = pairProp;
global.DEX_SCREENER_PAIR = fullPair;
global.DEX_SCREENER_REFRESH = refreshData;
global.onOpen = onOpen;
global.BATATA = BATATA;
