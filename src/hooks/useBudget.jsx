import { useMemo, useRef, useEffect } from "react";
import { destinations } from "../mock/destinations";
import { transports } from "../mock/transports";
import { guidePrices } from "../mock/guides";

function useBudget({
  selectedDestinations,
  isHighSeason,
  peopleCount,
  transportDays,
  guideDays,
  manualGuide,
  isManualGuideActive,
  airportServicePricesByTransport,
  extraCosts,
  remainingBudget,
}) {
  // Guardamos referencia previa de manualGuide para detectar cambios
  const prevManualGuideRef = useRef(manualGuide);

  useEffect(() => {
    if (manualGuide !== prevManualGuideRef.current) {
      prevManualGuideRef.current = manualGuide;
    }
  }, [manualGuide]);

  return useMemo(() => {
    // Cálculo del costo total de destinos seleccionados según temporada y personas
    const entries =
      selectedDestinations.reduce((sum, destId) => {
        const dest = destinations.find((d) => d.id === destId);
        if (!dest) return sum;
        return (
          sum + (isHighSeason ? dest.highSeasonPrice : dest.lowSeasonPrice)
        );
      }, 0) * peopleCount;

    // Cálculo del costo total de transporte según días y tipo de transporte
    const transport = Object.entries(transportDays).reduce(
      (sum, [id, days]) => {
        const t = transports.find((t) => t.id === parseInt(id));
        return sum + (t ? t.dailyPrice * days : 0);
      },
      0
    );

    let guide = 0;

    // Si está activo el modo manual y manualGuide es válido, usamos su precio personalizado
    if (
      isManualGuideActive &&
      manualGuide &&
      typeof manualGuide.days === "number" &&
      manualGuide.price !== undefined &&
      manualGuide.price !== null
    ) {
      const priceNum = Number(manualGuide.price);
      if (!isNaN(priceNum)) {
        guide = manualGuide.days * priceNum;
      } else {
        console.warn(
          "manualGuide.price no es un número válido:",
          manualGuide.price
        );
        guide = 0;
      }
    } else {
      // Si no está activo modo manual, usamos precio estándar según rango de personas y días
      const guideRate = guidePrices.find(
        (g) => peopleCount >= g.minPeople && peopleCount <= g.maxPeople
      );
      guide = guideRate ? guideRate.dailyRate * guideDays : 0;
    }

    // Cálculo del costo total de servicios de aeropuerto
    const airport = Object.values(airportServicePricesByTransport).reduce(
      (sum, s) => sum + (s.envioPrice || 0) + (s.recojoPrice || 0),
      0
    );

    const extraCostsNum = Number(extraCosts) || 0;
    const remainingBudgetNum = Number(remainingBudget) || 0;

    // Total final en CNY sumando todos los costos y restando el presupuesto restante
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

    // Conversión aproximada a USD y EUR
    const totalUSD = Number((totalCNY * 0.14).toFixed(2));
    const totalEUR = Number((totalCNY * 0.13).toFixed(2));

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
    guideDays,
    manualGuide,
    isManualGuideActive,
    airportServicePricesByTransport,
    extraCosts,
    remainingBudget,
  ]);
}

export default useBudget;
