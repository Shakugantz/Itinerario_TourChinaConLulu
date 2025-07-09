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
 * - resetPaquetes: desactiva todos los paquetes y limpia destinos
 *
 * @param {Function} setSelectedDestinationsExternal Función para actualizar destinos desde afuera (opcional)
 */
export default function usePaquetesLogic(setSelectedDestinationsExternal) {
  const [paquetes, setPaquetes] = useState({
    paquete1: false,
    paquete2: false,
    paquete3: false,
    paquete4: false,
    paquete5: false,
  });

  const paqueteIds = {
    paquete1: [1, 2, 3],
    paquete2: [6],
    paquete3: [4, 5],
    paquete4: [2, 3, 11],
    paquete5: [2, 4],
  };

  const [selectedDestinations, setSelectedDestinations] = useState([]);

  const togglePaquete = (paquete) => {
    setPaquetes((prev) => {
      const newPaquetes = { ...prev, [paquete]: !prev[paquete] };
      let newSelected = [...selectedDestinations];
      const destinosDelPaquete = paqueteIds[paquete] || [];

      if (newPaquetes[paquete]) {
        destinosDelPaquete.forEach((id) => {
          if (!newSelected.includes(id)) newSelected.push(id);
        });
      } else {
        newSelected = newSelected.filter((id) => {
          const perteneceOtroPaqueteActivo = Object.entries(paqueteIds).some(
            ([otroPaquete, ids]) =>
              otroPaquete !== paquete &&
              newPaquetes[otroPaquete] &&
              ids.includes(id)
          );
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

  const toggleDestination = (destinationId) => {
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

  // NUEVA FUNCIÓN: desactivar todos paquetes y limpiar destinos
  const resetPaquetes = () => {
    setPaquetes({
      paquete1: false,
      paquete2: false,
      paquete3: false,
      paquete4: false,
      paquete5: false,
    });
    if (setSelectedDestinationsExternal) {
      setSelectedDestinationsExternal([]);
    } else {
      setSelectedDestinations([]);
    }
  };

  return {
    paquetes,
    togglePaquete,
    paqueteIds,
    selectedDestinations,
    toggleDestination,
    resetPaquetes, // <-- exportamos aquí
  };
}
