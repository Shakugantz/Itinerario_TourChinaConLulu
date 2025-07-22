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
    <div
      className="relative p-3 rounded-xl overflow-hidden shadow-md bg-white border border-gray-200 group transition-transform duration-300 hover:scale-105" // Reducir padding y bordes, añadir hover
      data-aos="fade-up"
    >
      {/* Brillo animado de fondo (más sutil) */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 opacity-20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>

      {/* Encabezado: título e ícono */}
      <div className="flex items-center justify-between mb-2">
        {/* Título un poco más pequeño */}
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </h4>

        <InsightsOutlined className="text-blue-300 text-base group-hover:text-blue-500 transition-colors" />
      </div>

      {/* Valor principal más pequeño para estas tarjetas */}
      <p className="mt-1 text-xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm">
        ¥{value}
      </p>

      {/* Línea decorativa inferior */}
      <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-blue-300 via-blue-200 to-transparent rounded-full opacity-60"></div>
    </div>
  );
};

export default SummaryCard;
