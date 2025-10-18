'use client';

import { defaultCharacterTable } from "@/lib/constants";

export function CharactersSelection({ characters }) {

    return (
        <div className="sticky top-[350px] bg-white z-10">
            <h2 className="text-lg font-bold mb-2">Character List</h2>
            <div className="border rounded-lg h-[300px] overflow-y-auto p-2">
              {Object.keys(defaultCharacterTable).map((index) => (
                <div key={index} className="py-0.5 border-b last:border-b-0">
                  <label className="font-semibold mr-1">{index}:</label>
                  <span className="text-sm">{defaultCharacterTable[index]}</span>
                </div>
              ))}
            </div>
        </div>
    )
}