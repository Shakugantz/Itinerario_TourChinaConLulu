import { useState } from "react";

/**
 * useGuide
 * Hook que maneja la cantidad de días del guía turístico
 * y también permite manejar un modo manual donde se configuran
 * días y precio manualmente, ignorando el array estándar de precios.
 */
export default function useGuide() {
  // Estado para días seleccionados "normalmente" (desde botones estándar)
  const [guideDays, setGuideDays] = useState(0);

  /**
   * manualGuide:
   * Objeto con la configuración manual para el guía.
   * {
   *   days: number,   // días contratados manualmente
   *   price: number,  // precio diario manual
   * }
   * o null si no hay configuración manual activa.
   */
  const [manualGuide, setManualGuide] = useState(null);

  /**
   * Función para actualizar días en modo normal
   * Si se está en modo manual, no hace nada para evitar conflicto.
   * Si se desea salir de modo manual, hay que limpiar manualGuide por fuera.
   */
  const updateGuideDays = (days) => {
    if (!manualGuide) {
      setGuideDays(days);
    }
  };

  /**
   * Función para activar o actualizar modo manual
   * Recibe un objeto { days, price }
   * Cuando se activa modo manual, se ignora guideDays normal.
   */
  const updateManualGuide = (manual) => {
    if (
      manual === null ||
      (typeof manual.days === "number" && typeof manual.price === "number")
    ) {
      setManualGuide(manual);
      // Opcional: también podrías sincronizar guideDays si quieres
      // setGuideDays(manual?.days ?? 0);
    } else {
      console.warn(
        "updateManualGuide espera un objeto {days:number, price:number} o null"
      );
    }
  };

  /**
   * Función para salir del modo manual y volver a modo normal
   */
  const clearManualGuide = () => {
    setManualGuide(null);
  };

  return {
    // Estados
    guideDays,
    manualGuide,

    // Setters
    setGuideDays: updateGuideDays,
    setManualGuide: updateManualGuide,
    clearManualGuide,
  };
}
