import { z } from 'zod';

import { Pair, pairSchema } from '../types';

import { fetchFromCache, storeResponseOnCache, markAsFetching as willFetch } from './cache';

const lock = LockService.getDocumentLock();
const lockTimeoutInMs = 5000; // 5 seconds

const baseAPIUrl = 'https://api.dexscreener.io/latest';

export const allPairProps = [
  'chainId',
  'dexId',
  'url',
  'pairAddress',
  'baseToken.address',
  'baseToken.name',
  'baseToken.symbol',
  'quoteToken.symbol',
  'priceNative',
  'priceUsd',
  'txns.m5.buys',
  'txns.m5.sells',
  'txns.h1.buys',
  'txns.h1.sells',
  'txns.h6.buys',
  'txns.h6.sells',
  'txns.h24.buys',
  'txns.h24.sells',
  'volume.m5',
  'volume.h1',
  'volume.h6',
  'volume.h24',
  'priceChange.m5',
  'priceChange.h1',
  'priceChange.h6',
  'priceChange.h24',
  'liquidity.usd',
  'liquidity.base',
  'liquidity.quote',
  'fdv',
  'pairCreatedAt',
];

const fetchFromAPI = (endpoint: string): string => {
  willFetch(endpoint);

  const url = `${baseAPIUrl}${endpoint}`;
  const response = UrlFetchApp.fetch(url).getContentText();

  storeResponseOnCache(endpoint, response);

  return response;
};

const fetch = (endpoint: string): string => {
  const cachedResponse = fetchFromCache(endpoint);
  if (cachedResponse) return JSON.parse(cachedResponse);

  const locked = lock.tryLock(lockTimeoutInMs);
  if (!locked) Logger.log({ err: `Could not obtain lock after ${lockTimeoutInMs}ms.` });

  try {
    const response = fetchFromCache(endpoint) || fetchFromAPI(endpoint);
    return JSON.parse(response);
  } finally {
    lock.releaseLock();
  }
};

// GET /dex/pairs/:chainId/:pairAddress
export const fetchPair = (chainId: string, pairAddress: string): Pair | null => {
  const endpoint = `/dex/pairs/${chainId}/${pairAddress}`;
  const response = fetch(endpoint);

  const pairsResponseSchema = z.object({ pair: pairSchema });
  const parsedJson = pairsResponseSchema.safeParse(response);
  if (!parsedJson.success) return null;

  return parsedJson.data.pair;
};

// GET /dex/tokens/:tokenAddress
export const fetchToken = (tokenAddress: string): Pair[] | null => {
  const endpoint = `/dex/tokens/${tokenAddress}`;
  const response = fetch(endpoint);

  const tokensResponseSchema = z.object({ pairs: z.array(pairSchema) });
  const parsedJson = tokensResponseSchema.safeParse(response);
  if (!parsedJson.success) return null;

  return parsedJson.data.pairs;
};

// GET /dex/search/?q={:query}
export const fetchSearch = (query: string): Pair[] | null => {
  const encodedQuery = encodeURIComponent(query);
  const endpoint = `/dex/search/?q=${encodedQuery}`;
  const response = fetch(endpoint);

  const searchResponseSchema = z.object({ pairs: z.array(pairSchema) });
  const parsedJson = searchResponseSchema.safeParse(response);
  if (!parsedJson.success) return null;

  return parsedJson.data.pairs;
};
