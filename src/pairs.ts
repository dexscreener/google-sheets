import result from 'lodash/result';

import { fetchPair } from './lib/api';
import { Direction, FormattedResult, formatResult } from './lib/result';

export const pairProp = (chainId: string, pairAddress: string, prop: string): string | number | null => {
  Logger.log({ fn: 'pairProp', chainId, pairAddress, prop });

  const pair = fetchPair(chainId, pairAddress);
  if (!pair) throw new Error(`Pair ${pairAddress} Not Found on chain ${chainId}`);

  return result(pair, prop);
};

export const fullPair = (
  chainId: string,
  pairAddress: string,
  props = 'all',
  direction: Direction = 'horizontal',
  includePropName = true,
): FormattedResult => {
  Logger.log({ fn: 'fullPair', chainId, pairAddress, props, direction, includePropName });

  const pair = fetchPair(chainId, pairAddress);
  if (!pair) throw new Error(`Pair ${pairAddress} Not Found on chain ${chainId}`);

  return formatResult(pair, props, direction, includePropName);
};
