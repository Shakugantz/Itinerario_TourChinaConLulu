import React, { useMemo } from "react"; // Importa React y hook useMemo para optimización
import { Checkbox } from "@mui/material"; // Importa Checkbox de Material UI

/**
 * Componente que muestra una tarjeta de destino turístico.
 * Se pinta con el color del paquete seleccionado si corresponde,
 * y con color azul si fue seleccionado manualmente.
 */
const DestinationCard = ({
  destination, // Objeto con datos del destino turístico
  isSelected, // Booleano que indica si está seleccionado
  onToggle, // Función que cambia el estado de selección
  currentPrice, // Precio actual mostrado en la tarjeta
  index, // Índice para mostrar número en tarjeta
  colorClase, // Color del paquete, ejemplo: 'blue', 'violet', etc.
}) => {
  // Mapa de estilos para cada color/paquete
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
    cyan: {
      border: "border-cyan-500",
      bg: "bg-cyan-50",
      ring: "ring-cyan-400/40",
      text: "text-cyan-500",
      checkboxColor: "#06b6d4",
      checkboxChecked: "#0891b2",
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

  // Memoiza el color seleccionado para evitar recalcularlo en cada render innecesariamente
  const selectedColor = useMemo(() => {
    if (!isSelected) return colorMap.white; // No seleccionado: blanco
    if (colorClase && colorMap[colorClase]) {
      return colorMap[colorClase]; // Paquete con color válido
    }
    return colorMap.blue; // Selección manual sin paquete: azul
  }, [isSelected, colorClase]);

  // Desestructuramos los estilos para uso más limpio en JSX
  const { border, bg, ring, text, checkboxColor, checkboxChecked } =
    selectedColor;

  return (
    // Contenedor principal con estilos dinámicos y eventos
    <div
      className={`relative p-4 pl-14 rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md duration-200 
        ${border} ${bg} ${ring}`}
      onClick={onToggle} // Toggle de selección al hacer click en la tarjeta
      role="button" // Para accesibilidad como botón
      tabIndex={0} // Para enfoque con teclado
      onKeyDown={(e) => {
        // Maneja selección con tecla Enter o Space
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Número grande y animado a la izquierda */}
      <div
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-extrabold font-orbitron transition-all duration-300 
          ${isSelected ? `${text} animate-glow` : "text-gray-300"}`}
      >
        {index + 1}
      </div>

      {/* Contenedor flex para imagen, texto y checkbox */}
      <div className="flex items-center space-x-4">
        {/* Imagen con sombra interna y tamaño fijo */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            loading="lazy" // Carga diferida para mejor performance
            decoding="async" // Decodificación asincrónica para mejorar renderizado
          />
        </div>

        {/* Texto con nombre y precio */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-base">
            {destination.name}
          </h3>
          <p className="text-sm text-blue-600 font-bold mt-1">
            ¥{currentPrice}
          </p>
        </div>

        {/* Checkbox personalizado con color dinámico */}
        <Checkbox
          checked={isSelected}
          onClick={(e) => e.stopPropagation()} // Evita toggle por doble evento click
          onChange={onToggle} // Cambia estado al marcar/desmarcar
          sx={{
            color: checkboxColor,
            "&.Mui-checked": {
              color: checkboxChecked,
            },
          }}
          inputProps={{
            "aria-label": `Select destination ${destination.name}`,
          }} // Accesibilidad
        />
      </div>
    </div>
  );
};

export default DestinationCard;
