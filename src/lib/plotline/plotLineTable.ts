import { chooseFromTable, toSimpleTable } from "../utils";

export const PlotlineTable = (plotlineRows) => toSimpleTable(plotlineRows)


export const getRandomPlotline = (plotlineTable) => chooseFromTable(rollDie(100), plotlineTable.plotlines);
