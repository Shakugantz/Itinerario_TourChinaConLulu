import React, { useRef, useEffect } from "react";
import { Group, Add, Remove } from "@mui/icons-material";

/**
 * Componente que permite seleccionar la cantidad de personas.
 * Contiene botones para aumentar y disminuir.
 * - En escritorio: soporta la funcionalidad de mantener presionado.
 * - En dispositivos táctiles: un solo toque incrementa/decrementa en uno.
 * @param {number} count - Cantidad actual seleccionada.
 * @param {Function} setCount - Función para actualizar el contador.
 */
const PeopleCounter = ({ count, setCount }) => {
  const holdIntervalRef = useRef(null);
  const touchHandledRef = useRef(false); // Para indicar si un toque ya fue manejado

  useEffect(() => {
    // Limpiar el intervalo al desmontar el componente
    return () => {
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
      }
    };
  }, []);

  const increase = () => {
    setCount((prev) => (prev < 50 ? prev + 1 : prev));
  };

  const decrease = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // --- Lógica para Eventos de Mouse (Escritorio) ---

  const startHoldForMouse = (actionFn) => {
    if (touchHandledRef.current) {
      // Si ya se manejó un evento táctil, ignorar el mouse event simulado
      return;
    }
    actionFn(); // Ejecutar inmediatamente al presionar
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current); // Limpiar cualquier intervalo anterior
    holdIntervalRef.current = setInterval(() => {
      actionFn(); // Repetir la acción cada 150ms
    }, 150);
  };

  const stopHoldForMouse = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    // Reiniciar la bandera después de que los eventos de mouse terminen
    // Se añade un pequeño retraso para asegurar que cualquier click simulado posterior no sea capturado
    setTimeout(() => {
      touchHandledRef.current = false;
    }, 50);
  };

  // --- Lógica para Eventos Táctiles (Móvil) ---

  const handleTouchStart = (actionFn) => {
    touchHandledRef.current = true; // Indicar que un evento táctil ha ocurrido
    actionFn(); // Ejecutar la acción una sola vez por toque
    // No iniciar holdIntervalRef aquí para evitar el conteo continuo en táctil
  };

  // Nota: onTouchEnd y onTouchCancel no necesitan hacer nada especial aquí,
  // ya que no hay un "hold" activo en el táctil que detener.
  // Podrías ponerlas para asegurarte de resetear touchHandledRef si fuera necesario,
  // pero con el setTimeout en stopHoldForMouse, es menos probable que lo necesites.

  return (
    <div
      data-aos="fade-up"
      className="bg-gradient-to-br from-purple-100 via-white to-purple-200 shadow-lg p-6 rounded-2xl border border-purple-300"
    >
      {/* Título con ícono de personas */}
      <div className="flex items-center justify-center mb-4">
        <Group className="text-blue-500 text-2xl mr-2 animate-bounce" />
        <h3 className="text-lg font-semibold text-gray-700">
          Número de Personas
        </h3>
      </div>

      {/* Controles: botones para aumentar y disminuir + número visible */}
      <div className="flex items-center justify-center space-x-6">
        {/* Botón para disminuir */}
        <button
          // Eventos para táctil (prioritarios)
          onTouchStart={() => handleTouchStart(decrease)}
          // Eventos para escritorio (con chequeo de touchHandledRef)
          onMouseDown={() => startHoldForMouse(decrease)}
          onMouseUp={stopHoldForMouse}
          onMouseLeave={stopHoldForMouse}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-all shadow text-blue-600 hover:scale-110"
          aria-label="Disminuir cantidad"
        >
          <Remove className="transition-transform duration-150" />
        </button>

        {/* Número actual mostrado con estilo destacado */}
        <span className="text-3xl font-bold text-gray-800 w-12 text-center select-none tracking-wide">
          {count}
        </span>

        {/* Botón para aumentar */}
        <button
          // Eventos para táctil (prioritarios)
          onTouchStart={() => handleTouchStart(increase)}
          // Eventos para escritorio (con chequeo de touchHandledRef)
          onMouseDown={() => startHoldForMouse(increase)}
          onMouseUp={stopHoldForMouse}
          onMouseLeave={stopHoldForMouse}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-all shadow text-blue-600 hover:scale-110"
          aria-label="Aumentar cantidad"
        >
          <Add className="transition-transform duration-150" />
        </button>
      </div>

      {/* Nota inferior indicando límites del contador */}
      <p className="mt-4 text-sm text-center text-gray-400">
        Puedes elegir entre 1 y 50 personas
      </p>
    </div>
  );
};

export default PeopleCounter;
