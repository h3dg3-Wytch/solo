import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
const themes = ["social", "mystery", "tension", "personal", "action"]; // or however you define these

export default function Themes({ themeTable }) {
  console.log('wergha', themeTable)
  const queryClient = useQueryClient();
  const supabase = createClient(); 

  const [selectedThemes, setSelectedThemes] = useState<(string | null)[]>(() => [
    themeTable?.firstPriority ?? null,
    themeTable?.secondPriority ?? null,
    themeTable?.thirdPriority ?? null,
    themeTable?.fourthPriority ?? null,
    themeTable?.fifthPriority ?? null,
  ]);

  // --- 🧠 React Query mutation for Supabase update ---
  const updateThemes = useMutation({
    mutationFn: async (updatedThemes: (string | null)[]) => {
      const { error } = await supabase
        .from("themes") // ⬅️ your table name here
        .update({
          firstPriority: updatedThemes[0],
          secondPriority: updatedThemes[1],
          thirdPriority: updatedThemes[2],
          fourthPriority: updatedThemes[3],
          fifthPriority: updatedThemes[4],
        })
        .eq("id", themeTable.id); // ⬅️ ensure this ID exists
      if (error) throw error;
    },
    onSuccess: () => {
      // ✅ Revalidate or refresh the data
      queryClient.invalidateQueries(["themes", themeTable.id]);
    },
  });

  // --- 🕐 Debounce local updates before pushing to Supabase ---
  useEffect(() => {
    if (!themeTable?.id) return;
    console.log('in the useEffect')

    const timer = setTimeout(() => {
      updateThemes.mutate(selectedThemes);
    }, 600); // wait 600ms after last change

    return () => clearTimeout(timer);
  }, [selectedThemes]);

  // --- 🧩 Handle changes locally ---
  const handleChange = (index: number, value: string) => {
    setSelectedThemes((prev) => {
      const newSelections = [...prev];
      newSelections[index] = value;
      return newSelections;
    });
  };

  const getAvailableOptions = (currentIndex: number) => {
    return themes.filter(
      (theme) =>
        !selectedThemes.includes(theme) || selectedThemes[currentIndex] === theme
    );
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Themes</h2>
      <div className="grid gap-2">
        {selectedThemes.map((selected, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="w-6 text-right">{index + 1}.</span>
            <select
              value={selected || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select theme</option>
              {getAvailableOptions(index).map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
