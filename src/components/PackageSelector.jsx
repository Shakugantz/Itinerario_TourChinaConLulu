import React from "react";
import { Checkbox } from "@mui/material"; // Componente de checkbox de Material UI
import {
  Inventory2 as Inventory2Icon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";

/**
 * Componente que muestra una cuadrícula de paquetes turísticos con casillas de verificación.
 * @param {Object} paquetes - Objeto con estado de selección de cada paquete (paquete1, paquete2, etc.)
 * @param {Function} togglePaquete - Función que alterna la selección de un paquete por su clave
 */
const PackageSelector = ({ paquetes, togglePaquete }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 bg-gradient-to-br from-purple-100 via-white to-purple-200 shadow-lg p-6 rounded-2xl border border-purple-300">
      {/* Paquete 1 */}
      <div
        className="relative flex flex-col rounded-2xl border p-5 shadow-md transition-all hover:shadow-xl cursor-pointer bg-gradient-to-r from-green-50 to-white ring-1 ring-green-200"
        onClick={() => togglePaquete("paquete1")}
      >
        {/* Checkbox en la esquina superior derecha */}
        <div className="absolute top-3 right-3">
          <Checkbox
            checked={paquetes.paquete1}
            onClick={(e) => e.stopPropagation()}
            onChange={() => togglePaquete("paquete1")}
            sx={{ color: "#22c55e", "&.Mui-checked": { color: "#15803d" } }}
          />
        </div>

        {/* Contenido visual del paquete */}
        <div className="flex items-center gap-3">
          <Inventory2Icon className="text-3xl text-green-600 animate-bounce hover:scale-110 transition-transform" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Paquete 1</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <LocationOnIcon className="text-green-500" /> Destinos 1, 2 y 3
            </p>
          </div>
        </div>
      </div>

      {/* Paquete 2 */}
      <div
        className="relative flex flex-col rounded-2xl border p-5 shadow-md transition-all hover:shadow-xl cursor-pointer bg-gradient-to-r from-violet-50 to-white ring-1 ring-violet-200"
        onClick={() => togglePaquete("paquete2")}
      >
        <div className="absolute top-3 right-3">
          <Checkbox
            checked={paquetes.paquete2}
            onClick={(e) => e.stopPropagation()}
            onChange={() => togglePaquete("paquete2")}
            sx={{ color: "#8B5CF6", "&.Mui-checked": { color: "#6D28D9" } }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Inventory2Icon className="text-3xl text-violet-600 animate-bounce hover:scale-110 transition-transform" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Paquete 2</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <LocationOnIcon className="text-violet-500" /> Destinos 6
            </p>
          </div>
        </div>
      </div>

      {/* Paquete 3 */}
      <div
        className="relative flex flex-col rounded-2xl border p-5 shadow-md transition-all hover:shadow-xl cursor-pointer bg-gradient-to-r from-pink-50 to-white ring-1 ring-pink-200"
        onClick={() => togglePaquete("paquete3")}
      >
        <div className="absolute top-3 right-3">
          <Checkbox
            checked={paquetes.paquete3}
            onClick={(e) => e.stopPropagation()}
            onChange={() => togglePaquete("paquete3")}
            sx={{ color: "#EC4899", "&.Mui-checked": { color: "#DB2777" } }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Inventory2Icon className="text-3xl text-pink-600 animate-bounce hover:scale-110 transition-transform" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Paquete 3</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <LocationOnIcon className="text-pink-500" /> Destinos 4 y 5
            </p>
          </div>
        </div>
      </div>

      {/* Paquete 4 */}
      <div
        className="relative flex flex-col rounded-2xl border p-5 shadow-md transition-all hover:shadow-xl cursor-pointer bg-gradient-to-r from-yellow-50 to-white ring-1 ring-yellow-200"
        onClick={() => togglePaquete("paquete4")}
      >
        <div className="absolute top-3 right-3">
          <Checkbox
            checked={paquetes.paquete4}
            onClick={(e) => e.stopPropagation()}
            onChange={() => togglePaquete("paquete4")}
            sx={{ color: "#F59E0B", "&.Mui-checked": { color: "#D97706" } }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Inventory2Icon className="text-3xl text-yellow-600 animate-bounce hover:scale-110 transition-transform" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Paquete 4</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <LocationOnIcon className="text-yellow-500" /> Destinos 2, 3 y 11
            </p>
          </div>
        </div>
      </div>

      {/* Paquete 5 */}
      <div
        className="relative flex flex-col rounded-2xl border p-5 shadow-md transition-all hover:shadow-xl cursor-pointer bg-gradient-to-r from-cyan-50 to-white ring-1 ring-blue-200"
        onClick={() => togglePaquete("paquete5")}
      >
        <div className="absolute top-3 right-3">
          <Checkbox
            checked={paquetes.paquete5}
            onClick={(e) => e.stopPropagation()}
            onChange={() => togglePaquete("paquete5")}
            sx={{ color: "#06b6d4", "&.Mui-checked": { color: "#0891b2" } }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Inventory2Icon className="text-3xl text-cyan-600 animate-bounce hover:scale-110 transition-transform" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Paquete 5</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <LocationOnIcon className="text-cyan-500" /> Destinos 2 y 4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSelector;
