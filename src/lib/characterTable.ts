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

export const generateRandomDescriptor = (characterTable) => generateRandomEntry(rollDie(100), 21, characterTable.descriptors); 
export const generateRandomIdentity = (characterTable) => generateRandomEntry(rollDie(100), 33, characterTable.identity);
export const generateSpecialTrait = (characterTable) => chooseFromCharacterTable(rollDie(100), characterTable.specialTraits);
export const generateRandomEntry = (dieRoll, threshold, table) => {
    return (dieRoll <= threshold) 
        ? [chooseFromCharacterTable(dieRoll, table), chooseFromCharacterTable(randomNumberBetween(threshold + 1, 100), table), chooseFromCharacterTable(randomNumberBetween(threshold + 1, 100), table)]
        : [chooseFromCharacterTable(dieRoll, table)]
    
}
export const chooseFromCharacterTable = (die, table) => table[die];