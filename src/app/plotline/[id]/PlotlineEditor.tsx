'use client';
import { useEffect, useState } from "react";
import { usePlotline, useUpdatePlotline } from "../hooks";

export default function PlotlineEditor({ id }: { id: string }) {
  const { data: plotline, isLoading, isError } = usePlotline(id);
  const updatePlotline = useUpdatePlotline();
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (plotline) setForm(plotline);
  }, [plotline]);

  if (isLoading) return <p className="text-gray-500 text-center mt-8">Loading plotline...</p>;
  if (isError || !form) return <p className="text-red-600 text-center mt-8">Plotline not found.</p>;

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updatePlotline.mutate(form);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Plotline</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={form.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Plotline name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            rows={5}
            placeholder="Describe this plotline..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.isNewPlotline || false}
              onChange={(e) => handleChange("isNewPlotline", e.target.checked)}
              className="mr-2 accent-blue-600"
            />
            New Plotline
          </label>
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.isDevelopment || false}
              onChange={(e) => handleChange("isDevelopment", e.target.checked)}
              className="mr-2 accent-blue-600"
            />
            Development
          </label>
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.isConclusion || false}
              onChange={(e) => handleChange("isConclusion", e.target.checked)}
              className="mr-2 accent-blue-600"
            />
            Conclusion
          </label>
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.is_default || false}
              onChange={(e) => handleChange("is_default", e.target.checked)}
              className="mr-2 accent-blue-600"
            />
            Reset to Default
          </label>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}
