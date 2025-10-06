"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Adventure } from "@/lib/adventure/types";
import Themes from "./themes";
import AdventureCrafter from "@/lib/AdventureCrafter/adventureCrafter";
import { createClient } from "@/utils/supabase/client";

export default function AdventureInfo({ adventure, themeTable, user}: { adventure: Adventure, themeTable: any }) {
  console.log(user) 
  
  const supabase = createClient(); 
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: adventure.name || "",
    date: adventure.date ? adventure.date.split("T")[0] : "",
    notes: adventure.notes || "",
  });

  // --- Update mutation
  const updateAdventure = useMutation({
    mutationFn: async (updated: Partial<Adventure>) => {

      const { error } = await supabase
        .from("adventure")
        .update(updated)
        .eq("user_id", user.id);

      if (error) throw error;
      return updated;
    },
    onSuccess: (updated) => {
      // Optimistically update the cache
      queryClient.setQueryData(["adventure", adventure.id], {
        ...adventure,
        ...updated,
      });
    },
  });

  // --- Change handler
  const handleChange = (field: keyof Adventure) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));

    updateAdventure.mutate({ [field]: value });
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold">Adventure</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Adventure name"
            value={form.name}
            onChange={handleChange("name")}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Date</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2 mt-1"
            value={form.date}
            onChange={handleChange("date")}
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
            value={form.notes}
            onChange={handleChange("notes")}
          />
        </div>
        <div>
          {themeTable ? (<Themes themeTable={themeTable} />) : (<p>Loading...</p>) }
        </div>
      </div>
    </div>
  );
}
