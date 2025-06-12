import { useState, useCallback } from "react";

/**
 * useTransport
 * Hook personalizado para manejar la lógica relacionada con:
 * - Días asignados por cada tipo de transporte.
 * - Precios de servicios de aeropuerto (envío y recojo) asociados a cada transporte.
 * - Precio manual y bandera para usar precio manual por transporte.
 *
 * Estados internos:
 * - transportDays: Objeto con días asignados a cada transporte, e.g. { "van": 3, "taxi": 1 }
 * - airportServicePricesByTransport: Objeto con precios y flags por transporte, e.g.
 *   {
 *     "van": {
 *       envioPrice: 50,
 *       recojoPrice: 40,
 *       useManualPrice: true,
 *       manualPrice: 100
 *     },
 *     "taxi": { ... }
 *   }
 *
 * Métodos expuestos:
 * - updateTransportDays: Actualiza los días asignados para un transporte dado.
 * - handleAirportServiceChange: Actualiza los precios y flags de servicios aeropuerto para un transporte dado.
 */
export default function useTransport() {
  // Estado para almacenar días seleccionados por cada transporte
  const [transportDays, setTransportDays] = useState({});

  // Estado para almacenar precios de servicios aeropuerto y flags por transporte
  const [airportServicePricesByTransport, setAirportServicePricesByTransport] =
    useState({});

  /**
   * Actualiza los días asignados a un transporte específico.
   * Memoizado para evitar recreación en cada render.
   * @param {string} transportId - Identificador único del transporte.
   * @param {number} days - Número de días asignados.
   */
  const updateTransportDays = useCallback((transportId, days) => {
    setTransportDays((prev) => ({ ...prev, [transportId]: days }));
  }, []);

  /**
   * Actualiza los precios de servicios de aeropuerto (envío y recojo) para un transporte,
   * así como la información del precio manual y bandera para usarlo.
   * Evita actualizar el estado si no hay cambios para prevenir re-render innecesario.
   * Memoizado para evitar recreación en cada render.
   *
   * @param {Object} param0
   * @param {string} param0.transportId - ID del transporte.
   * @param {number} param0.envioPrice - Precio de envío al aeropuerto.
   * @param {number} param0.recojoPrice - Precio de recojo del aeropuerto.
   * @param {boolean} [param0.useManualPrice=false] - Flag para usar precio manual.
   * @param {number} [param0.manualPrice=0] - Precio manual asignado.
   */
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

  return {
    transportDays,
    updateTransportDays,
    airportServicePricesByTransport,
    handleAirportServiceChange,
  };
}
