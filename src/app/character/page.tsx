'use client';
import { useState } from "react";
import { useCharacters, useUpdateCharacter } from "./hooks";

export default function CharacterList() {
  const { data: characters, isLoading } = useCharacters();
  const updateCharacter = useUpdateCharacter();
  const [editCache, setEditCache] = useState<Record<number, any>>({});

  if (isLoading) return <p className="text-gray-500 text-center mt-6">Loading characters...</p>;
  if (!characters?.length) return <p className="text-gray-600 text-center mt-6">No characters yet.</p>;

  const handleChange = (id: number, field: string, value: any) => {
    setEditCache((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = (id: number) => {
    const updated = { ...characters.find((c) => c.id === id), ...editCache[id] };
    updateCharacter.mutate(updated);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Characters</h2>

      <div className="space-y-6">
        {characters.map((char) => {
          const cache = editCache[char.id] || {};
          return (
            <div
              key={char.id}
              className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Name */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={cache.name ?? char.name ?? ""}
                  onChange={(e) => handleChange(char.id, "name", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Character name"
                />
              </div>

              {/* Special Trait */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Trait</label>
                <input
                  type="text"
                  value={cache.special_trait ?? char.special_trait ?? ""}
                  onChange={(e) => handleChange(char.id, "special_trait", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Special Trait"
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={cache.description ?? char.description ?? ""}
                  onChange={(e) => handleChange(char.id, "description", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Short description..."
                />
              </div>

              {/* Notes */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={cache.notes ?? char.notes ?? ""}
                  onChange={(e) => handleChange(char.id, "notes", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Additional notes..."
                />
              </div>

              {/* Is Default */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={cache.is_default ?? char.is_default ?? false}
                  onChange={(e) => handleChange(char.id, "is_default", e.target.checked)}
                  className="accent-blue-600"
                />
                <label className="text-sm text-gray-700">Default Character</label>
              </div>

              <button
                onClick={() => handleSave(char.id)}
                disabled={updateCharacter.isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
              >
                💾 Save Changes
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
