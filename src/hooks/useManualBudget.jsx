import { useMemo } from "react";
import { destinations } from "../mock/destinations";

/**
 * useManualBudget
 * ----------------------------------------
 * Hook personalizado para calcular el resumen financiero del segundo tab.
 *
 * Cálculos:
 * - Costo Real: suma de precios por temporada de los destinos seleccionados,
 *   más transporte, guía y costos manuales adicionales.
 * - Cotización Cliente: se recibe como prop externa.
 * - Rentabilidad: cotización - costo real.
 * - Porcentaje de ganancia: (rentabilidad / cotización) * 100.
 *
 * @param {Object} params
 * @param {number[]} selectedDestinationsManual - IDs de destinos seleccionados.
 * @param {number|string} transportManual - Costo manual transporte.
 * @param {number|string} guiaManual - Costo manual guía.
 * @param {number|string} extraCosts - Costos manuales extras.
 * @param {number|string} remainingBudget - Presupuesto restante manual.
 * @param {number} cotizacionCliente - Total del primer tab (para comparación).
 * @param {boolean} isHighSeason - Flag para temporada alta/baja.
 *
 * @returns {Object} { costoReal, cotizacion, rentabilidad, porcentaje }
 */
export default function useManualBudget({
  selectedDestinationsManual,
  transportManual,
  guiaManual,
  extraCosts,
  remainingBudget,
  cotizacionCliente,
  isHighSeason,
  peopleCountManual = 1, // ← nuevo parámetro
}) {
  return useMemo(() => {
    // Sumar precios por temporada de destinos seleccionados multiplicados por personas
    const destinosCosto = selectedDestinationsManual.reduce((sum, id) => {
      const destino = destinations.find((d) => d.id === id);
      if (!destino) return sum;
      const precio = isHighSeason
        ? destino.highSeasonPriceManual || 0
        : destino.lowSeasonPriceManual || 0;
      return sum + precio * peopleCountManual; // multiplicar aquí
    }, 0);

    // Parsear a número seguro
    const transporte = Number(transportManual) || 0;
    const guia = Number(guiaManual) || 0;
    const extras = Number(extraCosts) || 0;
    const restante = Number(remainingBudget) || 0;

    const costoReal = destinosCosto + transporte + guia + extras - restante;
    const rentabilidad = cotizacionCliente - costoReal;
    const porcentaje =
      cotizacionCliente > 0 ? (rentabilidad / cotizacionCliente) * 100 : 0;

    return {
      costoReal,
      cotizacion: cotizacionCliente,
      rentabilidad,
      porcentaje,
    };
  }, [
    selectedDestinationsManual,
    transportManual,
    guiaManual,
    extraCosts,
    remainingBudget,
    cotizacionCliente,
    isHighSeason,
    peopleCountManual, // agregar dependencia
  ]);
}
