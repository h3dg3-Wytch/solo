import { Character } from "./types";
import * as R from "ramda";
import { rollDie, toTable } from "./utils"; 



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

    
    
})

export const generateRandomDescriptor = () => ({});
export const generateRandomIdentity = () => ({});
export const generateSpecialTrait = (characterTable) => chooseFromCharacterTable(rollDie(100), characterTable.specialTraits);
export const chooseFromCharacterTable = (die, table) => table[die];  