import React from "react";
import { InsightsOutlined } from "@mui/icons-material"; // Ícono moderno de estadísticas

/**
 * Componente de tarjeta resumen con título, valor y diseño visual atractivo.
 * Ideal para mostrar métricas o datos clave.
 * @param {string} title - Título del dato mostrado (ej. "Ingresos").
 * @param {number|string} value - Valor numérico o textual.
 */
const SummaryCard = ({ title, value }) => {
  return (
    <div className="relative p-6 rounded-2xl overflow-hidden shadow-xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-blue-100 hover:shadow-2xl transition-shadow duration-300 group">
      {/* Brillo animado de fondo */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 opacity-20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

      {/* Encabezado: título e ícono */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {title}
        </h4>

        <InsightsOutlined className="text-blue-400 text-lg group-hover:animate-pulse transition-transform" />
      </div>

      {/* Valor principal con estilo impactante */}
      <p className="mt-3 text-3xl font-extrabold text-blue-800 tracking-tight drop-shadow-sm">
        ${value}
      </p>

      {/* Línea decorativa inferior */}
      <div className="mt-4 h-1 w-full bg-gradient-to-r from-blue-400 via-blue-300 to-transparent rounded-full opacity-70"></div>
    </div>
  );
};

export default SummaryCard;
