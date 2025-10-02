import React from "react";
import TurningPointSheet from "./turning-point-form";

export default function AdventureSheet() {
  return (
    <div className="bg-white text-gray-900 p-6 max-w-4xl mx-auto rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Adventure Sheet</h1>

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

      <div className="mb-6">
        <label className="block text-sm font-semibold">Notes</label>
        <textarea
          className="w-full border rounded-lg p-2 mt-1"
          rows={3}
          placeholder="General notes..."
        />
      </div>

    <TurningPointSheet /> 
       
    </div>
    
  );
}
