import { Character } from "../types";
import * as R from "ramda";
import { chooseFromTable, randomNumberBetween, rollDie, toTable } from "../utils"; 

const IDENTITY_TWO_DESCRIPTORS_THRESHOLD = 33;
const DESCRIPTORS_TWO_DESCRIPTORS_THRESHOLD = 21;

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

export const generateRandomDescriptor = (characterTable) => generateRandomEntry(rollDie(100), DESCRIPTORS_TWO_DESCRIPTORS_THRESHOLD, characterTable.descriptors); 
export const generateRandomIdentity = (characterTable) => generateRandomEntry(rollDie(100), IDENTITY_TWO_DESCRIPTORS_THRESHOLD, characterTable.identity);
export const generateSpecialTrait = (characterTable) => chooseFromTable(rollDie(100), characterTable.specialTraits);
export const generateRandomEntry = (dieRoll, threshold, table) => {
    return (dieRoll <= threshold) 
        ? [chooseFromTable(dieRoll, table), chooseFromTable(randomNumberBetween(threshold + 1, 100), table), chooseFromTable(randomNumberBetween(threshold + 1, 100), table)]
        : [chooseFromTable(dieRoll, table)]
    
}