import React, { useEffect } from "react";
import { CurrencyYen, AddCircle, RemoveCircle } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Componente ExtraCostsCard
 * -----------------------------------
 * Este componente muestra dos campos de entrada para que el usuario pueda
 * ingresar y modificar manualmente los costos adicionales y los costos restantes.
 * Utiliza iconos para representar cada campo y estilos con gradientes, sombras y
 * animaciones AOS para mejorar la experiencia visual.
 *
 * Props:
 * - extraCosts: valor actual de los costos adicionales (string con solo números).
 * - setExtraCosts: función para actualizar los costos adicionales.
 * - remainingBudget: valor actual de los costos restantes (string con solo números).
 * - setRemainingBudget: función para actualizar los costos restantes.
 */
const ExtraCostsCard = ({
  extraCosts,
  setExtraCosts,
  remainingBudget,
  setRemainingBudget,
}) => {
  // Inicializar AOS solo una vez al montar el componente
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  /**
   * Valida que el valor ingresado sea solo números (sin letras ni símbolos).
   * Actualiza el estado correspondiente con el valor válido.
   *
   * @param {string} value - Valor del input
   * @param {function} setter - Función para actualizar estado
   */
  const handleNumberInputChange = (value, setter) => {
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    // Contenedor principal con animación fade-up y estilos visuales
    <div
      data-aos="fade-up"
      className="bg-gradient-to-br from-purple-100 via-white to-purple-200 shadow-lg p-6 rounded-2xl border border-purple-300"
    >
      {/* Título con ícono (comentado en tu original, puedes activarlo si quieres) */}
      {/* <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
        <CurrencyYen className="text-purple-500" />
        Costos Manuales
      </h2> */}

      {/* Sección para Costos adicionales */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          <AddCircle className="text-green-500" />
          Costos adicionales
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={extraCosts}
          onChange={(e) =>
            handleNumberInputChange(e.target.value, setExtraCosts)
          }
          className="w-full px-4 py-2 rounded-lg border border-green-300 shadow-inner text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          placeholder="Ej. 300"
          aria-label="Costos adicionales"
        />
      </div>

      {/* Sección para Costos restantes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          <RemoveCircle className="text-red-500" />
          Costos restantes
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={remainingBudget}
          onChange={(e) =>
            handleNumberInputChange(e.target.value, setRemainingBudget)
          }
          className="w-full px-4 py-2 rounded-lg border border-red-300 shadow-inner text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          placeholder="Ej. 150"
          aria-label="Costos restantes"
        />
      </div>
    </div>
  );
};

export default ExtraCostsCard;
