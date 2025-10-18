'use-client';

export function PlotlinesSelection({ plotlines }) {
    
    console.log(plotlines);
    
    const useNameOrDefaultValue= (plotline) => plotline.is_default ? plotline.default_value : plotline.name;

    return (
        <div className="sticky top-0 bg-white z-10">
            <h2 className="text-lg font-bold mb-2">Plotlines</h2>
            <div className="border rounded-lg h-[300px] overflow-y-auto p-2">
              {plotlines?.map((plotline, index) => (
                <div key={plotline.id} className="py-0.5 border-b last:border-b-0">
                  <label className="font-semibold mr-1">{index + 1}:</label>
                  <span className="text-sm">{useNameOrDefaultValue(plotline)}</span>
                </div>
              ))}
            </div>
        </div>
    )

}