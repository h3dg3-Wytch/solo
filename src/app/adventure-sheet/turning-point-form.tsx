'use client';
import { useState } from "react";
import { useAppData, useUser } from "../providers";
import { createClient } from "@/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdventureEntries } from "./hooks";
import { Modal } from "./modal";
import { PlotPointsInvoked } from "./plot-points-invoked";
import { CharactersInvoked } from "./characters-invoked";
import { TurningPointHeader } from "./turning-point-header";
import { TurningPointNotes } from "./turning-points-notes";
import { PlotPointTable } from "@/lib/plot_point/plotPointTable";
import { CharacterInformationTable } from "@/lib/character/characterTable";

export default function TurningPointSheet( { themes, plotlines, characters }) {
  
  const user = useUser(); 
  
  if(user === null) {
    return <p>Loading...</p>
  }
  
  const { 
    plotPoints,   
    descriptors,
    identities,
    traits
  } = useAppData();
  
  
  console.log('safd',plotPoints, PlotPointTable(plotPoints), "why")
  const { data: adventureEntries, isLoading, isError } = useAdventureEntries(user?.id);
  

  const [randomized, setRandomized] = useState<{ entryId: number, plotPoint: any, trait: any } | null>(null);

  const handleRandomize = (entryId: number) => {
    // const plotPoint = plotPoints[Math.floor(Math.random() * plotPoints.length)];
    // const trait = traits[Math.floor(Math.random() * traits.length)];
    // setRandomized({ entryId, plotPoint, trait });
    // 
    console.log('we random duaaa');
  };
  
  const handleSaveRandomized = async () => {
    /* if (!randomized) return;

    const { entryId, plotPoint, trait } = randomized;

    // Update the adventure entry with the randomized values
    const { error } = await supabase
      .from("turning_point_entry")
      .update({
        plot_point_id: plotPoint.id,
        character_id: null, // leave character blank unless you want to randomize that too
      })
      .eq("adventure_entry_id", entryId)
      .select();

    if (error) {
      console.error("Error updating:", error);
    } else {
      console.log("Updated successfully");
      setRandomized(null);
    }
  }; */
  }
  
  
   
  if (isLoading) return <p>Loading adventure entries...</p>;
  if (isError) return <p>Failed to load adventure entries.</p>;

    return (
      <>
        {adventureEntries?.map((entry, index) => <div key={entry.id} className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
          <TurningPointHeader entry={entry} index={index + 1} plotlines={plotlines}/>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlotPointsInvoked entry={entry} themes={themes} plotPoints={PlotPointTable(plotPoints)}/>
              <CharactersInvoked entry={entry} characters={characters} characterTable={CharacterInformationTable(traits, descriptors, identities)} />
          </div>

        <TurningPointNotes entry={entry} />
        </div>
        )}
    </>);
    
  
}
