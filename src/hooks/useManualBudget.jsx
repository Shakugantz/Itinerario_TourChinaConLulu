import { useMemo } from "react";
import { destinations } from "../mock/destinations";

/**
 * useManualBudget
 * ----------------------------------------
 * Hook personalizado para calcular el resumen financiero del segundo tab.
 *
 * Cálculos:
 * - Costo Real: suma de precios por temporada de los destinos seleccionados,
 * más transporte, guía y costos manuales adicionales.
 * - Cotización: se recibe como prop externa (ahora importedCotizacionCNY).
 * - Rentabilidad: cotizacion - costo real.
 * - Porcentaje de ganancia: (rentabilidad / cotizacion) * 100.
 *
 * @param {Object} params
 * @param {number[]} selectedDestinationsManual - IDs de destinos seleccionados.
 * @param {number|string} transportManual - Costo manual transporte.
 * @param {number|string} guiaManual - Costo manual guía.
 * @param {number|string} extraCosts - Costos manuales extras.
 * @param {number|string} remainingBudget - Presupuesto restante manual.
 * @param {number} cotizacionCliente - Total del primer tab (para comparación), ahora llamado importedCotizacionCNY.
 * @param {boolean|null|undefined} isHighSeason - Flag para temporada alta/baja. Si null/undefined, asume true.
 * @param {number} peopleCountManual - Número de personas para cálculos manuales.
 *
 * @returns {Object} { costoReal, cotizacion, rentabilidad, porcentaje }
 */
export default function useManualBudget({
  selectedDestinationsManual,
  transportManual,
  guiaManual,
  extraCosts,
  remainingBudget,
  cotizacionCliente, // Renombrado a importedCotizacionCNY en App.js para mayor claridad
  isHighSeason, // Puede ser true, false, o "" (string vacío) del estado `seasonManual` en App.js
  peopleCountManual = 1,
}) {
  return useMemo(() => {
    // Determinar la temporada efectiva. Si isHighSeason es una cadena vacía o no definida, se asume alta.
    const effectiveIsHighSeason = isHighSeason === true || isHighSeason === "";

    // Sumar precios por temporada de destinos seleccionados multiplicados por personas
    const destinosCosto = selectedDestinationsManual.reduce((sum, id) => {
      const destino = destinations.find((d) => d.id === id);
      if (!destino) return sum;
      const precio = effectiveIsHighSeason
        ? destino.highSeasonPriceManual || 0
        : destino.lowSeasonPriceManual || 0;
      return sum + precio * peopleCountManual;
    }, 0);

    // Parsear a número seguro
    const transporte = Number(transportManual) || 0;
    const guia = Number(guiaManual) || 0;
    const extras = Number(extraCosts) || 0;
    const restante = Number(remainingBudget) || 0;

    const costoReal = destinosCosto + transporte + guia + extras - restante;
    const cotizacion = Number(cotizacionCliente) || 0; // Asegurarse de que es un número

    const rentabilidad = cotizacion - costoReal;
    const porcentaje = cotizacion > 0 ? (rentabilidad / cotizacion) * 100 : 0;

    return {
      costoReal,
      cotizacion,
      rentabilidad,
      porcentaje,
    };
  }, [
    selectedDestinationsManual,
    transportManual,
    guiaManual,
    extraCosts,
    remainingBudget,
    cotizacionCliente, // Dependencia actualizada
    isHighSeason, // Dependencia modificada
    peopleCountManual,
  ]);
}
