import React from "react";

/**
 * Componente que muestra una tarjeta de destino turístico.
 * Incluye un número secuencial decorativo, imagen, nombre, precio y checkbox de selección.
 */
const DestinationCard = ({
  destination, // Objeto que contiene datos del destino (nombre, imagen, id)
  isSelected, // Booleano: indica si esta tarjeta está seleccionada
  onToggle, // Función que se ejecuta al hacer clic en la tarjeta o checkbox
  currentPrice, // Precio actual del destino según la temporada
  index, // Índice numérico del destino (para mostrar el número decorativo)
}) => {
  return (
    // Contenedor principal de la tarjeta con estilos dinámicos si está seleccionada
    <div
      className={`relative p-4 pl-14 border rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md duration-200 ${
        isSelected
          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-400/40"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
      onClick={onToggle} // Maneja el clic para alternar la selección
    >
      {/* Número decorativo a la izquierda */}
      <div
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-extrabold font-orbitron transition-all duration-300 ${
          isSelected
            ? "text-blue-500 animate-glow" // Color y animación si está seleccionado
            : "text-gray-300"
        }`}
      >
        {index + 1}
      </div>

      {/* Contenido de la tarjeta: imagen + texto + checkbox */}
      <div className="flex items-center space-x-4">
        {/* Imagen del destino */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nombre y precio del destino */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-base">
            {destination.name}
          </h3>
          <p className="text-sm text-blue-600 font-bold mt-1">
            ${currentPrice}
          </p>
        </div>

        {/* Checkbox para seleccionar el destino */}
        <input
          type="checkbox"
          checked={isSelected}
          onClick={(e) => e.stopPropagation()} // Evita propagar el clic al div padre
          onChange={onToggle}
          className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
        />
      </div>
    </div>
  );
};

export default DestinationCard;
