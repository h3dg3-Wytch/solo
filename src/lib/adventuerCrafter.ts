import { setPriority } from "os";
import { adventureTables } from "./adventureTables";
import {groupBy, prop, fromPairs, map} from 'ramda';

export function AdventureCrafter(data) {
    
    const grouped = groupBy(prop('category'), data);

    const result = map(adventureTables, grouped);
    
    
    
    console.log(result);

    const prioirty = [];
    const plotPoints = [];
    
    return {
        
        setPriority: () => { return null},
        generateTheme: () => { return null},
        generatePlotPoint: () => {},
        addToTurningPoint: () => {}
    }

}

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