import { useState } from "react";

/**
 * usePeopleCount
 * Maneja el conteo de personas para el viaje
 */
export default function usePeopleCount(initialCount = 1) {
  const [peopleCount, setPeopleCount] = useState(initialCount);

  return {
    peopleCount,
    setPeopleCount,
  };
}
