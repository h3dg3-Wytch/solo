'use client';
import { useState } from "react";
import { useAppData, useUser } from "../providers";
import { createClient } from "@/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdventureEntries } from "./hooks";
import { Modal } from "./modal";

export default function TurningPointSheet( themes ) {
  
  const user = useUser(); 
  
  if(user === null) {
    return <p>Loading...</p>
  }
  
  
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
  
  
  const [modalData, setModalData] = useState<any | null>(null);

  
  const handleOpenModal = (type: string, value: any) => {
    setModalData({ type, value });
  };

  const handleCloseModal = () => setModalData(null);
    
  const [openEntry, setOpenEntry] = useState<{ type: string; index: number } | null>(null);

  const handleOpen = (type: string, index: number) => {
    setOpenEntry({ type, index });
  };

  const handleClose = () => {
    setOpenEntry(null);
  };
   
  if (isLoading) return <p>Loading adventure entries...</p>;
  if (isError) return <p>Failed to load adventure entries.</p>;

    return (<>
    {adventureEntries?.map(entry =>
  <div key={entry.id} className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
  {/* Header */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    {/* Entry Number */}
    <div>
      <label className="block text-sm font-semibold mb-1">
        Turning Point Entry # {entry.turning_point_number}
      </label>
    </div>

     {/* Plotline Name */}
    <div>
      <label className="block text-sm font-semibold mb-1">Plotline Name</label>
      <input
        type="text"
        className="w-full border rounded-lg p-2"
        placeholder="Enter plotline name"
        value={entry.plotline.name}
        onChange={() => {}}
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
              onClick={() => handleOpenModal("plot_point", tp?.plot_point)}
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
              onClick={() => handleOpenModal("character", tp?.character)}
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
        onChange={() => {}}
    />
  </div>
</div>
 
    )}
    <Modal
        isOpen={!!modalData}
        onClose={handleCloseModal}
        title={modalData?.type === "plot_point" ? "Plot Point Details" : "Character Details"}
      >
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-bold mb-4">Randomized Result</h2>
            <p><strong>Plot Point:</strong> {}</p>
            <p><strong>Theme:</strong> {}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={handleSaveRandomized}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>);
    
  
}

function determinePlotlineType(plotline) { 
     if (!plotline) return ""; // fallback

  if (plotline.isNewPlotline) return "new";
  if (plotline.isDevelopment) return "development";
  if (plotline.isConclusion) return "conclusion";

  return "";
}