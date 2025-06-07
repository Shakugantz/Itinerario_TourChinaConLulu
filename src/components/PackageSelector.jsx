import React from "react";
import { Checkbox } from "@mui/material";
import { FaBoxOpen } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const PackageSelector = ({ paquetes, togglePaquete }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Paquete 1 */}
      <div
        className={`relative flex flex-col rounded-2xl border p-5 shadow-md transition-all hover:shadow-xl cursor-pointer bg-gradient-to-r from-blue-50 to-white ring-1 ring-blue-200`}
        onClick={() => togglePaquete("paquete1")}
      >
        <div className="absolute top-3 right-3">
          <Checkbox
            checked={paquetes.paquete1}
            onClick={(e) => e.stopPropagation()}
            onChange={() => togglePaquete("paquete1")}
            sx={{ color: "#3B82F6", "&.Mui-checked": { color: "#1D4ED8" } }}
          />
        </div>
        <div className="flex items-center gap-3">
          <FaBoxOpen className="text-3xl text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Paquete 1</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MdLocationOn className="text-blue-500" /> Destinos 1, 2 y 3
            </p>
          </div>
        </div>
      </div>

      {/* Paquete 2 */}
      <div
        className={`relative flex flex-col rounded-2xl border p-5 shadow-md transition-all hover:shadow-xl cursor-pointer bg-gradient-to-r from-violet-50 to-white ring-1 ring-violet-200`}
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
          <FaBoxOpen className="text-3xl text-violet-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Paquete 2</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MdLocationOn className="text-violet-500" /> Destinos 6
            </p>
          </div>
        </div>
      </div>

      {/* Paquete 3 */}
      <div
        className={`relative flex flex-col rounded-2xl border p-5 shadow-md transition-all hover:shadow-xl cursor-pointer bg-gradient-to-r from-pink-50 to-white ring-1 ring-pink-200`}
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
          <FaBoxOpen className="text-3xl text-pink-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Paquete 3</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MdLocationOn className="text-pink-500" /> Destinos 4 y 5
            </p>
          </div>
        </div>
      </div>

      {/* Paquete 4 */}
      <div
        className={`relative flex flex-col rounded-2xl border p-5 shadow-md transition-all hover:shadow-xl cursor-pointer bg-gradient-to-r from-yellow-50 to-white ring-1 ring-yellow-200`}
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
          <FaBoxOpen className="text-3xl text-yellow-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Paquete 4</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MdLocationOn className="text-yellow-500" /> Destinos 2, 3 y 11
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSelector;
