import React, { useState } from "react";
import DestinationCard from "./DestinationCard";

const DestinationList = ({
  destinations,
  selectedDestinations,
  toggleDestination,
  paquetes,
  paquete1Ids,
  paquete2Ids,
  isHighSeason,
}) => {
  // Estado para controlar mostrar más o menos destinos
  const [showAll, setShowAll] = useState(false);

  // Determina qué destinos mostrar según showAll
  const displayedDestinations = showAll
    ? destinations
    : destinations.slice(0, 3);

  return (
    <div>
      <div className="space-y-3">
        {displayedDestinations.map((destination) => {
          // Chequea si el destino está en paquete activo (para deshabilitar toggle)
          const inActivePackage =
            (paquetes.paquete1 && paquete1Ids.includes(destination.id)) ||
            (paquetes.paquete2 && paquete2Ids.includes(destination.id));

          return (
            <DestinationCard
              key={destination.id}
              destination={destination}
              isSelected={selectedDestinations.includes(destination.id)}
              onToggle={() => toggleDestination(destination.id)}
              currentPrice={
                isHighSeason
                  ? destination.highSeasonPrice
                  : destination.lowSeasonPrice
              }
              disabled={inActivePackage}
            />
          );
        })}
      </div>

      {/* Botón para mostrar más / menos si hay más de 3 destinos */}
      {destinations.length > 3 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-2 px-6 rounded-lg hover:bg-gradient-to-l transition-colors duration-300"
          >
            {showAll ? "Mostrar menos" : "Mostrar más"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationList;
