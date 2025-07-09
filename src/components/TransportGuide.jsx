import React, { useEffect } from "react";
import { AddCircle } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Componente TransportGuide
 * -------------------------
 * Permite ingresar los costos manuales de Transporte y Guía en un solo componente.
 * Usa validación para solo números, íconos visuales e integración con AOS.
 *
 * Props:
 * - transportCost: string, valor actual del campo Transporte.
 * - setTransportCost: función para actualizar Transporte.
 * - guideCost: string, valor actual del campo Guía.
 * - setGuideCost: función para actualizar Guía.
 */
const TransportGuide = ({
  transportCost,
  setTransportCost,
  guideCost,
  setGuideCost,
}) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleNumberInputChange = (value, setter) => {
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <div
      data-aos="fade-up"
      className="bg-gradient-to-br from-purple-100 via-white to-purple-200 shadow-lg p-6 rounded-2xl border border-purple-300"
    >
      {/* Campo de Transporte */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          <AddCircle className="text-green-500" />
          Transporte
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={transportCost}
          onChange={(e) =>
            handleNumberInputChange(e.target.value, setTransportCost)
          }
          className="w-full px-4 py-2 rounded-lg border border-green-300 shadow-inner text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          placeholder="Ej. 300"
          aria-label="Costo Transporte"
        />
      </div>

      {/* Campo de Guía */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          <AddCircle className="text-purple-500" />
          Guía
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={guideCost}
          onChange={(e) =>
            handleNumberInputChange(e.target.value, setGuideCost)
          }
          className="w-full px-4 py-2 rounded-lg border border-purple-300 shadow-inner text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Ej. 150"
          aria-label="Costo Guía"
        />
      </div>
    </div>
  );
};

export default TransportGuide;
