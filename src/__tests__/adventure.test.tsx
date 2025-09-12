const testData = require('../fixtures/action_table.transformed.json');

import { adventureTables } from "@/lib/adventureTables"; 

describe('Adventure Crafter', () => {


    it('can load in data', () => {
        
        const map = adventureTables(testData);
        
        expect(map[1]).toEqual(testData[0]);
    });
    
    // it('can be transduced', () => {
        
    //     const tables = r.compose(
            

    //     )

    // });
})