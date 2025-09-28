import { chooseFromTable, toTable } from "./utils";

export const PlotlineTable = (plotlineRows) => ({
    plotlines: toTable(plotlineRows)
});

export const getRandomPlotline = (plotlineTable) => chooseFromTable(rollDie(100), plotlineTable.plotlines);
