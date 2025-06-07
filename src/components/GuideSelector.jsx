import React, { useMemo } from "react";
import { FaUserTie } from "react-icons/fa";

const GuideSelector = ({
  peopleCount, // Número de personas para calcular tarifa
  selectedDays, // Días seleccionados para contratar guía (0 o 1 con checkbox)
  onDaysChange, // Función para actualizar días seleccionados
  guidePrices, // Lista con rangos y tarifas diarias para guía
}) => {
  // Calcula la tarifa diaria según el número de personas
  const dailyRate = useMemo(() => {
    const rate = guidePrices.find(
      (g) => peopleCount >= g.minPeople && peopleCount <= g.maxPeople
    );
    return rate ? rate.dailyRate : 0;
  }, [peopleCount, guidePrices]);

  // Función para manejar el cambio del checkbox (0 o 1 día)
  const handleToggle = () => {
    onDaysChange(selectedDays > 0 ? 0 : 1);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      {/* Título e ícono del servicio de guía */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FaUserTie className="text-blue-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">
              {selectedDays > 0
                ? `Guía seleccionado para 1 día`
                : "¿Deseas un guía profesional?"}
            </p>
          </div>
        </div>

        {/* Checkbox futurista para activar o desactivar guía */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={selectedDays > 0}
            onChange={handleToggle}
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300"></div>
          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
        </label>
      </div>

      {/* Información de precios si está seleccionado */}
      {selectedDays > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Tarifa diaria:</span> ${dailyRate}{" "}
            (para {peopleCount} persona{peopleCount !== 1 ? "s" : ""})
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium">Total guía:</span> ${dailyRate}
          </p>
        </div>
      )}

      {/* --------------------------------------------- */}
      {/* Versión anterior con botones + y - (comentada) */}
      {/*
        <div className="flex items-center space-x-2">
          <button onClick={decrement} className="...">-</button>
          <span>{selectedDays}</span>
          <button onClick={increment} className="...">+</button>
        </div>
      */}
    </div>
  );
};

export default GuideSelector;
