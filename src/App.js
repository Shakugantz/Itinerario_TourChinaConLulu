import React, { useState, useEffect, useMemo } from "react";
// Importación de datos simulados para destinos, transportes y guías
import { destinations } from "./mock/destinations";
import { transports } from "./mock/transports";
import { guidePrices } from "./mock/guides";
// Importación de componentes reutilizables
import TransportList from "./components/TransportList";
import GuideSelector from "./components/GuideSelector";
import DateRangePicker from "./components/DateRangePicker";
import SummaryCard from "./components/SummaryCard";
import PeopleCounter from "./components/PeopleCounter";
import PackageSelector from "./components/PackageSelector";
import Section from "./components/layout/Section";
import AnimatedBackground from "./components/layout/AnimatedBackground";
import HeaderSection from "./components/HeaderSection";
import DestinationList from "./components/DestinationList";
import Login from "./components/Login";
import ExtraCostsCard from "./components/ExtraCostsCard";
import BudgetPopup from "./components/BudgetPopup";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Logout } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";

// IDs de destinos que pertenecen a cada paquete
const paquete1Ids = [1, 2, 3];
const paquete2Ids = [6];
const paquete3Ids = [4, 5];
const paquete4Ids = [2, 3, 11];
const paquete5Ids = [2, 4];

const App = () => {
  // Estado de autenticación de usuario
  const [user, setUser] = useState(null);
  // Estado que indica si el usuario hizo clic en "Iniciar sesión"
  const [loginManuallyConfirmed, setLoginManuallyConfirmed] = useState(false);

  // Inicializa las animaciones AOS una sola vez al montar el componente
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    // Escuchar cambios de sesión
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Estado para contar personas que viajan
  const [peopleCount, setPeopleCount] = useState(1);
  // Estado para destinos seleccionados manualmente o por paquete
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  // Estado que guarda si un paquete está seleccionado o no
  const [paquetes, setPaquetes] = useState({
    paquete1: false,
    paquete2: false,
    paquete3: false,
    paquete4: false,
    paquete5: false,
  });
  // Estado para días que se usará cada tipo de transporte
  const [transportDays, setTransportDays] = useState({});
  // Estado para días con guía turístico contratado
  const [guideDays, setGuideDays] = useState(0);
  // Estado para el rango de fechas del viaje
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  // Estado para saber si es temporada alta (abril-octubre)
  const [isHighSeason, setIsHighSeason] = useState(false);
  // Estado para precios adicionales de servicios de aeropuerto por transporte
  const [airportServicePricesByTransport, setAirportServicePricesByTransport] =
    useState({});
  // Estado para controlar el Popup de presupuesto
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // --- Importante:
  // Los costos adicionales y costos restantes se almacenan como strings para permitir edición sin forzar 0 ---
  const [extraCosts, setExtraCosts] = useState("0"); // Costos adicionales (string para input)
  const [remainingBudget, setRemainingBudget] = useState("0"); // Costos restantes (string para input)

  // Sincroniza la selección de destinos en base a los paquetes activados
  useEffect(() => {
    const newSelected = new Set();

    // Añadir destinos de paquetes activos
    if (paquetes.paquete1) paquete1Ids.forEach((id) => newSelected.add(id));
    if (paquetes.paquete2) paquete2Ids.forEach((id) => newSelected.add(id));
    if (paquetes.paquete3) paquete3Ids.forEach((id) => newSelected.add(id));
    if (paquetes.paquete4) paquete4Ids.forEach((id) => newSelected.add(id));
    if (paquetes.paquete5) paquete5Ids.forEach((id) => newSelected.add(id));

    // Conjunto de destinos que deben eliminarse si su paquete fue desactivado y no pertenecen a otros paquetes activos
    const allPaqueteIds = {
      paquete1: paquete1Ids,
      paquete2: paquete2Ids,
      paquete3: paquete3Ids,
      paquete4: paquete4Ids,
      paquete5: paquete5Ids,
    };

    // Si un paquete se desactiva, elimina destinos no incluidos en otros paquetes
    Object.entries(allPaqueteIds).forEach(([paqueteKey, ids]) => {
      if (!paquetes[paqueteKey]) {
        ids.forEach((id) => {
          // Verifica si ese destino sigue incluido en otro paquete activo
          const stillIncluded = Object.entries(allPaqueteIds).some(
            ([otherKey, otherIds]) =>
              otherKey !== paqueteKey &&
              paquetes[otherKey] &&
              otherIds.includes(id)
          );
          if (!stillIncluded) newSelected.delete(id);
        });
      }
    });

    setSelectedDestinations(Array.from(newSelected));
  }, [paquetes]);

  // Detecta si las fechas seleccionadas están en temporada alta (abril a octubre)
  useEffect(() => {
    if (!dateRange.start || !dateRange.end) return;

    const [startMonth, endMonth] = [
      new Date(dateRange.start).getMonth() + 1,
      new Date(dateRange.end).getMonth() + 1,
    ];

    setIsHighSeason(
      (startMonth >= 4 && startMonth <= 10) || (endMonth >= 4 && endMonth <= 10)
    );
  }, [dateRange]);

  // Alterna el estado de selección de un paquete
  const togglePaquete = (paquete) => {
    setPaquetes((prev) => ({ ...prev, [paquete]: !prev[paquete] }));
  };

  // Alterna la selección individual de un destino (solo si no está en paquete)
  const toggleDestination = (destinationId) => {
    // No permite quitar destinos que estén en paquete activo (para evitar inconsistencias)
    if (
      (paquetes.paquete1 && paquete1Ids.includes(destinationId)) ||
      (paquetes.paquete2 && paquete2Ids.includes(destinationId)) ||
      (paquetes.paquete3 && paquete3Ids.includes(destinationId)) ||
      (paquetes.paquete4 && paquete4Ids.includes(destinationId)) ||
      (paquetes.paquete5 && paquete5Ids.includes(destinationId))
    )
      return;

    setSelectedDestinations((prev) =>
      prev.includes(destinationId)
        ? prev.filter((id) => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  // Actualiza la cantidad de días para un transporte dado
  const updateTransportDays = (transportId, days) => {
    setTransportDays((prev) => ({ ...prev, [transportId]: days }));
  };

  // Actualiza los precios de servicios de aeropuerto recibidos del componente hijo TransportSelector
  const handleAirportServiceChange = ({
    transportId,
    envioPrice,
    recojoPrice,
  }) => {
    setAirportServicePricesByTransport((prev) => ({
      ...prev,
      [transportId]: { envioPrice, recojoPrice },
    }));
  };

  // Calcula el presupuesto total usando useMemo para optimizar cálculos
  const budget = useMemo(() => {
    // Suma los precios de entradas para los destinos seleccionados y cantidad de personas
    const entries =
      selectedDestinations.reduce((sum, destId) => {
        const dest = destinations.find((d) => d.id === destId);
        return (
          sum + (isHighSeason ? dest.highSeasonPrice : dest.lowSeasonPrice)
        );
      }, 0) * peopleCount;

    // Suma el costo total de transporte basado en días y precio diario
    const transport = Object.entries(transportDays).reduce(
      (sum, [id, days]) => {
        const t = transports.find((t) => t.id === parseInt(id));
        return sum + (t ? t.dailyPrice * days : 0);
      },
      0
    );

    // Obtiene tarifa guía según cantidad de personas y días
    const guideRate = guidePrices.find(
      (g) => peopleCount >= g.minPeople && peopleCount <= g.maxPeople
    );
    const guide = guideRate ? guideRate.dailyRate * guideDays : 0;

    // Suma precios de servicios de aeropuerto por transporte
    const airport = Object.values(airportServicePricesByTransport).reduce(
      (sum, s) => sum + (s.envioPrice || 0) + (s.recojoPrice || 0),
      0
    );

    // Convierte costos adicionales y costos restantes de string a número para sumar/restar
    const extraCostsNum = Number(extraCosts) || 0;
    const remainingBudgetNum = Number(remainingBudget) || 0;

    // Calcula el total final del presupuesto
    const total =
      entries +
      transport +
      guide +
      airport +
      extraCostsNum -
      remainingBudgetNum;

    // Retorna objeto con todos los valores calculados
    return {
      entries,
      transport,
      guide,
      airport,
      extraCosts: extraCostsNum,
      remainingBudget: remainingBudgetNum,
      total,
    };
  }, [
    selectedDestinations,
    isHighSeason,
    peopleCount,
    transportDays,
    guideDays,
    airportServicePricesByTransport,
    extraCosts,
    remainingBudget,
  ]);

  // Mostrar login hasta que el usuario confirme manualmente que desea iniciar sesión
  if (!user || !loginManuallyConfirmed) {
    return <Login onLoginSuccess={() => setLoginManuallyConfirmed(true)} />;
  }

  return (
    <div className="min-h-screen relative py-8 px-4 sm:px-6 lg:px-8">
      {/* Botón cerrar sesión espectacular y fijo al hacer scroll */}
      <button
        onClick={() => signOut(auth)}
        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-red-500 via-red-600 to-red-700 
             text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform 
             hover:shadow-2xl duration-300 group"
        title="Cerrar sesión"
      >
        <Logout className="w-6 h-6 text-yellow-300 group-hover:animate-bounce" />
      </button>

      {/* Background animado */}
      <AnimatedBackground />
      <div className="max-w-4xl mx-auto p-8">
        {/* Encabezado principal */}
        <HeaderSection />

        {/* Contenedor principal con 3 columnas en pantalla grande */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda y central con formularios y selecciones */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selector de fechas */}
            <Section title="Fechas del viaje">
              <DateRangePicker onDateChange={setDateRange} />
              {dateRange.start && dateRange.end && (
                <p className="mt-3 text-sm text-gray-500">
                  {isHighSeason
                    ? "Estás en temporada alta (Abril-Octubre)"
                    : "Estás en temporada baja (Noviembre-Marzo)"}
                </p>
              )}
            </Section>

            {/* Selector número de personas */}
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

            {/* Selección de destinos */}
            <Section title="Lugares a visitar">
              <DestinationList
                destinations={destinations}
                selectedDestinations={selectedDestinations}
                toggleDestination={toggleDestination}
                paquetes={paquetes}
                paquete1Ids={paquete1Ids}
                paquete2Ids={paquete2Ids}
                paquete3Ids={paquete3Ids}
                paquete4Ids={paquete4Ids}
                paquete5Ids={paquete5Ids}
                isHighSeason={isHighSeason}
              />
            </Section>

            {/* Selección de transportes */}
            <Section title="Transporte">
              <TransportList
                transportDays={transportDays}
                updateTransportDays={updateTransportDays}
                handleAirportServiceChange={handleAirportServiceChange}
              />
            </Section>

            {/* Selector de guía turístico */}
            <Section title="Guía turístico">
              <GuideSelector
                peopleCount={peopleCount}
                selectedDays={guideDays}
                onDaysChange={setGuideDays}
                guidePrices={guidePrices}
              />
            </Section>
            {/* Sección costos extras */}
            <Section title="Costos Manuales">
              <ExtraCostsCard
                extraCosts={extraCosts}
                setExtraCosts={setExtraCosts}
                remainingBudget={remainingBudget}
                setRemainingBudget={setRemainingBudget}
              />
            </Section>
          </div>

          {/* Columna derecha con resumen y confirmación */}
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
                {/* Total general */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">
                      Total estimado
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 break-words">
                      ${budget.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              {/* Botón para confirmar presupuesto */}
              <button
                onClick={() => setIsPopupOpen(true)}
                className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Confirmar presupuesto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup del presupuesto */}
      <BudgetPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        budget={budget}
      />
    </div>
  );
};

export default App;
