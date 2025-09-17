import { setPriority } from "os";
import { adventureTables } from "./adventureTables";
import {groupBy, prop, fromPairs, map, } from 'ramda';
import { THEMES } from './types';
import { priorityTable } from  './constants';

import { rollDie, shuffle } from './utils'

export function AdventureCrafter(characters, plotlines, plotPoints) {
    
    const grouped = groupBy(prop('category'), plotPoints);

    const plotPointsTable = map(adventureTables, grouped);
    

    let priorities = [];
    let currentPriorityTable = null;
    
    return {
        
        setPriority: (prioritiesArray) => { 
            priorities = prioritiesArray;
            currentPriorityTable = priorityTable(...priorities);
        },
        generateRandomPriorityTable: () => {
            priorities = randomThemeSelection();
            currentPriorityTable = priorityTable(...priorities)
            return currentPriorityTable;
        }, 
        generateRandomPlotPoint: () => {
            
            const dieRoll = rollDie(10);
            const currentlySelectedTheme = (dieRoll !== 10 ) ? currentPriorityTable[rollDie(10)]: currentPriorityTable.getLowestPriority();
            return plotPointsTable[currentlySelectedTheme.toLowerCase()][rollDie(100)];
        },
        addToTurningPoint: () => {},
        getCurrentPriorities: () => currentPriorityTable,
        randomThemeSelection
    }

}

const randomThemeSelection = () => shuffle(Object.values(THEMES));


export function acc() {
    return {
        action: {},
        meta: {},
        tension: {},
        personal: {},
        mystery: {},
        social: {}
    }
}