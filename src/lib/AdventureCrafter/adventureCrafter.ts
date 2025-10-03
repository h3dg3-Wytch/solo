
// get all the tables
// add ways to update them 
// create extension methods 

import { getAdventureByUserId } from "../adventure/adventureService";
import { getCharacters } from "../character/characterService";
import { getCharacterDescriptors } from "../character_descriptor/characterDescriptorService";
import { getPlotlines } from "../plotline/plotlineService";
import { PlotlineTable } from "../plotline/plotLineTable";
import { getThemes } from "../themes/themeService";

// CharacterTable
export default async function AdventureCrafter(userId: string) {
    
    const characters = (await getCharacters(userId));
    const plotlines = PlotlineTable(await getPlotlines(userId));
    const themes = await getThemes(userId);
    const adventure = await getAdventureByUserId(userId); 
    
    const characterDescriptor = await getCharacterDescriptors();
   
    console.log('adventure', adventure);
    console.log('desc', characterDescriptor);
    
    return {
        characters,
        toTablegetPlotLines: () => plotlines,
        themes
    }


    
}

/* import { setPriority } from "os";
import { adventureTables } from "../adventureTables";
import {groupBy, prop, fromPairs, map, } from 'ramda';
import { THEMES } from '../types';
import { themeTable } from  '../constants';

import { rollDie, shuffle } from '../utils'
export const Adventure = ({
    name,
    date,
    notes,
    
}) => ({

});
export function AdventureCrafter(characters, plotlines, plotPoints) {
    
    const grouped = groupBy(prop('category'), plotPoints);

    const plotPointsTable = map(adventureTables, grouped);
    
    // set turning point 
    let turningPoints = [];
    let priorities = [];
    let currentPriorityTable = null;
    
    return {
        
        setPriority: (prioritiesArray) => { 
            priorities = prioritiesArray;
            currentPriorityTable = themeTable(...priorities);
        },
        generateRandomPriorityTable: () => {




            priorities = randomThemeSelection();
            currentPriorityTable = themeTable(...priorities)
            return currentPriorityTable;
        }, 
        generateRandomPlotPoint: (dieRoll:number) => {
            const currentlySelectedTheme = (dieRoll !== 10 ) ? currentPriorityTable[rollDie(10)]: currentPriorityTable.getLowestPriority();
            return plotPointsTable[currentlySelectedTheme.toLowerCase()][rollDie(100)];
        },
        getCurrentPriorities: () => currentPriorityTable,
        randomThemeSelection
    }

}

const randomThemeSelection = () => shuffle(Object.values(THEMES)); */