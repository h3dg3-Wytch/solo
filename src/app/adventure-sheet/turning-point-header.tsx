'use client';

export function TurningPointHeader({entry}) {
    
    const determinePlotlineType = (plotline) => { 
      if (!plotline) return ""; // fallback
      if (plotline.isNewPlotline) return "new";
      if (plotline.isDevelopment) return "development";
      if (plotline.isConclusion) return "conclusion";

      return "";
    }

    return (
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
)}

function determinePlotlineType(plotline) { 
     if (!plotline) return ""; // fallback

  if (plotline.isNewPlotline) return "new";
  if (plotline.isDevelopment) return "development";
  if (plotline.isConclusion) return "conclusion";

  return "";
}