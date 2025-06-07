import React, { useState } from "react";
import DestinationCard from "./DestinationCard";
import { AnimatePresence, motion } from "framer-motion"; // Librería para animaciones suaves

/**
 * Lista de destinos turísticos con opción de mostrar más o menos.
 * Aplica animaciones suaves al expandir o contraer la lista usando Framer Motion.
 */
const DestinationList = ({
  destinations, // Lista de todos los destinos disponibles
  selectedDestinations, // IDs de destinos seleccionados manualmente
  toggleDestination, // Función para alternar selección individual
  paquetes, // Estado de selección de paquetes (paquete1, paquete2, etc.)
  paquete1Ids, // IDs de destinos que pertenecen al paquete 1
  paquete2Ids, // IDs de destinos que pertenecen al paquete 2
  paquete3Ids, // IDs de destinos que pertenecen al paquete 3
  paquete4Ids, // IDs de destinos que pertenecen al paquete 4
  isHighSeason, // Temporada alta o baja para cambiar el precio
}) => {
  const [showAll, setShowAll] = useState(false); // Controla si se muestran todos los destinos o solo algunos

  const VISIBLE_COUNT = 6; // Número de destinos visibles por defecto

  // Determina los destinos que deben mostrarse (todos o los primeros 6)
  const displayedDestinations = showAll
    ? destinations
    : destinations.slice(0, VISIBLE_COUNT);

  // Asocia cada paquete a un color para las tarjetas
  const paqueteColorMap = {
    paquete1: "green",
    paquete2: "violet",
    paquete3: "pink",
    paquete4: "yellow",
  };

  /**
   * Obtiene la clase de color correspondiente para un destino específico,
   * solo si el paquete está activo y el destino pertenece a él.
   */
  const getColorClaseForDestino = (id) => {
    if (paquetes.paquete1 && paquete1Ids.includes(id)) return "green";
    if (paquetes.paquete2 && paquete2Ids.includes(id)) return "violet";
    if (paquetes.paquete3 && paquete3Ids.includes(id)) return "pink";
    if (paquetes.paquete4 && paquete4Ids.includes(id)) return "yellow";
    return null; // Si no pertenece a ningún paquete activo
  };

  /**
   * Verifica si un destino está bloqueado por pertenecer a un paquete activo
   * (para prevenir selección manual mientras un paquete está activo).
   */
  const isInActivePackage = (id) =>
    (paquetes.paquete1 && paquete1Ids.includes(id)) ||
    (paquetes.paquete2 && paquete2Ids.includes(id)) ||
    (paquetes.paquete3 && paquete3Ids.includes(id)) ||
    (paquetes.paquete4 && paquete4Ids.includes(id));

  return (
    <div>
      {/* Lista animada de destinos */}
      <div className="space-y-3 overflow-hidden">
        <AnimatePresence initial={false}>
          {displayedDestinations.map((destination, idx) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }} // Animación al aparecer
              animate={{ opacity: 1, y: 0 }} // Estado visible
              exit={{ opacity: 0, y: -20 }} // Animación al desaparecer
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

      {/* Botón para expandir o contraer la lista de destinos */}
      {destinations.length > VISIBLE_COUNT && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-2 px-6 rounded-lg hover:bg-gradient-to-l transition-colors duration-300"
            aria-expanded={showAll} // Atributo accesible que indica si la sección está expandida
          >
            {showAll ? "Mostrar menos" : "Mostrar más"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationList;
