import { Direction, FormattedResult } from './lib/result';
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
global.DEX_SCREENER_REFRESH = refreshData;
global.onOpen = onOpen;

// You need to declare the JSDoc block here, not in the actual function
// to get the auto-completion. It is the nature of the beast.

/**
 * @preserve
 * A custom function o grab pair details from DEX Screener API
 *
 * @param {String} platformId (ethereum | bsc | polygon | etc)
 * @param {String} pairAddress
 * @param {String} prop (for example priceUsd)
 * @customfunction
 */
global.DEX_SCREENER_PAIR_PROP = (chainId: string, pairAddress: string, prop: string): string | number | null => pairProp(chainId, pairAddress, prop);

/**
 * @preserve
 * A custom function o grab pair details from DEX Screener API
 *
 * @param {String} platformId (ethereum | bsc | polygon | etc)
 * @param {String} pairAddress
 * @param {String} [props=all] (priceUsd,liquidity.usd default is '
 * @param {String} [direction=vertical] (horizontal or vertical)
 * @param {String} [includePropName=true] (true or false)
 */
global.DEX_SCREENER_PAIR = (
  chainId: string,
  pairAddress: string,
  props = 'all',
  direction: Direction = 'horizontal',
  includePropName = true,
): FormattedResult => fullPair(chainId, pairAddress, props, direction, includePropName);
