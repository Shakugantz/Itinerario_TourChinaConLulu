import React from "react";
import {
  AttachMoney,
  MonetizationOn,
  TrendingUp,
  Percent,
} from "@mui/icons-material";

/**
 * Componente resumen para el segundo tab, con diseño visual uniforme al primer tab.
 * Muestra métricas como costo, cotización, rentabilidad y porcentaje.
 */
const SummaryManualCard = ({
  costoReal,
  cotizacion,
  rentabilidad,
  porcentaje,
}) => {
  const formatCurrency = (value) => `¥${Number(value).toLocaleString()}`;

  const cards = [
    {
      title: "Costo Real",
      value: formatCurrency(costoReal),
      icon: (
        <AttachMoney className="text-green-500 text-lg group-hover:animate-pulse" />
      ),
      gradient: "from-green-100 via-white to-green-200",
      border: "border-green-300",
      color: "text-green-800",
    },
    {
      title: "Cotización Cliente",
      value: formatCurrency(cotizacion),
      icon: (
        <MonetizationOn className="text-blue-500 text-lg group-hover:animate-pulse" />
      ),
      gradient: "from-blue-100 via-white to-blue-200",
      border: "border-blue-300",
      color: "text-blue-800",
    },
    {
      title: "Rentabilidad",
      value: formatCurrency(rentabilidad),
      icon: (
        <TrendingUp className="text-purple-500 text-lg group-hover:animate-pulse" />
      ),
      gradient: "from-purple-100 via-white to-purple-200",
      border: "border-purple-300",
      color: "text-purple-800",
    },
    {
      title: "% de Ganancia",
      value: `${porcentaje.toFixed(2)}%`,
      icon: (
        <Percent className="text-yellow-500 text-lg group-hover:animate-pulse" />
      ),
      gradient: "from-yellow-100 via-white to-yellow-200",
      border: "border-yellow-300",
      color: "text-yellow-800",
    },
  ];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-center"
      data-aos="fade-up"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className={`relative p-6 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br ${card.gradient} shadow-lg border ${card.border} group`}
        >
          {/* Brillo animado */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {card.title}
            </h4>
            {card.icon}
          </div>

          <p
            className={`mt-3 text-2xl font-extrabold ${card.color} tracking-tight drop-shadow-sm`}
          >
            {card.value}
          </p>

          <div className="mt-4 h-1 w-full bg-gradient-to-r from-gray-400 via-gray-200 to-transparent rounded-full opacity-70"></div>
        </div>
      ))}
    </div>
  );
};

export default SummaryManualCard;
