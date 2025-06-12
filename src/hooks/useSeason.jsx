import { useState, useEffect } from "react";

/**
 * useSeason
 * Dado un mes en formato "YYYY-MM" determina si es temporada alta (Abril a Octubre)
 * @param {string} selectedMonth Mes seleccionado en formato "YYYY-MM"
 * @returns {boolean} isHighSeason
 */
export default function useSeason(selectedMonth) {
  const [isHighSeason, setIsHighSeason] = useState(false);

  useEffect(() => {
    if (!selectedMonth) return;
    const month = parseInt(selectedMonth.split("-")[1]);
    setIsHighSeason(month >= 4 && month <= 10);
  }, [selectedMonth]);

  return isHighSeason;
}
