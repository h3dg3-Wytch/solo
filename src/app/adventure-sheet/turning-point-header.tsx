'use client';

export function TurningPointHeader({entry, index, plotlines}) {
    
    console.log("the sorrws", plotlines);
    
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
            Turning Point Entry # {index}
          </label>
        </div>

         {/* Plotline Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Plotline Name</label>
     <select
  defaultValue={entry.plotline_id ?? ""}
  className="w-full border rounded-lg p-2"
>
  <option value="">Select a Plotline...</option>
  {plotlines?.map((plotline) => (
    <option key={plotline.id} value={plotline.id}>
      {plotline.name ?? plotline.default_value}
    </option>
  ))}
</select>
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