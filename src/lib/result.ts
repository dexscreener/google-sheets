import result from 'lodash/result';

import { Pair } from '../types';

import { allPairProps } from './api';

export type Direction = 'horizontal' | 'vertical';
type Cell = string | number | null;
type Row = Cell[];
export type FormattedResult = Row | Row[];

const horizontalResult = (pair: Pair, props: string[], includePropName: boolean): FormattedResult => {
  const values: Cell[] = props.map((propName) => result(pair, propName));
  if (!includePropName) return [values];

  return [props, values];
};

const verticalResult = (pair: Pair, props: string[], includePropName: boolean): FormattedResult => {
  if (includePropName) {
    const rows: Row[] = props.map((propName) => [propName, result(pair, propName)]);
    return rows;
  }

  const rows: Row[] = props.map((propName) => [result(pair, propName)]);
  return rows;
};

export const formatResult = (pair: Pair, props: string, direction: Direction, includePropName: boolean): FormattedResult => {
  const pairProps = props === 'all' ? allPairProps : props.split(',');

  if (direction === 'horizontal') return horizontalResult(pair, pairProps, includePropName);

  return verticalResult(pair, pairProps, includePropName);
};
