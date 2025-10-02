'use client';
import React, { useState } from "react";
import TurningPointSheet from "./turning-point-form";
import Themes from "./themes";
import AdventureInfo from "./adventure-info";



export default function AdventureSheet() {
    const [turningPoints, setTurningPoints] = useState<number[]>([0]);

  const addTurningPoint = () => {
    setTurningPoints((prev) => [...prev, prev.length]);
  };
  return (
    <div className="bg-white text-gray-900 p-6 max-w-4xl mx-auto rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Adventure Sheet</h1>

      <AdventureInfo />
         {/* Render all TurningPointSheet components */}
      {turningPoints.map((id) => (
        <div key={id} className="mb-4">
          <TurningPointSheet />
        </div>
      ))}

      {/* Add Turning Point Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={addTurningPoint}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Turning Point
        </button>
      </div>
       
    </div>
    
  );
}
