import React from "react";

import Section from "./layout/Section";
import SeasonSelector from "./SeasonSelector";
import PeopleCounter from "./PeopleCounter";
import GuideSelector from "./GuideSelector";
import PackageSelector from "./PackageSelector";
import DestinationList from "./DestinationList";
import TransportList from "./TransportList";
import ExtraCostsCard from "./ExtraCostsCard";
import SummaryCard from "./SummaryCard";
import { guidePrices } from "../mock/guides";

const Tab1Presupuesto = ({
  destinations, // <--- NUEVA PROP AQUÍ
  season,
  setSeason,
  peopleCount,
  setPeopleCount,
  paquetes,
  togglePaquete,
  paqueteIds,
  selectedDestinations,
  toggleDestination,
  isHighSeason,
  guideDays,
  setGuideDays,
  transportDays,
  updateTransportDays,
  airportServicePricesByTransport,
  handleAirportServiceChange,
  manualGuide,
  setManualGuide,
  isManualGuideActive,
  setIsManualGuideActive,
  manualTransportPrices,
  setManualTransportPrices,
  isManualTransportActive,
  setIsManualTransportActive,
  extraCosts,
  setExtraCosts,
  remainingBudget,
  setRemainingBudget,
  budget,
  openPopup,
  resetTab1,
}) => {
  return (
    <div className="space-y-10">
      <div className="text-right max-w-6xl mx-auto mb-4" data-aos="fade-up">
        <button
          onClick={resetTab1}
          className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300 inline-flex items-center"
        >
          <span className="mr-2">&#x21bb;</span> Reiniciar Costos
        </button>
      </div>

      {/* PAR 1: Temporada + Personas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-center">
        <Section title="Temporada del viaje">
          <SeasonSelector season={season} onSeasonChange={setSeason} />
        </Section>

        <Section title="Número de personas">
          <PeopleCounter count={peopleCount} setCount={setPeopleCount} />
        </Section>
      </div>

      {/* PAR 2: Paquetes + Guía */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Guía turístico">
          <GuideSelector
            peopleCount={peopleCount}
            selectedDays={guideDays}
            onDaysChange={setGuideDays}
            guidePrices={guidePrices}
            setManualGuide={setManualGuide}
            isManualGuideActive={isManualGuideActive}
            setIsManualGuideActive={setIsManualGuideActive}
          />
        </Section>

        <Section title="Paquetes">
          <PackageSelector paquetes={paquetes} togglePaquete={togglePaquete} />
        </Section>
      </div>

      {/* PAR 3: Lugares + Transporte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Lugares a visitar">
          <DestinationList
            destinations={destinations} // <--- PASAR PROP CORRECTA AQUÍ
            selectedDestinations={selectedDestinations}
            toggleDestination={toggleDestination}
            paquetes={paquetes}
            paquete1Ids={paqueteIds.paquete1}
            paquete2Ids={paqueteIds.paquete2}
            paquete3Ids={paqueteIds.paquete3}
            paquete4Ids={paqueteIds.paquete4}
            paquete5Ids={paqueteIds.paquete5}
            isHighSeason={isHighSeason}
          />
        </Section>

        <Section title="Transporte">
          <TransportList
            transportDays={transportDays}
            updateTransportDays={updateTransportDays}
            handleAirportServiceChange={handleAirportServiceChange}
            manualTransportPrices={manualTransportPrices}
            setManualTransportPrices={setManualTransportPrices}
            isManualTransportActive={isManualTransportActive}
            setIsManualTransportActive={setIsManualTransportActive}
          />
        </Section>
      </div>

      {/* Costos manuales */}
      <div className="max-w-2xl mx-auto">
        <Section title="Costos Manuales">
          <ExtraCostsCard
            extraCosts={extraCosts}
            setExtraCosts={setExtraCosts}
            remainingBudget={remainingBudget}
            setRemainingBudget={setRemainingBudget}
          />
        </Section>
      </div>

      {/* Resumen del presupuesto */}
      <div className="space-y-4">
        <div
          className="bg-white p-6 rounded-xl shadow-sm max-w-6xl mx-auto border border-gray-200"
          data-aos="fade-up"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">
            Resumen del presupuesto
          </h2>

          {/* Totales por categoría */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border border-gray-200 p-4 rounded-lg">
            <SummaryCard
              title="Entradas"
              value={budget.entries.toLocaleString()}
            />
            <SummaryCard
              title="Transporte"
              value={budget.transport.toLocaleString()}
            />
            <SummaryCard
              title="Guía turístico"
              value={budget.guide.toLocaleString()}
            />
            <SummaryCard
              title="Servicio aeropuerto"
              value={budget.airport.toLocaleString()}
            />
            <SummaryCard
              title="Costos adicionales"
              value={budget.extraCosts.toLocaleString()}
            />
            <SummaryCard
              title="Costos restantes"
              value={budget.remainingBudget.toLocaleString()}
            />
          </div>

          {/* Totales por moneda */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 border border-gray-200 rounded-lg p-4 text-center">
            <div>
              <h3 className="font-medium text-gray-900 text-sm">
                Total estimado CNY
              </h3>
              <p className="text-lg font-bold text-blue-600 mt-1">
                ¥{budget.totalCNY.toLocaleString()}
              </p>
            </div>
            <div className="border-l border-r border-gray-300">
              <h3 className="font-medium text-gray-900 text-sm">
                Total estimado USD
              </h3>
              <p className="text-lg font-bold text-blue-600 mt-1">
                ${budget.totalUSD.toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 text-sm">
                Total estimado EUR
              </h3>
              <p className="text-lg font-bold text-blue-600 mt-1">
                €{budget.totalEUR.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Botón confirmación */}
          <div className="mt-8 text-center">
            <button
              onClick={openPopup}
              className="bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Confirmar presupuesto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab1Presupuesto;
