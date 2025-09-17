import { setPriority } from "os";
import { adventureTables } from "./adventureTables";
import {groupBy, prop, fromPairs, map, } from 'ramda';
import { THEMES } from './types';
import { priorityTable } from  './constants';

import { rollDie, shuffle } from './utils'

export function AdventureCrafter(characters, plotlines, plotPoints) {
    
    const grouped = groupBy(prop('category'), plotPoints);

    const result = map(adventureTables, grouped);
    

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
        generateRandomPlotPoint: () => {},
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