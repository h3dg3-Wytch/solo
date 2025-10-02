import Themes from "./themes";

export default function AdventureInfo() {

    
    return (
        <div>
              <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold">Adventure</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Adventure name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Date</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>
      </div>

     <div className="mb-6 grid grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold">Notes</label>
        <textarea
          className="w-full border rounded-lg p-2 mt-1"
          rows={10}
          placeholder="General notes..."
        />
      </div>
      <div>
        <Themes />
      </div>
      </div>
      </div>
    )
}