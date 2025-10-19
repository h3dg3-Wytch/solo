import {groupBy, prop, pipe, map, defaultTo, } from 'ramda';
import { adventureTables } from '../utils';

export const PlotPointTable = (plotPointRows) =>  pipe(
    defaultTo([]),
    groupBy(prop("category")),
    map(adventureTables)
  )(plotPointRows);
