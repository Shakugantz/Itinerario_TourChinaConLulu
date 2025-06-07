import React, { useState } from "react";
import DestinationCard from "./DestinationCard";

const DestinationList = ({
  destinations,
  selectedDestinations,
  toggleDestination,
  paquetes,
  paquete1Ids,
  paquete2Ids,
  paquete3Ids,
  paquete4Ids,
  isHighSeason,
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedDestinations = showAll
    ? destinations
    : destinations.slice(0, 3);

  // Mapeo de colores por nombre de paquete
  const paqueteColorMap = {
    paquete1: "green",
    paquete2: "violet",
    paquete3: "pink",
    paquete4: "yellow",
  };

  // Construye un mapa destinoId → colorClase (solo si el paquete está activo)
  const getColorClaseForDestino = (id) => {
    if (paquetes.paquete1 && paquete1Ids.includes(id)) return "green";
    if (paquetes.paquete2 && paquete2Ids.includes(id)) return "violet";
    if (paquetes.paquete3 && paquete3Ids.includes(id)) return "pink";
    if (paquetes.paquete4 && paquete4Ids.includes(id)) return "yellow";
    return null;
  };

  const isInActivePackage = (id) =>
    (paquetes.paquete1 && paquete1Ids.includes(id)) ||
    (paquetes.paquete2 && paquete2Ids.includes(id)) ||
    (paquetes.paquete3 && paquete3Ids.includes(id)) ||
    (paquetes.paquete4 && paquete4Ids.includes(id));

  return (
    <div>
      <div className="space-y-3">
        {displayedDestinations.map((destination, idx) => (
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
            disabled={isInActivePackage(destination.id)}
            colorClase={getColorClaseForDestino(destination.id)}
            index={idx}
          />
        ))}
      </div>

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
