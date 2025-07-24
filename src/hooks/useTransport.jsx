import { useState, useCallback } from "react";

export default function useTransport() {
  // Define los estados iniciales para el transporte
  // Es una buena práctica tener estas constantes para facilitar los reseteos
  const initialTransportDays = {};
  const initialAirportServicePricesByTransport = {};

  // Estado para almacenar días seleccionados por cada transporte
  const [transportDays, setTransportDays] = useState(initialTransportDays);

  // Estado para almacenar precios de servicios aeropuerto y flags por transporte
  const [airportServicePricesByTransport, setAirportServicePricesByTransport] =
    useState(initialAirportServicePricesByTransport);

  /**
   * Actualiza los días asignados a un transporte específico.
   * Memoizado para evitar recreación en cada render.
   * @param {string} transportId - Identificador único del transporte.
   * @param {number} days - Número de días asignados.
   */
  const updateTransportDays = useCallback((transportId, days) => {
    setTransportDays((prev) => ({ ...prev, [transportId]: days }));
  }, []);

  const handleAirportServiceChange = useCallback(
    ({
      transportId,
      envioPrice,
      recojoPrice,
      useManualPrice = false,
      manualPrice = 0,
    }) => {
      setAirportServicePricesByTransport((prev) => {
        const prevPrices = prev[transportId] || {};
        // Solo actualizar si hubo cambio real para evitar renders innecesarios
        if (
          prevPrices.envioPrice === envioPrice &&
          prevPrices.recojoPrice === recojoPrice &&
          prevPrices.useManualPrice === useManualPrice &&
          prevPrices.manualPrice === manualPrice
        ) {
          return prev;
        }
        return {
          ...prev,
          [transportId]: {
            envioPrice,
            recojoPrice,
            useManualPrice,
            manualPrice,
          },
        };
      });
    },
    []
  );

  /**
   * Restablece todos los estados internos de transporte a sus valores iniciales.
   * Esto asegura que el hook se pueda limpiar de forma controlada.
   * Memoizado para evitar recreación en cada render.
   */
  const resetTransportState = useCallback(() => {
    setTransportDays(initialTransportDays);
    setAirportServicePricesByTransport(initialAirportServicePricesByTransport);
  }, []); // Dependencias vacías porque las inicializaciones son constantes

  return {
    transportDays,
    updateTransportDays,
    airportServicePricesByTransport,
    handleAirportServiceChange,
    resetTransportState, // <--- ¡Exporta la nueva función de reinicio!
  };
}
