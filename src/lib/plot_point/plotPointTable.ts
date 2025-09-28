import {groupBy, prop, pipe, map, } from 'ramda';
import { adventureTables } from '../utils';

export const PlotPointTable = (plotPointRows) =>  pipe(
    groupBy(prop("category")),
    map(adventureTables)
  )(plotPointRows);
