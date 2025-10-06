'use client';
import React, { useState } from "react";
import TurningPointSheet from "./turning-point-form";
import Themes from "./themes";
import AdventureInfo from "./adventure-info";
import { defaultCharacterTable, defaultPlotLineTable } from "@/lib/constants";



export default function AdventureForm( { adventureCrafter,  user }) {
  
  console.log('weve in the component', adventureCrafter);
    const [turningPoints, setTurningPoints] = useState<number[]>([0]);

  const addTurningPoint = () => {
    setTurningPoints((prev) => [...prev, prev.length]);
  };
  
   return (
   <div className="bg-white text-gray-900 p-6 max-w-7xl mx-auto rounded-2xl shadow">
  <h1 className="text-2xl font-bold mb-4">Adventure Sheet</h1>

  <div className="flex flex-col md:flex-row gap-6">
    {/* Left side: AdventureInfo + TurningPointSheets + Add Button */}
    <div className="flex-1 flex flex-col gap-4">
    
     {adventureCrafter ? (
  <AdventureInfo adventure={adventureCrafter.adventure} themeTable={adventureCrafter.themesTable} user={user}/>
) : (
  <p>Loading...</p>
)}

  
      {/* Turning Points */}
      {turningPoints.map((id) => (
        <div key={id} className="mb-4">
          <TurningPointSheet />
        </div>
      ))}

      {/* Add Turning Point Button */}
      <div className="flex justify-center mt-2">
        <button
          onClick={addTurningPoint}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Turning Point
        </button>
      </div>
    </div>

<div className="hidden md:flex flex-col gap-6 w-80">
  {/* Plotlines */}
  <div className="sticky top-0 bg-white z-10">
    <h2 className="text-lg font-bold mb-2">Plotlines</h2>
    <div className="border rounded-lg h-[300px] overflow-y-auto p-2">
      {Object.keys(defaultPlotLineTable).map((index) => (
        <div key={index} className="py-0.5 border-b last:border-b-0">
          <label className="font-semibold mr-1">{index}:</label>
          <span className="text-sm">{defaultPlotLineTable[index]}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Other Characters */}
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
</div>
</div>
</div>);
}

