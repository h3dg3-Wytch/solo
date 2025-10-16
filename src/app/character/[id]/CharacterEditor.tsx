'use client';
import { useEffect, useState } from "react";
import { useCharacter, useUpdateCharacter } from "../hooks";

export default function CharacterEditor({ id }: { id: string }) {
  const { data: character, isLoading, isError } = useCharacter(id);
  const updateCharacter = useUpdateCharacter();
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (character) setForm(character);
  }, [character]);

  if (isLoading) return <p className="text-gray-500 text-center mt-8">Loading character...</p>;
  if (isError || !form) return <p className="text-red-600 text-center mt-8">Character not found.</p>;

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateCharacter.mutate(form);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Character</h2>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={form.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Character name"
          />
        </div>

        {/* Special Trait */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Trait</label>
          <input
            type="text"
            value={form.special_trait || ""}
            onChange={(e) => handleChange("special_trait", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Special trait"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            rows={4}
            placeholder="Describe this character..."
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={form.notes || ""}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            rows={4}
            placeholder="Any notes..."
          />
        </div>

        {/* Default */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.is_default || false}
            onChange={(e) => handleChange("is_default", e.target.checked)}
            className="accent-blue-600"
          />
          <label className="text-sm text-gray-700">Default Character</label>
        </div>

        <button
          onClick={handleSave}
          disabled={updateCharacter.isPending}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}
