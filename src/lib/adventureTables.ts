import { hash } from 'crypto';
import * as R from 'ramda';

export const adventureTables = R.pipe(
  R.chain(plotPoint => plotPoint.dice_rolls.map(num => [num, plotPoint])),
  R.fromPairs
);
