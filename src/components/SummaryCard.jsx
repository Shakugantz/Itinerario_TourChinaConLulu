import React from "react";
import { FaRegChartBar } from "react-icons/fa"; // Icono decorativo (puedes cambiarlo)

const SummaryCard = ({ title, value }) => {
  return (
    // Tarjeta con fondo dinámico, brillo sutil y transición elegante
    <div className="relative p-6 rounded-2xl overflow-hidden shadow-xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-blue-100 hover:shadow-2xl transition-shadow duration-300 group">
      {/* Brillo animado de fondo (decorativo, sin afectar contenido) */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 opacity-20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

      {/* Encabezado con ícono y título */}
      <div className="flex items-center justify-between">
        {/* Título en estilo elegante y en mayúsculas */}
        <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {title}
        </h4>

        {/* Icono decorativo futurista */}
        <FaRegChartBar className="text-blue-400 text-lg" />
      </div>

      {/* Valor numérico con efecto llamativo */}
      <p className="mt-3 text-3xl font-extrabold text-blue-800 tracking-tight drop-shadow-sm">
        ${value}
      </p>

      {/* Línea decorativa sutil debajo */}
      <div className="mt-4 h-1 w-full bg-gradient-to-r from-blue-400 via-blue-300 to-transparent rounded-full opacity-70"></div>
    </div>
  );
};

export default SummaryCard;
