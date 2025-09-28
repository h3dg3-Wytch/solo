import * as R from "ramda";

export function generateAdventureResult() {
    
}

export function rollDie(sides) {
  if (sides < 1 || !Number.isInteger(sides)) {
    throw new Error("Number of sides must be a positive integer.");
  }

  return randomNumberBetween(sides, 1);
}

export function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function toTable(table) {
 return R.indexBy(R.prop('roll'), table);
}

export const chooseFromTable = (die, table) => table[die];

export const adventureTables = R.pipe(
  R.chain(plotPoint => plotPoint.dice_rolls.map(num => [num, plotPoint])),
  R.fromPairs
);
