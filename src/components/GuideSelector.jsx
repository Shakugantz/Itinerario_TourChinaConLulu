import React, { useMemo } from "react";
import { Man as ManIcon } from "@mui/icons-material";

const GuideSelector = ({
  peopleCount,
  selectedDays,
  onDaysChange,
  guidePrices,
}) => {
  const dailyRate = useMemo(() => {
    const rate = guidePrices.find(
      (g) => peopleCount >= g.minPeople && peopleCount <= g.maxPeople
    );
    return rate ? rate.dailyRate : 0;
  }, [peopleCount, guidePrices]);

  const handleToggle = () => {
    onDaysChange(selectedDays > 0 ? 0 : 1);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      {/* Header con ícono y texto */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 shadow-md shadow-blue-300/50">
            <ManIcon className="text-3xl" />
          </div>
          <p className="text-lg font-semibold text-gray-800">
            {selectedDays > 0
              ? "Guía profesional activado para 1 día"
              : "¿Quieres un guía profesional?"}
          </p>
        </div>

        {/* Switch personalizado */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={selectedDays > 0}
            onChange={handleToggle}
          />
          <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
          <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
        </label>
      </div>

      {/* Info de tarifas solo si está seleccionado */}
      {selectedDays > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 font-medium shadow-inner">
          <p>
            Tarifa diaria para{" "}
            <span className="font-semibold">{peopleCount}</span> persona
            {peopleCount !== 1 ? "s" : ""}
          </p>
          <p className="text-2xl mt-1">${dailyRate.toLocaleString()}</p>
          <p className="mt-1 text-sm text-blue-700">
            Total guía: <strong>${dailyRate.toLocaleString()}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default GuideSelector;
