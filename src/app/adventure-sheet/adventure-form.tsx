'use client';
import React, { useState } from "react";
import TurningPointSheet from "./turning-point-form";
import Themes from "./themes";
import AdventureInfo from "./adventure-info";
import { defaultCharacterTable, defaultPlotLineTable } from "@/lib/constants";
import { useUser } from "../providers";
import { useAdventure, useCharacters, useCreateAdventureWithTurningPoints, usePlotlines, useThemes } from './hooks';
import { PlotlinesSelection } from "./plotlines-selection";
import { CharactersSelection } from "./characters-selection";
import { ThemeTable } from "@/lib/themes/themeTable";



export default function AdventureForm() {
  
  
  
  const user = useUser();
  
  const { data: adventure, isLoading, isError } = useAdventure(user?.id);
  const { data: themes, isLoading: isLoadingThemes, isError: isErrorThemes } = useThemes(user?.id);
  const { data: plotlines } = usePlotlines(user?.id);
  const { data: characters } = useCharacters(user?.id);
  
  if (isLoading) return <p>Loading adventure...</p>;
  if (isLoadingThemes) return <p>Loading themes...</p>;
  
 
  
  const addTurningPoint = () => {
    
    // createAdventureWithTP.mutate({
    //   user_id: user?.id,
    //   adventure_id: adventureCrafter.adventure.id,      // optional
    // });
  };
  
   return (
     <div className="bg-white text-gray-900 p-6 max-w-7xl mx-auto rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Adventure Sheet</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side: AdventureInfo + TurningPointSheets + Add Button */}
        <div className="flex-1 flex flex-col gap-4">
          <AdventureInfo adventure={adventure} themeTable={themes}/>
          <TurningPointSheet themes={themes} />
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
        <PlotlinesSelection plotlines={plotlines} />
        <CharactersSelection characters={characters} /> 
      </div>
    </div>
    </div>);
    }

