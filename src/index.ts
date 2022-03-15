import result from 'lodash/result';

import { fetchPair } from './api';

const DEX_SCREENER_PAIR_PROP = (chainId: string, pairAddress: string, prop: string): string | null => {
  Logger.log({ fn: 'DEX_SCREENER_PAIR_PROP', chainId, pairAddress, prop });
  const pair = fetchPair(chainId, pairAddress);
  Logger.log({ pair });

  if (!pair) throw new Error(`Pair ${chainId} Not Found on chain ${chainId}`);

  return result(pair, prop);
};

// GAS do not support export
// https://github.com/mahaker/esbuild-tutorial/blob/main/src/index.ts
declare let global: any;
global.DEX_SCREENER_PAIR_PROP = DEX_SCREENER_PAIR_PROP;
