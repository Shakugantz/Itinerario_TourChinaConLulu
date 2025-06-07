import React from "react";
import { Cancel, Description, TableChart } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
import { exportToExcel, exportToWord } from "../utils/ExportUtils";

const BudgetPopup = ({ isOpen, onClose, budget }) => {
  // Si no está abierto, no renderiza el popup
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      data-aos="zoom-in"
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-[90%] max-w-lg animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          {/* Título con gradiente visible y sombra suave para mejor contraste con fondo blanco */}
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
            Detalles del Presupuesto
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-green-500 transition-colors"
          >
            <Cancel fontSize="large" />
          </button>
        </div>

        {/* Detalles del presupuesto */}
        <ul className="space-y-2 text-gray-700">
          <li>🎫 Entradas: ${budget.entries}</li>
          <li>🚌 Transporte: ${budget.transport}</li>
          <li>🧑‍🏫 Guía turístico: ${budget.guide}</li>
          <li>✈️ Servicio aeropuerto: ${budget.airport}</li>
          <li className="font-bold text-lg">
            💰 Total estimado: ${budget.total}
          </li>
        </ul>

        {/* Botones de exportación */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => exportToExcel(budget)}
            className="flex items-center justify-center gap-2 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-md"
          >
            <TableChart /> Exportar Excel
          </button>

          <button
            onClick={() => exportToWord(budget)}
            className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
          >
            <Description /> Exportar Word
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetPopup;
