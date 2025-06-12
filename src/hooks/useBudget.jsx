import { useMemo, useRef, useEffect } from "react";
import { destinations } from "../mock/destinations";
import { transports } from "../mock/transports";
import { guidePrices } from "../mock/guides";

/**
 * useBudget
 * Hook personalizado que calcula el presupuesto total considerando:
 * - Costos de destinos seleccionados (por temporada y cantidad de personas).
 * - Costos de transporte usando precios manuales si están activos, o precios diarios estándar.
 * - Costo de guía (manual o automático según configuración).
 * - Servicios de aeropuerto (envío y recojo).
 * - Costos extras y presupuesto restante.
 *
 * @param {Object} params
 * @param {string[]} params.selectedDestinations - IDs de destinos seleccionados.
 * @param {boolean} params.isHighSeason - Indica si es temporada alta.
 * @param {number} params.peopleCount - Número de personas.
 * @param {Object} params.transportDays - { transportId: días asignados }.
 * @param {Object} params.manualTransportPrices - { transportId: { isManual, price } }.
 * @param {number} params.guideDays - Días que se usará guía.
 * @param {Object} params.manualGuide - { days, price } con precio manual guía.
 * @param {boolean} params.isManualGuideActive - Flag si el precio manual del guía está activo.
 * @param {Object} params.airportServicePricesByTransport - { transportId: { envioPrice, recojoPrice } }.
 * @param {number|string} params.extraCosts - Costos extra a sumar.
 * @param {number|string} params.remainingBudget - Presupuesto restante a restar.
 *
 * @returns {Object} Cálculos desglosados y totales en CNY, USD y EUR.
 */
function useBudget({
  selectedDestinations,
  isHighSeason,
  peopleCount,
  transportDays,
  manualTransportPrices, // Objeto { transportId: { isManual, price } }
  guideDays,
  manualGuide,
  isManualGuideActive,
  airportServicePricesByTransport,
  extraCosts,
  remainingBudget,
}) {
  // Guarda la referencia previa de manualGuide para detectar cambios
  const prevManualGuideRef = useRef(manualGuide);

  useEffect(() => {
    if (manualGuide !== prevManualGuideRef.current) {
      prevManualGuideRef.current = manualGuide;
    }
  }, [manualGuide]);

  return useMemo(() => {
    // 1. Cálculo del costo por destinos seleccionados (multiplicado por número de personas)
    const entries =
      selectedDestinations.reduce((sum, destId) => {
        const dest = destinations.find((d) => d.id === destId);
        if (!dest) return sum;
        return (
          sum + (isHighSeason ? dest.highSeasonPrice : dest.lowSeasonPrice)
        );
      }, 0) * peopleCount;

    // 2. Cálculo transporte, usa precio manual si está activo y válido, si no precio estándar diario
    const transport = Object.entries(transportDays).reduce(
      (sum, [id, days]) => {
        // Asegurar que el id sea string para comparar con manualTransportPrices
        const idStr = String(id);

        // Buscar transporte con id numérico para obtener precio diario
        const t = transports.find((t) => t.id === Number(idStr));
        if (!t) return sum;

        const manualInfo = manualTransportPrices?.[idStr];
        const isManual = manualInfo?.isManual;
        const manualPrice = Number(manualInfo?.price);

        const priceToUse =
          isManual && !isNaN(manualPrice) && manualPrice >= 0
            ? manualPrice
            : t.dailyPrice;

        return sum + priceToUse * days;
      },
      0
    );

    // 3. Cálculo del costo de guía (manual o automático)
    let guide = 0;
    if (
      isManualGuideActive &&
      manualGuide &&
      typeof manualGuide.days === "number" &&
      manualGuide.price !== undefined &&
      manualGuide.price !== null
    ) {
      const priceNum = Number(manualGuide.price);
      guide =
        !isNaN(priceNum) && priceNum >= 0 ? manualGuide.days * priceNum : 0;
    } else {
      const guideRate = guidePrices.find(
        (g) => peopleCount >= g.minPeople && peopleCount <= g.maxPeople
      );
      guide = guideRate ? guideRate.dailyRate * guideDays : 0;
    }

    // 4. Servicios de aeropuerto: suma de envío y recojo de todos los transportes
    const airport = Object.values(airportServicePricesByTransport).reduce(
      (sum, s) => sum + (s.envioPrice || 0) + (s.recojoPrice || 0),
      0
    );

    const extraCostsNum = Number(extraCosts) || 0;
    const remainingBudgetNum = Number(remainingBudget) || 0;

    // Total general en CNY (con dos decimales)
    const totalCNY = Number(
      (
        entries +
        transport +
        guide +
        airport +
        extraCostsNum -
        remainingBudgetNum
      ).toFixed(2)
    );

    // Conversiones aproximadas a USD y EUR
    const totalUSD = Number((totalCNY / 7).toFixed(2));
    const totalEUR = Number((totalCNY / 7.5).toFixed(2));

    return {
      entries,
      transport,
      guide,
      airport,
      extraCosts: extraCostsNum,
      remainingBudget: remainingBudgetNum,
      totalCNY,
      totalUSD,
      totalEUR,
    };
  }, [
    selectedDestinations,
    isHighSeason,
    peopleCount,
    transportDays,
    manualTransportPrices,
    guideDays,
    manualGuide,
    isManualGuideActive,
    airportServicePricesByTransport,
    extraCosts,
    remainingBudget,
  ]);
}

export default useBudget;
