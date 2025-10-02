'use client';
import { useState } from "react";

export default function TurningPointSheet() {
    
     const [openEntry, setOpenEntry] = useState<{ type: string; index: number } | null>(null);

  const handleOpen = (type: string, index: number) => {
    setOpenEntry({ type, index });
  };

  const handleClose = () => {
    setOpenEntry(null);
  };
   

    return (
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
      />
    </div>

     {/* Plotline Name */}
    <div>
      <label className="block text-sm font-semibold mb-1">Plotline Name</label>
      <input
        type="text"
        className="w-full border rounded-lg p-2"
        placeholder="Enter plotline name"
      />
    </div>

    {/* Plotline Type */}
    <div>
      <label className="block text-sm font-semibold mb-1">Plotline Type</label>
      <select className="w-full border rounded-lg p-2">
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
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="flex items-center">
            <input
              type="text"
              className="flex-1 border rounded-lg p-2"
              placeholder={`Plot Point ${num}`}
            />
            <button
              className="ml-1 px-2 py-1 border rounded-md text-xs bg-gray-100 hover:bg-gray-200"
              onClick={() => console.log(`Plot Point ${num} details`)}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Characters Invoked Column */}
    <div>
      <h2 className="text-lg font-semibold mb-2">Characters Invoked</h2>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="flex items-center">
            <input
              type="text"
              className="flex-1 border rounded-lg p-2"
              placeholder={`Character ${num}`}
            />
            <button
              className="ml-1 px-2 py-1 border rounded-md text-xs bg-gray-100 hover:bg-gray-200"
              onClick={() => console.log(`Character ${num} details`)}
            >
              +
            </button>
          </div>
        ))}
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
    />
  </div>
</div>
 
    );
  
}