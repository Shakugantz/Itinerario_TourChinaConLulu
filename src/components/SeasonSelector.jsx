import React from "react";

const SeasonSelector = ({ season, onSeasonChange }) => {
  return (
    <div className="w-full max-w-md p-6 rounded-3xl bg-gradient-to-r from-purple-100 via-purple-50 to-white shadow-lg border border-purple-300 mx-auto">
      <h3 className="text-xl font-semibold text-purple-900 mb-6 select-none text-center tracking-wide">
        Selecciona la temporada
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 px-2 sm:px-4">
        {/* Temporada Alta */}
        <label
          htmlFor="season-high"
          className={`flex-1 cursor-pointer rounded-xl py-5 px-8 text-center font-semibold transition
            select-none
            ${
              season === "high"
                ? "bg-gradient-to-r from-purple-500 to-indigo-800 shadow-lg text-white ring-4 ring-purple-700 border-transparent"
                : "bg-white text-purple-500 hover:bg-purple-100 hover:text-purple-900 border border-gray-300"
            }
          `}
          aria-pressed={season === "high"}
        >
          <input
            type="radio"
            name="season"
            id="season-high"
            value="high"
            checked={season === "high"}
            onChange={() => onSeasonChange("high")}
            className="sr-only"
          />
          Temporada Alta
          <p
            className={`text-sm mt-2 font-normal ${
              season === "high" ? "text-purple-200" : "text-purple-600"
            }`}
          >
            Abril - Octubre
          </p>
        </label>

        {/* Temporada Baja */}
        <label
          htmlFor="season-low"
          className={`flex-1 cursor-pointer rounded-xl py-5 px-8 text-center font-semibold transition
            select-none
            ${
              season === "low"
                ? "bg-gradient-to-r from-green-500 to-teal-700 shadow-lg text-white ring-4 ring-green-600 border-transparent"
                : "bg-white text-green-500 hover:bg-green-100 hover:text-green-900 border border-gray-300"
            }
          `}
          aria-pressed={season === "low"}
        >
          <input
            type="radio"
            name="season"
            id="season-low"
            value="low"
            checked={season === "low"}
            onChange={() => onSeasonChange("low")}
            className="sr-only"
          />
          Temporada Baja
          <p
            className={`text-sm mt-2 font-normal ${
              season === "low" ? "text-green-200" : "text-green-600"
            }`}
          >
            Noviembre - Marzo
          </p>
        </label>
      </div>
    </div>
  );
};

export default SeasonSelector;
