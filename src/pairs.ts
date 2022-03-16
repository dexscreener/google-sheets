import result from 'lodash/result';

import { fetchPair } from './lib/api';
import { Direction, FormattedResult, formatResult } from './lib/result';

/**
 * A custom function o grab pair details from DEX Screener API
 *
 * @param {String} platformId (ethereum | bsc | polygon | fantom | harmony | avalanche | arbitrum | optimism | celo | cronos | moonriver | velas | zyx | elastos | polis | xdai | boba | kcc | aurora | oec | heco | zilliqa | elrond | smartbch | fuse | hsc | metis | oasisemerald | iotex | wanchain | kardiachain | moonbeam | telos | klaytn | meter | syscoin)
 * @param {String} pairAddress
 * @param {String} prop (for example priceUsd)
 * @customfunction
 */
export const pairProp = (chainId: string, pairAddress: string, prop: string): string | number | null => {
  Logger.log({ fn: 'pairProp', chainId, pairAddress, prop });

  const pair = fetchPair(chainId, pairAddress);
  if (!pair) throw new Error(`Pair ${chainId} Not Found on chain ${chainId}`);

  return result(pair, prop);
};

export const fullPair = (
  chainId: string,
  pairAddress: string,
  props = 'all',
  direction: Direction = 'horizontal',
  includePropName = true,
): FormattedResult => {
  Logger.log({ method: 'pair', chainId, pairAddress, props, direction, includePropName });

  const pair = fetchPair(chainId, pairAddress);
  if (!pair) throw new Error(`Pair ${chainId} Not Found on chain ${chainId}`);

  return formatResult(pair, props, direction, includePropName);
};
