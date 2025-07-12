import React from "react";

import Section from "./layout/Section";
import SeasonSelector from "./SeasonSelector";
import PeopleCounter from "./PeopleCounter";
import DestinationList from "./DestinationList";
import TransportGuide from "./TransportGuide";
import ExtraCostsCard from "./ExtraCostsCard";
import SummaryManualCard from "./SummaryManualCard";
import { Replay, FileDownload } from "@mui/icons-material";

const Tab2Manual = ({
  destinations,
  seasonManual,
  setSeasonManual,
  manualPeopleCount,
  setManualPeopleCount,
  manualSelectedDestinations,
  setManualSelectedDestinations,
  manualExtraCosts,
  setManualExtraCosts,
  manualRemainingBudget,
  setManualRemainingBudget,
  manualTransportCost,
  setManualTransportCost,
  manualGuideCost,
  setManualGuideCost,
  paquetes,
  paqueteIds,
  isHighSeasonManual,
  manualBudget,
  resetTab2,
  peopleCount,
  extraCosts,
  remainingBudget,
  selectedDestinations,
  season,
  setSeason,
  setManualSelectedDestinations: setManualSelectedDestinationsProp,
  setManualExtraCosts: setManualExtraCostsProp,
  setManualRemainingBudget: setManualRemainingBudgetProp,
  setManualPeopleCount: setManualPeopleCountProp,
  setManualTransportCost: setManualTransportCostProp,
  setManualGuideCost: setManualGuideCostProp,
}) => {
  // Función para importar datos desde tab 1
  const importarData = () => {
    setManualPeopleCountProp(peopleCount);
    setManualExtraCostsProp(extraCosts);
    setManualRemainingBudgetProp(remainingBudget);
    setManualSelectedDestinationsProp([...selectedDestinations]);
    setManualTransportCostProp("0");
    setManualGuideCostProp("0");
    setSeasonManual(season);
  };

  return (
    <div className="space-y-10">
      {/* Botones Importar y reiniciar en tab 2 con íconos y AOS */}
      <div
        className="text-right max-w-6xl mx-auto flex justify-between mb-4"
        data-aos="fade-up"
      >
        <button
          onClick={importarData}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 inline-flex items-center"
        >
          <FileDownload className="mr-2" />
          Importar Data
        </button>

        <button
          onClick={resetTab2}
          className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300 inline-flex items-center"
        >
          <Replay className="mr-2" />
          Reiniciar Costos
        </button>
      </div>

      <div className="text-center text-gray-500 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SeasonSelector manual */}
          <Section title="Temporada del viaje">
            <SeasonSelector
              season={seasonManual}
              onSeasonChange={setSeasonManual}
            />
          </Section>

          <Section title="Número de personas">
            <PeopleCounter
              count={manualPeopleCount}
              setCount={setManualPeopleCount}
            />
          </Section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Section title="Lugares a visitar">
            <DestinationList
              destinations={destinations} // <--- USAMOS EL ARREGLO DESTINATIONS AQUÍ
              selectedDestinations={manualSelectedDestinations}
              toggleDestination={(id) => {
                setManualSelectedDestinations((prev) =>
                  prev.includes(id)
                    ? prev.filter((d) => d !== id)
                    : [...prev, id]
                );
              }}
              paquetes={paquetes}
              paquete1Ids={paqueteIds.paquete1}
              paquete2Ids={paqueteIds.paquete2}
              paquete3Ids={paqueteIds.paquete3}
              paquete4Ids={paqueteIds.paquete4}
              paquete5Ids={paqueteIds.paquete5}
              isHighSeason={isHighSeasonManual}
              useManualPrices={true}
            />
          </Section>

          <Section title="Transporte y Guía">
            <TransportGuide
              transportCost={manualTransportCost}
              setTransportCost={setManualTransportCost}
              guideCost={manualGuideCost}
              setGuideCost={setManualGuideCost}
            />

            <h3 className="mb-4 pt-6 text-gray-900 font-semibold text-xl">
              Costos Adicionales
            </h3>
            <ExtraCostsCard
              extraCosts={manualExtraCosts}
              setExtraCosts={setManualExtraCosts}
              remainingBudget={manualRemainingBudget}
              setRemainingBudget={setManualRemainingBudget}
            />

            <h3 className="mb-4 pt-6 text-gray-900 font-semibold text-xl">
              Resumen del Presupuesto
            </h3>
            <div className="mt-6">
              <SummaryManualCard
                costoReal={manualBudget.costoReal}
                cotizacion={manualBudget.cotizacion}
                rentabilidad={manualBudget.rentabilidad}
                porcentaje={manualBudget.porcentaje}
              />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Tab2Manual;
