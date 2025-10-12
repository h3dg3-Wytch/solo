
// get all the tables
// add ways to update them 
// create extension methods 

import groupBy from "ramda/es/groupBy";
import { getAdventureByUserId } from "../adventure/adventureService";
import { getAdventureEntriesByUserId } from "../adventure_entry/adventureEntryServices";
import { getCharacters } from "../character/characterService";
import { CharacterInformationTable } from "../character/characterTable";
import { getCharacterDescriptors } from "../character_descriptor/characterDescriptorService";
import { getCharacterIdentities } from "../character_identity/characterIdentityService";
import { getCharacterSpecialTraits } from "../character_special_trait/characterSpecialTraits";
import { getPlotPoints } from "../plot_point/plotPointServices";
import { PlotPointTable } from "../plot_point/plotPointTable";
import { getPlotlines } from "../plotline/plotlineService";
import { PlotlineTable } from "../plotline/plotLineTable";
import { getThemes } from "../themes/themeService";
import { ThemeTable } from "../themes/themeTable";
import { getTurningPointEntriesByUserId } from "../turning_point_entry/turningPointEntryService";
import { prop } from "ramda";

export default async function AdventureCrafter(userId: string) {
    return preprocessData(await fetchData(userId));
}

export async function fetchData(userId: string) {

     const [
        characters, 
        plotlines,
        themes, 
        adventure, 
        adventureEntries,
        turningPointEntries,
        characterDescriptors,
        characterIdentities,
        characterSpecialTraits,
        plotPoints
     ] = await Promise.all([
        getCharacters(userId),
        getPlotlines(userId),
        getThemes(userId),
        getAdventureByUserId(userId),
        getAdventureEntriesByUserId(userId),
        getTurningPointEntriesByUserId(userId), 
        getCharacterDescriptors(),
        getCharacterIdentities(),
        getCharacterSpecialTraits(),
        getPlotPoints()
    ]);
    
    return {
        characters, 
        plotlines,
        themes, 
        adventure, 
        adventureEntries,
        turningPointEntries,
        characterDescriptors,
        characterIdentities,
        characterSpecialTraits,
        plotPoints
    }
}

export function preprocessData(data) {
    
    console.log('themes', ThemeTable(data.themes))
    


    return {
        turningPointEntries: groupBy(prop("adventure_entry_id"))(data.turningPointEntries),
        characterInformationTable: CharacterInformationTable(data.characterSpecialTraits, data.characterDescriptor, data.characterIdentity),
        plotlineTable: PlotlineTable(data.plotlines),
        plotPointTable: PlotPointTable(data.plotPoints),
        themesTable: ThemeTable(data.themes),
        ...data
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