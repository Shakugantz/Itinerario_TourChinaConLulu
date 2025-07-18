// ───── Librerías externas ─────
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Logout } from "@mui/icons-material";

// ───── Datos mock ─────
import { destinations } from "./mock/destinations";
import { guidePrices } from "./mock/guides";

// ───── Componentes ─────
import HeaderSection from "./components/HeaderSection";
import Login from "./components/Login";
import Section from "./components/layout/Section";
import AnimatedBackground from "./components/layout/AnimatedBackground";
import DateRangePicker from "./components/DateRangePicker";
import PeopleCounter from "./components/PeopleCounter";
import PackageSelector from "./components/PackageSelector";
import DestinationList from "./components/DestinationList";
import TransportList from "./components/TransportList";
import GuideSelector from "./components/GuideSelector";
import ExtraCostsCard from "./components/ExtraCostsCard";
import SummaryCard from "./components/SummaryCard";
import BudgetPopup from "./components/BudgetPopup";
import TabsPresupuesto from "./components/layout/TabsPresupuesto";

// ───── Hooks personalizados ─────
import useAuth from "./hooks/useAuth";
import usePaquetesLogic from "./hooks/usePaquetesLogic";
import useTransport from "./hooks/useTransport";
import useGuide from "./hooks/useGuide";
import useUI from "./hooks/useUI";
import useSeason from "./hooks/useSeason";
import usePeopleCount from "./hooks/usePeopleCount";
import useBudget from "./hooks/useBudget";

const App = () => {
  // ───── Autenticación ─────
  const { user, logout } = useAuth();
  const [loginManuallyConfirmed, setLoginManuallyConfirmed] = useState(false);

  // ───── Costos adicionales ─────
  const [extraCosts, setExtraCosts] = useState("0");
  const [remainingBudget, setRemainingBudget] = useState("0");

  // ───── Hooks de lógica ─────
  const {
    paquetes,
    togglePaquete,
    paqueteIds,
    selectedDestinations,
    toggleDestination,
  } = usePaquetesLogic();

  const {
    transportDays,
    updateTransportDays,
    airportServicePricesByTransport,
    handleAirportServiceChange,
  } = useTransport();

  const { guideDays, setGuideDays } = useGuide();

  const { isPopupOpen, openPopup, closePopup } = useUI();

  const [selectedMonth, setSelectedMonth] = useState("");

  const isHighSeason = useSeason(selectedMonth);

  const { peopleCount, setPeopleCount } = usePeopleCount();

  const [manualGuide, setManualGuide] = useState(null);
  const [isManualGuideActive, setIsManualGuideActive] = useState(false);

  // ───── Estado para precios manuales de transporte ─────
  // Cambiamos de un único precio a un objeto que almacena precios por transporteId
  const [manualTransportPrices, setManualTransportPrices] = useState({});
  // También estado para saber si el modo manual está activo (puede ser global o individual)
  const [isManualTransportActive, setIsManualTransportActive] = useState(false);

  // ───── Inicializar animaciones AOS al montar ─────
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // ───── Cálculo del presupuesto total ─────
  const budget = useBudget({
    selectedDestinations,
    isHighSeason,
    peopleCount,
    transportDays,
    guideDays,
    airportServicePricesByTransport,
    extraCosts,
    remainingBudget,
    manualGuide,
    isManualGuideActive,
    manualTransportPrices, // <-- Cambiado para pasar el objeto con precios manuales por transporte
    isManualTransportActive,
  });

  const [currentTab, setCurrentTab] = useState(1);

  if (!user || !loginManuallyConfirmed) {
    return <Login onLoginSuccess={() => setLoginManuallyConfirmed(true)} />;
  }

  return (
    <div className="min-h-screen relative py-8 px-4 sm:px-6 lg:px-8">
      <button
        onClick={logout}
        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-red-500 via-red-600 to-red-700 
             text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform 
             hover:shadow-2xl duration-300 group"
        title="Cerrar sesión"
      >
        <Logout className="w-6 h-6 text-yellow-300 group-hover:animate-bounce" />
      </button>

      <AnimatedBackground />

      <div className="max-w-6xl mx-auto p-8">
        <HeaderSection />
        <TabsPresupuesto
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === 1 && (
          <div className="space-y-10">
            {/* PAR 1: Fecha + Personas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Section title="Fechas del viaje">
                <div className="flex flex-col items-center">
                  <DateRangePicker onDateChange={setSelectedMonth} />
                  {selectedMonth && (
                    <p className="mt-3 text-sm text-gray-500 text-center">
                      {isHighSeason
                        ? "Estás en temporada alta (Abril-Octubre)"
                        : "Estás en temporada baja (Noviembre-Marzo)"}
                    </p>
                  )}
                </div>
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
                <PackageSelector
                  paquetes={paquetes}
                  togglePaquete={togglePaquete}
                />
              </Section>
            </div>

            {/* PAR 3: Lugares + Transporte */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Section title="Lugares a visitar">
                <DestinationList
                  destinations={destinations}
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
              <div className="bg-white p-6 rounded-xl shadow-sm max-w-6xl mx-auto border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">
                  Resumen del presupuesto
                </h2>

                {/* Totales por categoría */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border border-gray-200 p-4 rounded-lg">
                  <SummaryCard
                    title="Entradas"
                    value={`${budget.entries.toLocaleString()}`}
                  />
                  <SummaryCard
                    title="Transporte"
                    value={`${budget.transport.toLocaleString()}`}
                  />
                  <SummaryCard
                    title="Guía turístico"
                    value={`${budget.guide.toLocaleString()}`}
                  />
                  <SummaryCard
                    title="Servicio aeropuerto"
                    value={`${budget.airport.toLocaleString()}`}
                  />
                  <SummaryCard
                    title="Costos adicionales"
                    value={`${budget.extraCosts.toLocaleString()}`}
                  />
                  <SummaryCard
                    title="Costos restantes"
                    value={`${budget.remainingBudget.toLocaleString()}`}
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
        )}

        {currentTab === 2 && (
          <div className="text-center text-gray-500">
            {/* Aquí se colocarán los nuevos componentes manuales */}
            <p className="text-lg">
              Aquí irán los componentes de presupuesto manual.
            </p>
          </div>
        )}

        {currentTab === 3 && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm max-w-6xl mx-auto border border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">
                Resumen del presupuesto
              </h2>

              {/* Totales por categoría */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border border-gray-200 p-4 rounded-lg">
                <SummaryCard
                  title="Entradas"
                  value={`${budget.entries.toLocaleString()}`}
                />
                <SummaryCard
                  title="Transporte"
                  value={`${budget.transport.toLocaleString()}`}
                />
                <SummaryCard
                  title="Guía turístico"
                  value={`${budget.guide.toLocaleString()}`}
                />
                <SummaryCard
                  title="Servicio aeropuerto"
                  value={`${budget.airport.toLocaleString()}`}
                />
                <SummaryCard
                  title="Costos adicionales"
                  value={`${budget.extraCosts.toLocaleString()}`}
                />
                <SummaryCard
                  title="Costos restantes"
                  value={`${budget.remainingBudget.toLocaleString()}`}
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
        )}
      </div>

      <BudgetPopup isOpen={isPopupOpen} onClose={closePopup} budget={budget} />
    </div>
  );
};

export default App;
