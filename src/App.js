// ───── Librerías externas ─────
import React, { useEffect, useState, useMemo } from "react";
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
  const { user, logout } = useAuth(); // Obtiene el usuario autenticado y función de logout
  const [loginManuallyConfirmed, setLoginManuallyConfirmed] = useState(false); // Confirmación manual del login

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
  } = usePaquetesLogic(); // Lógica de paquetes y destinos

  const {
    transportDays,
    updateTransportDays,
    airportServicePricesByTransport,
    handleAirportServiceChange,
  } = useTransport(); // Lógica de transporte y servicios de aeropuerto

  const { guideDays, setGuideDays } = useGuide(); // Lógica de días para guía turístico

  const { isPopupOpen, openPopup, closePopup } = useUI(); // Estado del popup de presupuesto

  const [selectedMonth, setSelectedMonth] = useState(""); // Mes seleccionado desde el rango de fechas

  const isHighSeason = useSeason(selectedMonth); // Determina si el mes está en temporada alta

  const { peopleCount, setPeopleCount } = usePeopleCount(); // Contador de personas

  const [manualGuide, setManualGuide] = useState(null); // Estado para guía manual

  const [isManualGuideActive, setIsManualGuideActive] = useState(false); // Establecer precio para el guia

  // ───── Inicializar animaciones AOS al montar ─────
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []); // Este useEffect se ejecuta solo una vez, sin problemas de ciclo infinito

  // ───── Cálculo del presupuesto total usando hook personalizado ─────
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
    isManualGuideActive, // <--- Aquí se pasa
  });

  // ───── Mostrar login si el usuario no está autenticado o aún no confirma manualmente ─────
  if (!user || !loginManuallyConfirmed) {
    return <Login onLoginSuccess={() => setLoginManuallyConfirmed(true)} />;
  }

  return (
    <div className="min-h-screen relative py-8 px-4 sm:px-6 lg:px-8">
      {/* Botón flotante para cerrar sesión */}
      <button
        onClick={logout}
        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-red-500 via-red-600 to-red-700 
             text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform 
             hover:shadow-2xl duration-300 group"
        title="Cerrar sesión"
      >
        <Logout className="w-6 h-6 text-yellow-300 group-hover:animate-bounce" />
      </button>

      {/* Fondo animado */}
      <AnimatedBackground />

      <div className="max-w-4xl mx-auto p-8">
        {/* Título principal */}
        <HeaderSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda con formularios principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selección de fechas del viaje */}
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

            {/* Número de personas */}
            <Section title="Número de personas">
              <PeopleCounter count={peopleCount} setCount={setPeopleCount} />
            </Section>

            {/* Selector de paquetes */}
            <Section title="Paquetes">
              <PackageSelector
                paquetes={paquetes}
                togglePaquete={togglePaquete}
              />
            </Section>

            {/* Lugares a visitar */}
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

            {/* Transporte */}
            <Section title="Transporte">
              <TransportList
                transportDays={transportDays}
                updateTransportDays={updateTransportDays}
                handleAirportServiceChange={handleAirportServiceChange}
              />
            </Section>

            {/* Guía turístico */}
            <Section title="Guía turístico">
              <GuideSelector
                peopleCount={peopleCount}
                selectedDays={guideDays}
                onDaysChange={setGuideDays}
                guidePrices={guidePrices}
                setManualGuide={setManualGuide} // Aquí pasas la función setManualGuide
                isManualGuideActive={isManualGuideActive} // <-- Nuevo
                setIsManualGuideActive={setIsManualGuideActive} // <-- Nuevo
              />
            </Section>

            {/* Costos adicionales manuales */}
            <Section title="Costos Manuales">
              <ExtraCostsCard
                extraCosts={extraCosts}
                setExtraCosts={setExtraCosts}
                remainingBudget={remainingBudget}
                setRemainingBudget={setRemainingBudget}
              />
            </Section>
          </div>

          {/* Columna derecha con resumen y botón de confirmación */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-0 max-w-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Resumen del presupuesto
              </h2>
              <div className="space-y-4">
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

                {/* Totales convertidos a diferentes monedas */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900 text-sm">
                      Total estimado CNY
                    </h3>
                    <p className="text-lg font-bold text-blue-600 break-words">
                      ¥{budget.totalCNY.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900 text-sm">
                      Total estimado USD
                    </h3>
                    <p className="text-lg font-bold text-blue-600 break-words">
                      ${budget.totalUSD.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900 text-sm">
                      Total estimado EUR
                    </h3>
                    <p className="text-lg font-bold text-blue-600 break-words">
                      €{budget.totalEUR.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botón para abrir popup de confirmación */}
              <div className="mt-4">
                <button
                  onClick={openPopup}
                  className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Confirmar presupuesto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Componente emergente para mostrar presupuesto final */}
      <BudgetPopup isOpen={isPopupOpen} onClose={closePopup} budget={budget} />
    </div>
  );
};

export default App;
