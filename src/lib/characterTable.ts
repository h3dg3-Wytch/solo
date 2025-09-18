import { Character } from "./types";
import * as R from "ramda";
import { randomNumberBetween, rollDie, toTable } from "./utils"; 



export const CharacterTable = (
    characterSpecialTraits,
    characterDescriptors,
    characterIdentity
) => ({
    specialTraits: toTable(characterSpecialTraits),
    descriptors: toTable(characterDescriptors),
    identity: toTable(characterIdentity) 
});

export const generateRandomCharacter = (characterTable) => ({
    trait: generateSpecialTrait(characterTable),
    descriptor: generateRandomDescriptor(characterTable),
    identity: generateRandomIdentity(characterTable)
    
})

// to do clean this up and refactor
/* const generateRandomEntry = (table: any[], threshold: number) => {
  const dieRoll = rollDie(100);

  const first = chooseFromCharacterTable(dieRoll, table);

  if (dieRoll <= threshold) {
    const second = chooseFromCharacterTable(randomNumberBetween(threshold + 1, 100), table);
    return [first, second];
  }

  return [first];
};
 */
export const generateRandomDescriptor = (characterTable) => {
    const dieRoll = rollDie(100);
    return (dieRoll <= 21) 
        ? [chooseFromCharacterTable(dieRoll, characterTable.descriptors), chooseFromCharacterTable(randomNumberBetween(34, 100), characterTable.descriptors)]
        : [chooseFromCharacterTable(dieRoll, characterTable.descriptors)]

}
export const generateRandomIdentity = (characterTable) => { 
    const dieRoll = rollDie(100);
    return (dieRoll <= 33) 
        ? [chooseFromCharacterTable(dieRoll, characterTable.identity), chooseFromCharacterTable(randomNumberBetween(34, 100), characterTable.identity)]
        : [chooseFromCharacterTable(dieRoll, characterTable.identity)]
    
};
export const generateSpecialTrait = (characterTable) => chooseFromCharacterTable(rollDie(100), characterTable.specialTraits);
export const chooseFromCharacterTable = (die, table) => table[die];