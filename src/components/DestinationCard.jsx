import React from "react";

/**
 * Componente que muestra una tarjeta de destino turístico.
 * Se pinta con el color del paquete seleccionado si corresponde,
 * y con color índigo si fue seleccionado manualmente.
 */
const DestinationCard = ({
  destination,
  isSelected,
  onToggle,
  currentPrice,
  index,
  colorClase, // <-- Clase de color (ej. 'blue', 'violet', etc.) según el paquete
}) => {
  // Colores dinámicos según el paquete (por nombre base)
  const colorMap = {
    green: {
      border: "border-green-500",
      bg: "bg-green-50",
      ring: "ring-green-400/40",
      text: "text-green-500",
    },
    violet: {
      border: "border-violet-500",
      bg: "bg-violet-50",
      ring: "ring-violet-400/40",
      text: "text-violet-500",
    },
    pink: {
      border: "border-pink-500",
      bg: "bg-pink-50",
      ring: "ring-pink-400/40",
      text: "text-pink-500",
    },
    yellow: {
      border: "border-yellow-500",
      bg: "bg-yellow-50",
      ring: "ring-yellow-400/40",
      text: "text-yellow-500",
    },
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      ring: "ring-blue-400/40",
      text: "text-blue-500",
    },
    white: {
      border: "border-gray-200",
      bg: "bg-white",
      ring: "",
      text: "text-gray-300",
    },
  };

  // Determina el color a usar cuando está seleccionado
  const selectedColor = isSelected
    ? colorClase
      ? colorMap[colorClase] // Paquete activado
      : colorMap["blue"] // Seleccionado manualmente
    : colorMap["white"]; // No seleccionado

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

        <input
          type="checkbox"
          checked={isSelected}
          onClick={(e) => e.stopPropagation()}
          onChange={onToggle}
          className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
        />
      </div>
    </div>
  );
};

export default DestinationCard;
