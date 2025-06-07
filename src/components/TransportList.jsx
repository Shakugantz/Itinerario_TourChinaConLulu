import React, { useState } from "react";
import TransportSelector from "./TransportSelector";
import { transports } from "../mock/transports";
import { AnimatePresence, motion } from "framer-motion"; // Animaciones suaves

/**
 * Componente que muestra una lista de opciones de transporte.
 * Permite mostrar más o menos elementos con animación.
 */
const TransportList = ({
  transportDays, // Días seleccionados por transporte (objeto con IDs)
  updateTransportDays, // Función para actualizar los días de cada transporte
  handleAirportServiceChange, // Función para alternar servicio de aeropuerto
}) => {
  const [showAll, setshowAll] = useState(false); // Control de expansión

  const VISIBLE_COUNT = 3; // Máximo visible por defecto

  // Transportes visibles dependiendo del estado
  const displayedTransports = showAll
    ? transports
    : transports.slice(0, VISIBLE_COUNT);

  return (
    <section>
      {/* Lista animada de transportes */}
      <div className="space-y-3 overflow-hidden">
        <AnimatePresence initial={false}>
          {displayedTransports.map((transport) => (
            <motion.div
              key={transport.id}
              initial={{ opacity: 0, y: 20 }} // Aparece desde abajo
              animate={{ opacity: 1, y: 0 }} // A estado visible
              exit={{ opacity: 0, y: -20 }} // Desaparece hacia arriba
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <TransportSelector
                transport={transport}
                selectedDays={transportDays[transport.id] || 0}
                onDaysChange={(days) => updateTransportDays(transport.id, days)}
                onAirportServiceChange={handleAirportServiceChange}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Botón Mostrar más / Mostrar menos */}
      {transports.length > VISIBLE_COUNT && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setshowAll(!showAll)}
            className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-2 px-6 rounded-lg hover:bg-gradient-to-l transition-colors duration-300"
            aria-expanded={showAll} // Atributo de accesibilidad para indicar estado
          >
            {showAll ? "Mostrar menos" : "Mostrar más"}
          </button>
        </div>
      )}
    </section>
  );
};

export default TransportList;
