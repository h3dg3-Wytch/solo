
import { CharacterInformationTable, generateRandomCharacter, generateSpecialTrait} from "@/lib/character/characterTable";
import * as utils from "@/lib/utils";
import * as R from "ramda";



const characterDescriptors = require('../fixtures/character_descriptor_rows.json');
const characterIdentiy = require('../fixtures/character_identity_rows.json');
const characterSpecialTraits = require('../fixtures/character_special_trait_rows.json');

jest.mock('../lib/utils', () => ({
  ...jest.requireActual('../lib/utils'), // keep other exports intact
  rollDie: jest.fn(),                  // mock rollDie
  randomNumberBetween:jest.fn()
}));

describe('Character Table', () => {

    it('can randomly generate characters', () => {
        (utils.rollDie as jest.Mock).mockReturnValue(1); 
        (utils.randomNumberBetween as jest.Mock).mockReturnValue(100); 
        
        const actual = CharacterInformationTable(characterSpecialTraits, characterIdentiy, characterDescriptors);
        
        const expected = actual.specialTraits[1];
        
        expect(generateSpecialTrait(actual)).toEqual(expected);
        
        expect(generateRandomCharacter(actual).trait.roll).toEqual(1);
        expect(generateRandomCharacter(actual).identity[0].roll).toEqual(1);
        expect(generateRandomCharacter(actual).descriptor[0].roll).toEqual(1);
    });
    
})