import React from "react";

// Componente selector para elegir un aeropuerto y mostrar su precio si aplica
const AirportServiceSelector = ({
  label, // Etiqueta que se muestra encima del selector
  value, // Valor actualmente seleccionado
  onChange, // Función que se ejecuta cuando el usuario cambia la selección
  airportPrices, // Objeto con precios por aeropuerto (envío o recojo)
  airports, // Lista de aeropuertos disponibles [{ value, name }]
}) => (
  <div>
    {/* Etiqueta del selector */}
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
    </label>

    {/* Selector de aeropuerto */}
    <select
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label={label}
    >
      {/* Opción por defecto */}
      <option value="">Seleccione aeropuerto</option>

      {/* Opciones dinámicas basadas en la lista de aeropuertos */}
      {airports?.map((airport) => (
        <option key={airport.value} value={airport.value}>
          {airport.name}
        </option>
      ))}
    </select>

    {/* Muestra el precio si hay un valor seleccionado y tiene precio mayor a 0 */}
    {value && airportPrices?.[value] > 0 && (
      <p className="text-sm text-blue-600 mt-1 font-medium">
        Precio: ¥{airportPrices[value]}
      </p>
    )}
  </div>
);

// Exporta el componente para ser usado en otros lugares
export default AirportServiceSelector;
