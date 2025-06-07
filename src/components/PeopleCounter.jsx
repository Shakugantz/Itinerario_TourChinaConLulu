import React, { useRef, useEffect } from "react";
import { FaMinus, FaPlus, FaUserFriends } from "react-icons/fa";

const PeopleCounter = ({ count, setCount }) => {
  // Referencia para guardar el ID del intervalo activo
  const holdIntervalRef = useRef(null);

  // Limpia el intervalo cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
      }
    };
  }, []);

  // Aumenta el contador si es menor al máximo permitido
  const increase = () => {
    setCount((prev) => (prev < 50 ? prev + 1 : prev));
  };

  // Disminuye el contador si es mayor al mínimo permitido
  const decrease = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Inicia un intervalo continuo al mantener presionado un botón
  const startHold = (actionFn) => {
    actionFn(); // Ejecutar inmediatamente
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    holdIntervalRef.current = setInterval(() => {
      actionFn(); // Ejecutar repetidamente cada 150ms
    }, 150);
  };

  // Detiene el intervalo cuando se suelta el botón o sale del área
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
        <FaUserFriends className="text-blue-500 text-2xl mr-2" />
        <h3 className="text-lg font-semibold text-gray-700">
          Número de Personas
        </h3>
      </div>

      {/* Controles: botones para aumentar y disminuir + número visible */}
      <div className="flex items-center justify-center space-x-6">
        {/* Botón para disminuir */}
        <button
          onMouseDown={() => startHold(decrease)} // Empieza al presionar
          onMouseUp={stopHold} // Se detiene al soltar
          onMouseLeave={stopHold} // Se detiene si el cursor sale del botón
          onTouchStart={() => startHold(decrease)} // Soporte táctil
          onTouchEnd={stopHold}
          onTouchCancel={stopHold}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors shadow text-blue-600"
          aria-label="Disminuir cantidad"
        >
          <FaMinus />
        </button>

        {/* Número actual mostrado con estilo destacado */}
        <span className="text-3xl font-bold text-gray-800 w-12 text-center select-none tracking-wide">
          {count}
        </span>

        {/* Botón para aumentar */}
        <button
          onMouseDown={() => startHold(increase)} // Empieza al presionar
          onMouseUp={stopHold} // Se detiene al soltar
          onMouseLeave={stopHold} // Se detiene si el cursor sale del botón
          onTouchStart={() => startHold(increase)} // Soporte táctil
          onTouchEnd={stopHold}
          onTouchCancel={stopHold}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors shadow text-blue-600"
          aria-label="Aumentar cantidad"
        >
          <FaPlus />
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
