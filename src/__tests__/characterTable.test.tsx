
import { adventureTables } from "@/lib/adventureTables";
import { CharacterTable, generateSpecialTrait} from "@/lib/characterTable";
import * as utils from "@/lib/utils";
import * as R from "ramda";



const characterDescriptors = require('../fixtures/character_descriptor_rows.json');
const characterIdentiy = require('../fixtures/character_identity_rows.json');
const characterSpecialTraits = require('../fixtures/character_special_trait_rows.json');

jest.mock('../lib/utils', () => ({
  ...jest.requireActual('../lib/utils'), // keep other exports intact
  rollDie: jest.fn(),                  // mock rollDie
}));



describe('Character Table', () => {

    it('can randomly generate characters', () => {

        (utils.rollDie as jest.Mock).mockReturnValue(1); 
        
        const actual = CharacterTable(characterSpecialTraits, characterIdentiy, characterDescriptors);
        
        const expected = actual.specialTraits[1];

        expect(generateSpecialTrait(actual)).toEqual(expected);
        
         

        
    });
    
})