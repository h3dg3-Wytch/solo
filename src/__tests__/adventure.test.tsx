const testData = require('../fixtures/action_table.transformed.json');

import { adventureTables } from "@/lib/adventureTables"; 
import { AdventureCrafter } from "@/lib/adventuerCrafter"; 
import { THEMES } from "@/lib/types";
import {toggleLowestPriorityTheme} from "@/lib/constants";

describe('Adventure Crafter', () => {


    // it('can load in data', () => {
        
    //     const map = adventureTables(testData);
        
    //     expect(map[1]).toEqual(testData[0]);
    // });
    
    it('can randomly generate themes', () => {
        
        const expected = AdventureCrafter([], [], testData);
        
        const actual = expected.generateRandomPriorityTable();
        
        
        expect(actual[10]).toEqual(actual.fourthPriority);
        expect(actual.isCurrentlyOnFourth).toEqual(true);
        
        expect(toggleLowestPriorityTheme(actual)[10]).toEqual(actual.fifthPriority)
    });
    
    it('can set themes', () => {
        
        const expected = AdventureCrafter([], [], testData);
        
        expected.setPriority([THEMES.ACTION, THEMES.MYSTERY,THEMES.PERSONAL,THEMES.SOCIAL,THEMES.TENSION]);
        
        expect(expected.getCurrentPriorities()[1]).toEqual(THEMES.ACTION);    
    });
})