import React, { useState, useMemo } from "react";
import DestinationCard from "./DestinationCard";
import { AnimatePresence, motion } from "framer-motion"; // Animaciones suaves

/**
 * Lista de destinos turísticos con opción de mostrar más o menos.
 * Aplica animaciones al expandir o contraer la lista usando Framer Motion.
 */
const DestinationList = ({
  destinations, // Array con todos los destinos
  selectedDestinations, // Array de IDs seleccionados manualmente
  toggleDestination, // Función para alternar selección individual
  paquetes, // Estado objeto de selección de paquetes (paquete1, paquete2, ...)
  paquete1Ids, // IDs que pertenecen a paquete 1
  paquete2Ids, // IDs que pertenecen a paquete 2
  paquete3Ids, // IDs que pertenecen a paquete 3
  paquete4Ids, // IDs que pertenecen a paquete 4
  paquete5Ids, // IDs que pertenecen a paquete 5
  isHighSeason, // Booleano para temporada alta o baja (afecta precio)
}) => {
  const [showAll, setShowAll] = useState(false); // Control para mostrar todos o solo algunos

  const VISIBLE_COUNT = 6; // Número visible por defecto

  // Memoiza el arreglo de destinos mostrados para no recalcular en cada render
  const displayedDestinations = useMemo(() => {
    return showAll ? destinations : destinations.slice(0, VISIBLE_COUNT);
  }, [showAll, destinations]);

  // Mapa de colores para paquetes (puede extenderse fácilmente)
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

  /**
   * Devuelve el color correspondiente a un destino
   * según si pertenece a un paquete activo.
   */
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

  /**
   * Indica si un destino está bloqueado por estar en un paquete activo,
   * para evitar selección manual cuando paquete está activo.
   */
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
      {/* Lista animada de destinos con Framer Motion */}
      <div className="space-y-3 overflow-hidden">
        <AnimatePresence initial={false}>
          {displayedDestinations.map((destination, idx) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }} // Animación entrada
              animate={{ opacity: 1, y: 0 }} // Estado visible
              exit={{ opacity: 0, y: -20 }} // Animación salida
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <DestinationCard
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Botón para mostrar más o menos destinos */}
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
