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
import BudgetPopup from "./components/BudgetPopup";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Logout } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";

// IDs de destinos que pertenecen a cada paquete
const paquete1Ids = [1, 2];
const paquete2Ids = [2, 3];

const App = () => {
  // Estado de autenticación de usuario
  const [user, setUser] = useState(null);

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

  // Sincroniza la selección de destinos en base a los paquetes activados
  useEffect(() => {
    const newSelected = new Set(selectedDestinations);

    // Si el paquete 1 está activo, añadir sus destinos
    if (paquetes.paquete1) paquete1Ids.forEach((id) => newSelected.add(id));
    // Si el paquete 2 está activo, añadir sus destinos
    if (paquetes.paquete2) paquete2Ids.forEach((id) => newSelected.add(id));

    // Si paquete1 se desactiva, eliminar sus destinos (que no estén en paquete2)
    if (!paquetes.paquete1)
      paquete1Ids.forEach((id) => {
        if (!paquetes.paquete2 || !paquete2Ids.includes(id))
          newSelected.delete(id);
      });

    // Si paquete2 se desactiva, eliminar sus destinos (que no estén en paquete1)
    if (!paquetes.paquete2)
      paquete2Ids.forEach((id) => {
        if (!paquetes.paquete1 || !paquete1Ids.includes(id))
          newSelected.delete(id);
      });

    // Actualizar destinos seleccionados con el conjunto modificado
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
    if (
      (paquetes.paquete1 && paquete1Ids.includes(destinationId)) ||
      (paquetes.paquete2 && paquete2Ids.includes(destinationId))
    )
      return; // No permite quitar destinos que estén en paquete activo

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

    // Retorna objeto con todos los totales y total general
    return {
      entries,
      transport,
      guide,
      airport,
      total: entries + transport + guide + airport,
    };
  }, [
    selectedDestinations,
    isHighSeason,
    peopleCount,
    transportDays,
    guideDays,
    airportServicePricesByTransport,
  ]);

  // Si el usuario no ha iniciado sesión, mostrar ventana de login
  if (!user) {
    return <Login />;
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
          </div>

          {/* Columna derecha con resumen y confirmación */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-4 max-w-full">
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
