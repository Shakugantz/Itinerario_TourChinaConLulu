import React from "react";

const DestinationCard = ({
  destination, // Objeto con datos del destino (nombre, id, etc.)
  isSelected, // Booleano que indica si el destino está seleccionado
  onToggle, // Función para alternar selección al hacer click
  currentPrice, // Precio actual del destino (depende de temporada)
}) => {
  return (
    // Contenedor principal, cambia estilos si está seleccionado o no
    <div
      className={`p-4 border rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md duration-200 ${
        isSelected
          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-400/40" // Estilos cuando está seleccionado
          : "border-gray-200 hover:border-gray-300 bg-white" // Estilos normales y hover
      }`}
      onClick={onToggle} // Maneja click para alternar selección
    >
      <div className="flex items-center space-x-4">
        {/* Imagen del destino en un contenedor redondeado */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
          <img
            src={destination.image} // Ruta correcta de la imagen
            alt={destination.name} // Texto alternativo para accesibilidad
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nombre del destino y precio actual con estilos destacados */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-base">
            {destination.name}
          </h3>
          <p className="text-sm text-blue-600 font-bold mt-1">
            ${currentPrice}
          </p>
        </div>

        {/* Checkbox visual con color personalizado */}
        <input
          type="checkbox"
          checked={isSelected}
          // Prevenir que el click en el checkbox propague el evento al div padre
          onClick={(e) => e.stopPropagation()}
          onChange={onToggle}
          className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
        />
      </div>
    </div>
  );
};

export default DestinationCard;
