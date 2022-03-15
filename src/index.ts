import { pair, pairProp } from './pairs';

// GAS do not support export
// https://github.com/mahaker/esbuild-tutorial/blob/main/src/index.ts
declare let global: any;
global.DEX_SCREENER_PAIR_PROP = pairProp;
global.DEX_SCREENER_PAIR = pair;
