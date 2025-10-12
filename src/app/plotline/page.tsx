'use client';
import { useState } from "react";
import { usePlotlines, useUpdatePlotline, useCreatePlotline } from "./hooks";
import { useUser } from "@/app/providers";

export default function PlotlineForm() {
  const { data: plotlines, isLoading } = usePlotlines();
  const updatePlotline = useUpdatePlotline();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white border rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-bold mb-4">Your Plotlines</h2>

      {/* Existing plotlines */}
      {plotlines?.map((p) => (
        <div
          key={p.id}
          className="p-4 border rounded-lg mb-4 flex flex-col gap-2"
        >
          <input
            type="text"
            value={p.name || ""}
            onChange={(e) =>
              updatePlotline.mutate({ ...p, name: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Plotline Name"
          />

          <textarea
            value={p.description || ""}
            onChange={(e) =>
              updatePlotline.mutate({ ...p, description: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Description"
          />

          <div className="flex items-center gap-2">
            <label className="text-sm">Development</label>
            <input
              type="checkbox"
              checked={p.isDevelopment || false}
              onChange={(e) =>
                updatePlotline.mutate({ ...p, isDevelopment: e.target.checked })
              }
            />
            <label className="text-sm">Conclusion</label>
            <input
              type="checkbox"
              checked={p.isConclusion || false}
              onChange={(e) =>
                updatePlotline.mutate({ ...p, isConclusion: e.target.checked })
              }
            />
            <label className="text-sm">New Plotline</label>
            <input
              type="checkbox"
              checked={p.isNewPlotline || false}
              onChange={(e) =>
                updatePlotline.mutate({ ...p, isNewPlotline: e.target.checked })
              }
            /> 
          </div>
        </div>
      ))}
    </div>
  );
}
