import React, { useState, useMemo } from "react";
import DestinationCard from "./DestinationCard";
import { AnimatePresence, motion } from "framer-motion";

const DestinationList = ({
  destinations = [],
  selectedDestinations,
  toggleDestination,
  paquetes,
  paquete1Ids,
  paquete2Ids,
  paquete3Ids,
  paquete4Ids,
  paquete5Ids,
  isHighSeason,
  useManualPrices = false,
}) => {
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 7;

  const displayedDestinations = useMemo(() => {
    const safeDestinations = Array.isArray(destinations) ? destinations : [];
    return showAll
      ? safeDestinations
      : safeDestinations.slice(0, VISIBLE_COUNT);
  }, [showAll, destinations]);

  const paqueteColorMap = useMemo(
    () => ({
      paquete1: "green",
      paquete2: "violet",
      paquete3: "pink",
      paquete4: "yellow",
      paquete5: "cyan",
    }),
    []
  );

  const getColorClaseForDestino = (id) => {
    if (paquetes?.paquete1 && paquete1Ids?.includes(id))
      return paqueteColorMap.paquete1;
    if (paquetes?.paquete2 && paquete2Ids?.includes(id))
      return paqueteColorMap.paquete2;
    if (paquetes?.paquete3 && paquete3Ids?.includes(id))
      return paqueteColorMap.paquete3;
    if (paquetes?.paquete4 && paquete4Ids?.includes(id))
      return paqueteColorMap.paquete4;
    if (paquetes?.paquete5 && paquete5Ids?.includes(id))
      return paqueteColorMap.paquete5;
    return null;
  };

  const isInActivePackage = (id) =>
    (paquetes?.paquete1 && paquete1Ids?.includes(id)) ||
    (paquetes?.paquete2 && paquete2Ids?.includes(id)) ||
    (paquetes?.paquete3 && paquete3Ids?.includes(id)) ||
    (paquetes?.paquete4 && paquete4Ids?.includes(id)) ||
    (paquetes?.paquete5 && paquete5Ids?.includes(id));

  return (
    <div
      data-aos="fade-up"
      className="bg-gradient-to-br from-purple-100 via-white to-purple-200 shadow-lg p-6 rounded-2xl border border-purple-300"
    >
      <div className="space-y-3 overflow-hidden">
        <AnimatePresence initial={false}>
          {displayedDestinations.map((destination, idx) => {
            const price = isHighSeason
              ? useManualPrices
                ? destination.highSeasonPriceManual
                : destination.highSeasonPrice
              : useManualPrices
              ? destination.lowSeasonPriceManual
              : destination.lowSeasonPrice;

            return (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <DestinationCard
                  destination={destination}
                  isSelected={selectedDestinations.includes(destination.id)}
                  onToggle={() => toggleDestination(destination.id)}
                  currentPrice={price}
                  disabled={isInActivePackage(destination.id)}
                  colorClase={getColorClaseForDestino(destination.id)}
                  index={idx}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {destinations.length > VISIBLE_COUNT && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-2 px-6 rounded-lg hover:bg-gradient-to-l transition-colors duration-300"
            aria-expanded={showAll}
            aria-label={
              showAll ? "Mostrar menos destinos" : "Mostrar más destinos"
            }
          >
            {showAll ? "Mostrar menos" : "Mostrar más"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationList;
