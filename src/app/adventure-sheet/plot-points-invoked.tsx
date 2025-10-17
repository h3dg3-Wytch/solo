'use client';

import { useState } from "react";
import { Modal } from "./modal";


export function PlotPointsInvoked({ entry }) {
    
  const [modalData, setModalData] = useState<any | null>(null);

  const handleOpenModal = (type: string, value: any) => {
    setModalData({ type, value });
  };

  const handleCloseModal = () => setModalData(null);

  return (
    <>  
    <div>
      <h2 className="text-lg font-semibold mb-2">Plot Points</h2>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, idx) => {
            const tp = entry.turning_point_entry?.[idx]; // nth turning point
            const value = tp?.plot_point?.description ?? ""; // prefill if exists

            return (
              <div key={idx} className="flex items-center">
                <input
                  type="text"
                  className="flex-1 border rounded-lg p-2"
                  placeholder={`Plot Point ${idx + 1}`}
                  defaultValue={value}
                />
                <button
                  className="ml-1 px-2 py-1 border rounded-md text-xs bg-gray-100 hover:bg-gray-200"
                  onClick={() => handleOpenModal("plot_point", tp?.plot_point)}
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
        title={modalData?.type === "plot_point" ? "Plot Point Details" : "Character Details"}
      >
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-bold mb-4">Randomized Result</h2>
            <p><strong>Plot Point:</strong> {}</p>
            <p><strong>Theme:</strong> {}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={() => {}}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
    );
}