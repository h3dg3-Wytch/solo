/* import { setPriority } from "os";
import { adventureTables } from "../adventureTables";
import {groupBy, prop, fromPairs, map, } from 'ramda';
import { THEMES } from '../types';
import { themeTable } from  '../constants';

import { rollDie, shuffle } from '../utils'

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