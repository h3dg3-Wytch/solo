import { hash } from 'crypto';
import R from 'ramda';

export function adventureTables(plotPoints: any) {
    return R.pipe(
       R.chain(plotPoint => plotPoint.dice_rolls.map(num => [num, plotPoint])),
       R.fromPairs 
    )(plotPoints)
}