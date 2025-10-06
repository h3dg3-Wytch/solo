import { useState } from "react";

const themes = ["action", "social", "personal", "mystery", "tension"];

export default function Themes({ themeTable }) {
  console.log(themeTable);
  const [selectedThemes, setSelectedThemes] = useState<(string | null)[]>(() => [
    themeTable?.firstPriority ?? null,
    themeTable?.secondPriority ?? null,
    themeTable?.thirdPriority ?? null,
    themeTable?.fourthPriority ?? null,
    themeTable?.fifthPriority ?? null,
  ]);

  const handleChange = (index: number, value: string) => {
    const newSelections = [...selectedThemes];
    newSelections[index] = value;
    setSelectedThemes(newSelections);
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
