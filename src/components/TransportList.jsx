import React, { useCallback, useState } from "react";
import TransportSelector from "./TransportSelector";
import { transports } from "../mock/transports";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Componente que muestra la lista de transportes.
 * Permite mostrar una cantidad limitada o todos, con botón de "Mostrar más/menos".
 * También maneja los precios manuales para cada transporte,
 * que se reciben y actualizan desde el componente padre (App.jsx).
 *
 * Props:
 * - transportDays: objeto con días seleccionados por transporte { transportId: days }
 * - updateTransportDays: función para actualizar días seleccionados
 * - handleAirportServiceChange: función que recibe datos de envío/recojo y precios manuales
 * - manualTransportPrices: estado externo con precios manuales { transportId: { isManual, price } }
 * - setManualTransportPrices: setter para actualizar precios manuales en el estado externo
 * - isManualTransportActive: flag boolean para activar modo manual global (opcional)
 * - setIsManualTransportActive: setter para activar/desactivar modo manual global (opcional)
 */
const TransportList = ({
  transportDays,
  updateTransportDays,
  handleAirportServiceChange,
  manualTransportPrices,
  setManualTransportPrices,
  isManualTransportActive,
  setIsManualTransportActive,
}) => {
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 2;

  /**
   * Actualiza precios manuales para un transporte dado
   * Solo actualiza si hay cambios reales para evitar renders innecesarios
   */
  const handleManualPriceChange = useCallback(
    (transportId, isManual, price) => {
      setManualTransportPrices((prev) => {
        const prevEntry = prev[transportId];
        if (
          prevEntry &&
          prevEntry.isManual === isManual &&
          prevEntry.price === price
        ) {
          return prev; // No cambia nada
        }
        return {
          ...prev,
          [transportId]: { isManual, price },
        };
      });
    },
    [setManualTransportPrices]
  );

  /**
   * Manejador general que recibe datos de cada TransportSelector
   * Actualiza precios manuales y pasa otros datos al padre
   */
  const handleTransportDataChange = useCallback(
    (data) => {
      // Actualizar precios manuales si vienen en data
      if (data.useManualPrice !== undefined && data.manualPrice !== undefined) {
        handleManualPriceChange(
          data.transportId,
          data.useManualPrice,
          data.manualPrice
        );
      }
      // Pasar también la info al padre para que maneje envío, recojo, etc.
      if (handleAirportServiceChange) {
        handleAirportServiceChange(data);
      }
    },
    [handleManualPriceChange, handleAirportServiceChange]
  );

  // Transportes a mostrar, limitado o todos según estado showAll
  const displayedTransports = showAll
    ? transports
    : transports.slice(0, VISIBLE_COUNT);

  return (
    <section>
      <div
        data-aos="fade-up"
        className="bg-gradient-to-br from-purple-100 via-white to-purple-200 shadow-lg p-6 rounded-2xl border border-purple-300"
      >
        <AnimatePresence initial={false}>
          {displayedTransports.map((transport) => (
            <motion.div
              key={transport.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <TransportSelector
                transport={transport}
                selectedDays={transportDays[transport.id] || 0}
                onDaysChange={(days) => updateTransportDays(transport.id, days)}
                onAirportServiceChange={handleTransportDataChange}
                manualInfo={
                  manualTransportPrices[transport.id] || {
                    isManual: false,
                    price: "",
                  }
                }
                // Opcional: pasar flags de modo manual global si los usas
                isManualTransportActive={isManualTransportActive}
                setIsManualTransportActive={setIsManualTransportActive}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {transports.length > VISIBLE_COUNT && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-2 px-6 rounded-lg hover:bg-gradient-to-l transition-colors duration-300"
            aria-expanded={showAll}
          >
            {showAll ? "Mostrar menos" : "Mostrar más"}
          </button>
        </div>
      )}
    </section>
  );
};

export default TransportList;
