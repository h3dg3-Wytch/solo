export function generateAdventureResult() {
    
}

export function rollDie(sides) {
  if (sides < 1 || !Number.isInteger(sides)) {
    throw new Error("Number of sides must be a positive integer.");
  }

  return Math.floor(Math.random() * sides) + 1;
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
