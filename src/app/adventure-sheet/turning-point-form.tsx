'use client';
import { useState } from "react";
import { useUser } from "../providers";
import { createClient } from "@/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdventureEntries } from "./hooks";

export default function TurningPointSheet() {
  
  const supabase = createClient();
  const user = useUser(); 
  
  const { data: adventureEntries, isLoading, isError } = useAdventureEntries(user?.id);
  
    
  const [openEntry, setOpenEntry] = useState<{ type: string; index: number } | null>(null);

  const handleOpen = (type: string, index: number) => {
    setOpenEntry({ type, index });
  };

  const handleClose = () => {
    setOpenEntry(null);
  };
   
  if (isLoading) return <p>Loading adventure entries...</p>;
  if (isError) return <p>Failed to load adventure entries.</p>;

    return adventureEntries?.map(entry =>
  <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
  {/* Header */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    {/* Entry Number */}
    <div>
      <label className="block text-sm font-semibold mb-1">
        Turning Point Entry #
      </label>
      <input
        type="number"
        className="w-full border rounded-lg p-2"
        placeholder="e.g. 1"
        value={entry.turning_point_number}
      />
    </div>

     {/* Plotline Name */}
    <div>
      <label className="block text-sm font-semibold mb-1">Plotline Name</label>
      <input
        type="text"
        className="w-full border rounded-lg p-2"
        placeholder="Enter plotline name"
        value={entry.plotline.name}
      />
    </div>

    {/* Plotline Type */}
    <div>
      <label className="block text-sm font-semibold mb-1">Plotline Type</label>
      <select defaultValue={determinePlotlineType(entry.plotline)} className="w-full border rounded-lg p-2">
        <option value="">Select...</option>
        <option value="new">New Plotline</option>
        <option value="development">Development</option>
        <option value="conclusion">Conclusion</option>
      </select>
    </div>
  </div>
    
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Plot Points Column */}
    <div>
  <h2 className="text-lg font-semibold mb-2">Plot Points</h2>
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, idx) => {
        const tp = entry.turning_point_entry?.[idx]; // nth turning point
        const value = tp?.plot_point?.description ?? ""; // prefill if exists

        return (
          <div key={idx} className="flex items-center">
            <input
              type="text"
              className="flex-1 border rounded-lg p-2"
              placeholder={`Plot Point ${idx + 1}`}
              defaultValue={value}
            />
            <button
              className="ml-1 px-2 py-1 border rounded-md text-xs bg-gray-100 hover:bg-gray-200"
              onClick={() => console.log(`Plot Point ${idx + 1} details`, tp)}
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  </div>

  {/* Characters Invoked Column */}
  <div>
    <h2 className="text-lg font-semibold mb-2">Characters Invoked</h2>
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, idx) => {
        const tp = entry.turning_point_entry?.[idx];
        const value = tp?.character?.name ?? "";

        return (
          <div key={idx} className="flex items-center">
            <input
              type="text"
              className="flex-1 border rounded-lg p-2"
              placeholder={`Character ${idx + 1}`}
              defaultValue={value}
            />
            <button
              className="ml-1 px-2 py-1 border rounded-md text-xs bg-gray-100 hover:bg-gray-200"
              onClick={() => console.log(`Character ${idx + 1} details`, tp)}
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  </div>
  </div>

  {/* Notes Section */}
  <div className="mt-6">
    <h2 className="text-lg font-semibold mb-2">Notes</h2>
    <textarea
      rows={4}
      className="w-full border rounded-lg p-2"
      placeholder="Enter notes here..."
      value={entry.notes}
    />
  </div>
</div>
 
    );
  
}

function determinePlotlineType(plotline) { 
     if (!plotline) return ""; // fallback

  if (plotline.isNewPlotline) return "new";
  if (plotline.isDevelopment) return "development";
  if (plotline.isConclusion) return "conclusion";

  return "";
}