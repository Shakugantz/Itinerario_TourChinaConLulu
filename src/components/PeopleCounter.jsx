import React, { useRef, useEffect } from "react";
import { Group, Add, Remove } from "@mui/icons-material"; // Íconos de personas, sumar y restar

/**
 * Componente que permite seleccionar la cantidad de personas.
 * Contiene botones para aumentar y disminuir con funcionalidad de mantener presionado.
 * @param {number} count - Cantidad actual seleccionada.
 * @param {Function} setCount - Función para actualizar el contador.
 */
const PeopleCounter = ({ count, setCount }) => {
  const holdIntervalRef = useRef(null);

  useEffect(() => {
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

  const startHold = (actionFn) => {
    actionFn();
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    holdIntervalRef.current = setInterval(() => {
      actionFn();
    }, 150);
  };

  const stopHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-5 bg-white shadow-md rounded-2xl border border-gray-200 relative overflow-hidden">
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
          onMouseDown={() => startHold(decrease)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => startHold(decrease)}
          onTouchEnd={stopHold}
          onTouchCancel={stopHold}
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
          onMouseDown={() => startHold(increase)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => startHold(increase)}
          onTouchEnd={stopHold}
          onTouchCancel={stopHold}
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
