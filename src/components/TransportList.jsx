import React, { useState } from "react";
import TransportSelector from "./TransportSelector";
import { transports } from "../mock/transports"; // Importa tu arreglo de transportes

/**
 * Componente para mostrar la lista de transportes con botón Mostrar más / Mostrar menos
 */
const TransportList = ({
  transportDays,
  updateTransportDays,
  handleAirportServiceChange,
}) => {
  // Estado para controlar si la lista está expandida o no
  const [expanded, setExpanded] = useState(false);

  // Cuántos transportes mostrar cuando NO está expandido
  const VISIBLE_COUNT = 2;

  // Transportes a mostrar según el estado expanded
  const displayedTransports = expanded
    ? transports
    : transports.slice(0, VISIBLE_COUNT);

  return (
    <section>
      <div className="space-y-3">
        {displayedTransports.map((transport) => (
          <TransportSelector
            key={transport.id}
            transport={transport}
            selectedDays={transportDays[transport.id] || 0}
            onDaysChange={(days) => updateTransportDays(transport.id, days)}
            onAirportServiceChange={handleAirportServiceChange}
          />
        ))}
      </div>

      {/* Botón Mostrar más / Mostrar menos */}
      {transports.length > VISIBLE_COUNT && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-2 px-6 rounded-lg hover:bg-gradient-to-l transition-colors duration-300"
            aria-expanded={expanded}
          >
            {expanded ? "Mostrar menos" : "Mostrar más"}
          </button>
        </div>
      )}
    </section>
  );
};

export default TransportList;
