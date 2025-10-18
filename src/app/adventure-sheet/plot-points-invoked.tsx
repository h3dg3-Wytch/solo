'use client';

import { useState } from "react";
import { Modal } from "./modal";
import { chooseFromTable, rollDie } from "@/lib/utils";
import { toggleLowestPriorityTheme } from "@/lib/themes/themeTable";
import { PlotPointTable } from "@/lib/plot_point/plotPointTable";
import { get } from "http";
import { useCreateTurningPointEntry } from "./hooks";
import { useUser } from "../providers";


export function PlotPointsInvoked({ entry, plotPoints, themes }) {
  const [modalData, setModalData] = useState<any | null>(null);
  const [themesTable, setThemesTable] = useState(themes.themes);
  // const [plotPointsTable, setPlotPointsTable] = useState(PlotPointTable(plotPoints));


  const createTurningPointEntry = useCreateTurningPointEntry();

  const user = useUser();
  
  const handleSave = () => {
    if (!modalData) return;

    createTurningPointEntry.mutate({
      adventure_entry_id: entry.id,
      plot_point_id: modalData.plotPoint?.id,
      character_id: rollDie(100), // or from modal if you include character
      position: entry.turning_point_entry?.length ?? 0, // place after existing
    });
    setModalData(null);
  };

  

  const getRandomTheme = () => {
    const theme = chooseFromTable(rollDie(10), themesTable);
    setThemesTable(toggleLowestPriorityTheme(themesTable));
    return theme;
  };
  
  const getRandomPlotPoint = (theme) => {
    return chooseFromTable(rollDie(100), plotPointsTable[theme])
  }

  const handleOpenModal = (plotPoint: any) => {
    const randomTheme = getRandomTheme();
    const randomPlotPoint = getRandomPlotPoint(randomTheme);
    setModalData({
      type: "plot_point",
      plotPoint: randomPlotPoint,
      theme: randomTheme,
    });
  };

  const handleCloseModal = () => setModalData(null);

  return (
    <>
      <div>
        <h2 className="text-lg font-semibold mb-2">Plot Points</h2>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, idx) => {
            const tp = entry.turning_point_entry?.[idx]; // nth turning point
            const value = tp?.plot_point?.description ?? "";

            return (
              <div key={idx} className="flex items-center">
                <input
                  type="text"
                  className="flex-1 border rounded-lg p-2"
                  placeholder={`Plot Point ${idx + 1}`}
                  defaultValue={value}
                  readOnly
                />
                <button
                  className="ml-1 px-2 py-1 border rounded-md text-xs bg-gray-100 hover:bg-gray-200"
                  onClick={() => handleOpenModal(tp?.plot_point)}
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={!!modalData}
        onClose={handleCloseModal}
        title="Plot Point Details"
      >
        {modalData && (
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-bold mb-4">Randomized Result</h2>
            <p>
              <strong>Plot Point:</strong>{" "}
              {modalData.plotPoint?.description ?? "None"}
            </p>
            <p>
              <strong>Theme:</strong> {modalData.theme ?? "None"}
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
