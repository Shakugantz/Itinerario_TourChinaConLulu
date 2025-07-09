// ───── Librerías externas ─────
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Logout, Replay, FileDownload } from "@mui/icons-material"; // Íconos nuevos

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
import TransportGuide from "./components/TransportGuide";
import SummaryManualCard from "./components/SummaryManualCard";

// ───── Hooks personalizados ─────
import useAuth from "./hooks/useAuth";
import usePaquetesLogic from "./hooks/usePaquetesLogic";
import useTransport from "./hooks/useTransport";
import useGuide from "./hooks/useGuide";
import useUI from "./hooks/useUI";
import useSeason from "./hooks/useSeason";
import usePeopleCount from "./hooks/usePeopleCount";
import useBudget from "./hooks/useBudget";

// Nuevo hook para presupuesto manual
import useManualBudget from "./hooks/useManualBudget";

const App = () => {
  // ───── Autenticación ─────
  const { user, logout } = useAuth();
  const [loginManuallyConfirmed, setLoginManuallyConfirmed] = useState(false);

  // ───── Costos adicionales ─────
  const [extraCosts, setExtraCosts] = useState("0");
  const [remainingBudget, setRemainingBudget] = useState("0");

  // Para el tab 2 (Presupuesto Manual)
  const [manualPeopleCount, setManualPeopleCount] = useState(1);
  const [manualExtraCosts, setManualExtraCosts] = useState("0");
  const [manualRemainingBudget, setManualRemainingBudget] = useState("0");
  const [manualSelectedDestinations, setManualSelectedDestinations] = useState(
    []
  );

  const [manualTransportCost, setManualTransportCost] = useState("0");
  const [manualGuideCost, setManualGuideCost] = useState("0");

  // ───── Hooks de lógica ─────
  const {
    paquetes,
    togglePaquete,
    paqueteIds,
    selectedDestinations,
    toggleDestination,
    resetPaquetes,
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
  const [selectedMonthManual, setSelectedMonthManual] = useState("");
  const isHighSeasonManual = useSeason(selectedMonthManual);

  const { peopleCount, setPeopleCount } = usePeopleCount();

  const [manualGuide, setManualGuide] = useState(null);
  const [isManualGuideActive, setIsManualGuideActive] = useState(false);

  const [manualTransportPrices, setManualTransportPrices] = useState({});
  const [isManualTransportActive, setIsManualTransportActive] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Hook presupuesto principal (tab 1)
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
    manualTransportPrices,
    isManualTransportActive,
  });

  // Hook presupuesto manual (tab 2)
  const manualBudget = useManualBudget({
    selectedDestinationsManual: manualSelectedDestinations,
    transportManual: manualTransportCost,
    guiaManual: manualGuideCost,
    extraCosts: manualExtraCosts,
    remainingBudget: manualRemainingBudget,
    cotizacionCliente: budget.totalCNY,
    isHighSeason,
    peopleCountManual: manualPeopleCount,
  });

  const [currentTab, setCurrentTab] = useState(1);

  // Función para resetear Tab 1
  const resetTab1 = () => {
    setSelectedMonth("");
    setPeopleCount(1);
    setGuideDays(0);

    // Llama a resetPaquetes para limpiar paquetes y destinos
    resetPaquetes();

    setExtraCosts("0");
    setRemainingBudget("0");

    updateTransportDays(0);
    setGuideDays(0);
    setManualGuide(null);
    setIsManualGuideActive(false);
    setManualTransportPrices({});
    setIsManualTransportActive(false);
  };

  // Función para resetear Tab 2
  const resetTab2 = () => {
    setManualPeopleCount(1);
    setManualExtraCosts("0");
    setManualRemainingBudget("0");
    setManualSelectedDestinations([]);
    setManualTransportCost("0");
    setManualGuideCost("0");
  };

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
            {/* Botón para reiniciar Tab 1 con icono y AOS */}
            <div
              className="text-right max-w-6xl mx-auto mb-4"
              data-aos="fade-up"
            >
              <button
                onClick={resetTab1}
                className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300 inline-flex items-center"
              >
                <Replay className="mr-2" />
                Reiniciar Costos
              </button>
            </div>

            {/* PAR 1: Fecha + Personas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-center">
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
          <div className="space-y-10">
            {/* Botones Importar y reiniciar en tab 2 con íconos y AOS */}
            <div
              className="text-right max-w-6xl mx-auto flex justify-between mb-4"
              data-aos="fade-up"
            >
              <button
                onClick={() => {
                  setManualPeopleCount(peopleCount);
                  setManualExtraCosts(extraCosts);
                  setManualRemainingBudget(remainingBudget);
                  setManualSelectedDestinations([...selectedDestinations]);
                  setManualTransportCost("0");
                  setManualGuideCost("0");
                  setSelectedMonthManual(selectedMonth);
                }}
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
                {/* Aquí añadimos DateRangePicker manual a la izquierda del número de personas */}
                <Section title="Fechas del viaje">
                  <div className="flex flex-col items-center">
                    <DateRangePicker
                      onDateChange={setSelectedMonthManual}
                      value={selectedMonthManual}
                    />
                    {selectedMonthManual && (
                      <p className="mt-3 text-sm text-gray-500 text-center">
                        {isHighSeasonManual
                          ? "Estás en temporada alta (Abril-Octubre)"
                          : "Estás en temporada baja (Noviembre-Marzo)"}
                      </p>
                    )}
                  </div>
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
                    destinations={destinations}
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

                {/* Costos Manuales con Transporte - Guía encima */}
                <Section title="Transporte y Guía">
                  {/* Transporte y Guía con título negro arriba */}

                  <TransportGuide
                    transportCost={manualTransportCost}
                    setTransportCost={setManualTransportCost}
                    guideCost={manualGuideCost}
                    setGuideCost={setManualGuideCost}
                  />
                  <h3 className="mb-4 pt-6 text-gray-900 font-semibold text-xl">
                    Costos Adicionales
                  </h3>
                  {/* Costos manuales */}
                  <ExtraCostsCard
                    extraCosts={manualExtraCosts}
                    setExtraCosts={setManualExtraCosts}
                    remainingBudget={manualRemainingBudget}
                    setRemainingBudget={setManualRemainingBudget}
                  />
                  <h3 className="mb-4 pt-6 text-gray-900 font-semibold text-xl">
                    Resumen del Presupuesto
                  </h3>
                  {/* Resumen Manual dentro del Section */}
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
        )}
      </div>

      <BudgetPopup isOpen={isPopupOpen} onClose={closePopup} budget={budget} />
    </div>
  );
};

export default App;
