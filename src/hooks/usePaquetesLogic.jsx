import { useState } from "react";

/**
 * useTravelSelection
 * Hook para manejar la selección de destinos y paquetes
 * Incluye:
 * - selectedDestinations: destinos seleccionados
 * - paquetes: estado de paquetes activos
 * - paqueteIds: IDs de destinos por paquete
 * - togglePaquete: activa o desactiva un paquete
 * - toggleDestination: activa o desactiva un destino individual si no está en paquete activo
 *
 * @param {Function} setSelectedDestinationsExternal Función para actualizar destinos desde afuera (opcional)
 */
export default function usePaquetesLogic(setSelectedDestinationsExternal) {
  // Estado paquetes activos
  const [paquetes, setPaquetes] = useState({
    paquete1: false,
    paquete2: false,
    paquete3: false,
    paquete4: false,
    paquete5: false,
  });

  // Mapeo estático de destinos que incluye cada paquete
  const paqueteIds = {
    paquete1: [1, 2, 3],
    paquete2: [6],
    paquete3: [4, 5],
    paquete4: [2, 3, 11],
    paquete5: [2, 4],
  };

  const [selectedDestinations, setSelectedDestinations] = useState([]);

  /**
   * Alterna la selección de un paquete, agregando o removiendo sus destinos
   */
  const togglePaquete = (paquete) => {
    setPaquetes((prev) => {
      const newPaquetes = { ...prev, [paquete]: !prev[paquete] };
      let newSelected = [...selectedDestinations];
      const destinosDelPaquete = paqueteIds[paquete] || [];

      if (newPaquetes[paquete]) {
        // Paquete activado: agregamos todos sus destinos si no están
        destinosDelPaquete.forEach((id) => {
          if (!newSelected.includes(id)) newSelected.push(id);
        });
      } else {
        // Paquete desactivado: solo eliminamos los destinos que no estén en otro paquete activo
        newSelected = newSelected.filter((id) => {
          // Verificamos si el destino está en otro paquete activo diferente al desactivado
          const perteneceOtroPaqueteActivo = Object.entries(paqueteIds).some(
            ([otroPaquete, ids]) =>
              otroPaquete !== paquete &&
              newPaquetes[otroPaquete] && // paquete activo
              ids.includes(id)
          );
          // Si el destino está en el paquete que desactivamos y no está en otro paquete activo, lo removemos
          if (destinosDelPaquete.includes(id) && !perteneceOtroPaqueteActivo) {
            return false;
          }
          return true;
        });
      }

      if (setSelectedDestinationsExternal) {
        setSelectedDestinationsExternal(newSelected);
      } else {
        setSelectedDestinations(newSelected);
      }

      return newPaquetes;
    });
  };

  /**
   * Alterna la selección de un destino individual, solo si no pertenece a un paquete activo
   * @param {number} destinationId
   */
  const toggleDestination = (destinationId) => {
    // Si el destino pertenece a un paquete activo, no hacer nada
    const paquetesActivos = Object.entries(paqueteIds).filter(
      ([paquete, ids]) => paquetes[paquete] && ids.includes(destinationId)
    );
    if (paquetesActivos.length > 0) return;

    const newSelected = selectedDestinations.includes(destinationId)
      ? selectedDestinations.filter((id) => id !== destinationId)
      : [...selectedDestinations, destinationId];

    if (setSelectedDestinationsExternal) {
      setSelectedDestinationsExternal(newSelected);
    } else {
      setSelectedDestinations(newSelected);
    }
  };

  return {
    paquetes,
    togglePaquete,
    paqueteIds,
    selectedDestinations,
    toggleDestination,
  };
}
