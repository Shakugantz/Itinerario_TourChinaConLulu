import React from "react";
import { Checkbox } from "@mui/material";

/**
 * Componente que muestra una tarjeta de destino turístico.
 * Se pinta con el color del paquete seleccionado si corresponde,
 * y con color azul si fue seleccionado manualmente.
 */
const DestinationCard = ({
  destination,
  isSelected,
  onToggle,
  currentPrice,
  index,
  colorClase, // Clase de color (ej. 'blue', 'violet', etc.) según el paquete
}) => {
  // Colores dinámicos según el paquete (por nombre base)
  const colorMap = {
    green: {
      border: "border-green-500",
      bg: "bg-green-50",
      ring: "ring-green-400/40",
      text: "text-green-500",
      checkboxColor: "#22c55e",
      checkboxChecked: "#16a34a",
    },
    violet: {
      border: "border-violet-500",
      bg: "bg-violet-50",
      ring: "ring-violet-400/40",
      text: "text-violet-500",
      checkboxColor: "#8b5cf6",
      checkboxChecked: "#7c3aed",
    },
    pink: {
      border: "border-pink-500",
      bg: "bg-pink-50",
      ring: "ring-pink-400/40",
      text: "text-pink-500",
      checkboxColor: "#ec4899",
      checkboxChecked: "#db2777",
    },
    yellow: {
      border: "border-yellow-500",
      bg: "bg-yellow-50",
      ring: "ring-yellow-400/40",
      text: "text-yellow-500",
      checkboxColor: "#eab308",
      checkboxChecked: "#ca8a04",
    },
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      ring: "ring-blue-400/40",
      text: "text-blue-500",
      checkboxColor: "#3b82f6",
      checkboxChecked: "#1e40af",
    },
    white: {
      border: "border-gray-200",
      bg: "bg-white",
      ring: "",
      text: "text-gray-300",
      checkboxColor: "#6366f1",
      checkboxChecked: "#4f46e5",
    },
  };

  // Selección de color:
  // Si está seleccionado y tiene paquete, usa color del paquete
  // Si está seleccionado manualmente (sin paquete), usa azul (blue)
  // Si no está seleccionado, usa blanco (white)
  const selectedColor = isSelected
    ? colorClase
      ? colorMap[colorClase]
      : colorMap["blue"] // selección manual = azul
    : colorMap["white"]; // no seleccionado = blanco

  return (
    <div
      className={`relative p-4 pl-14 rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md duration-200 
        ${selectedColor.border} ${selectedColor.bg} ${selectedColor.ring}`}
      onClick={onToggle}
    >
      <div
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-extrabold font-orbitron transition-all duration-300 
          ${
            isSelected ? `${selectedColor.text} animate-glow` : "text-gray-300"
          }`}
      >
        {index + 1}
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-base">
            {destination.name}
          </h3>
          <p className="text-sm text-blue-600 font-bold mt-1">
            ${currentPrice}
          </p>
        </div>

        <Checkbox
          checked={isSelected}
          onClick={(e) => e.stopPropagation()}
          onChange={onToggle}
          sx={{
            color: selectedColor.checkboxColor,
            "&.Mui-checked": {
              color: selectedColor.checkboxChecked,
            },
          }}
        />
      </div>
    </div>
  );
};

export default DestinationCard;
