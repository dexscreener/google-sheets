import { z } from 'zod';

export const pairSchema = z.object({
  chainId: z.string(),
  dexId: z.string(),
  url: z.string(),
  pairAddress: z.string(),
  baseToken: z.object({
    address: z.string(),
    name: z.string(),
    symbol: z.string(),
  }),
  quoteToken: z.object({
    symbol: z.string(),
  }),
  priceNative: z.string(),
  priceUsd: z.string().optional(),
  txns: z.object({
    m5: z.object({
      buys: z.number(),
      sells: z.number(),
    }),
    h1: z.object({
      buys: z.number(),
      sells: z.number(),
    }),
    h6: z.object({
      buys: z.number(),
      sells: z.number(),
    }),
    h24: z.object({
      buys: z.number(),
      sells: z.number(),
    }),
  }),
  volume: z.object({
    m5: z.number(),
    h1: z.number(),
    h6: z.number(),
    h24: z.number(),
  }),
  priceChange: z.object({
    m5: z.number(),
    h1: z.number(),
    h6: z.number(),
    h24: z.number(),
  }),
  liquidity: z.object({
    usd: z.number().optional(),
    base: z.number(),
    quote: z.number(),
  }).optional(),
  fdv: z.number().optional(),
  pairCreatedAt: z.number().optional(),
});

export type Pair = z.infer<typeof pairSchema>;
