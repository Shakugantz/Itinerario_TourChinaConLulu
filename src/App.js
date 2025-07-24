import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { destinations } from "./mock/destinations";

import HeaderSection from "./components/HeaderSection";
import TabsPresupuesto from "./components/layout/TabsPresupuesto";
import AnimatedBackground from "./components/layout/AnimatedBackground";
import BudgetPopup from "./components/BudgetPopup";
import AuthWrapper from "./components/AuthWrapper";
import Tab1Presupuesto from "./components/Tab1Presupuesto";
import Tab2Manual from "./components/Tab2Manual";

// Importa tus hooks aquí
import useAuth from "./hooks/useAuth";
import usePaquetesLogic from "./hooks/usePaquetesLogic";
import useTransport from "./hooks/useTransport";
import useGuide from "./hooks/useGuide";
import useUI from "./hooks/useUI";
import usePeopleCount from "./hooks/usePeopleCount";
import useBudget from "./hooks/useBudget";
import useManualBudget from "./hooks/useManualBudget";

const App = () => {
  // Estados y hooks
  const { user, logout } = useAuth();
  const [loginManuallyConfirmed, setLoginManuallyConfirmed] = useState(false);

  // Estados para Tab 1
  const [extraCosts, setExtraCosts] = useState(0); // Cambiado a número
  const [remainingBudget, setRemainingBudget] = useState(0); // Cambiado a número
  const [season, setSeason] = useState(""); // "" significa que no se ha seleccionado nada aún
  const { peopleCount, setPeopleCount } = usePeopleCount();
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
    resetTransportState, // <--- Importamos la nueva función de reinicio del transporte
  } = useTransport();
  const { guideDays, setGuideDays } = useGuide();
  const [manualGuide, setManualGuide] = useState(null);
  const [isManualGuideActive, setIsManualGuideActive] = useState(false);
  const [manualTransportPrices, setManualTransportPrices] = useState({});
  const [isManualTransportActive, setIsManualTransportActive] = useState(false);

  // Estados para Tab 2
  const [manualPeopleCount, setManualPeopleCount] = useState(1);
  const [manualExtraCosts, setManualExtraCosts] = useState("0");
  const [manualRemainingBudget, setManualRemainingBudget] = useState("0");
  const [manualSelectedDestinations, setManualSelectedDestinations] = useState(
    []
  );
  const [manualTransportCost, setManualTransportCost] = useState("0");
  const [manualGuideCost, setManualGuideCost] = useState("0");
  const [seasonManual, setSeasonManual] = useState(""); // "" significa que no se ha seleccionado nada aún
  const [importedCotizacionCNY, setImportedCotizacionCNY] = useState(0); // Para que el Tab 2 sepa la cotización importada

  const { isPopupOpen, openPopup, closePopup } = useUI();

  // Determinar si es temporada alta. Si no se ha seleccionado, se considera alta por defecto.
  const isHighSeason = season === "high" || season === "";
  const isHighSeasonManual = seasonManual === "high" || seasonManual === "";

  // Inicialización de AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const budget = useBudget({
    selectedDestinations,
    isHighSeason, // Pasamos directamente el estado procesado
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

  const manualBudget = useManualBudget({
    selectedDestinationsManual: manualSelectedDestinations,
    transportManual: manualTransportCost,
    guiaManual: manualGuideCost,
    extraCosts: manualExtraCosts,
    remainingBudget: manualRemainingBudget,
    cotizacionCliente: importedCotizacionCNY, // Usamos la cotización importada
    isHighSeason: isHighSeasonManual, // Pasamos directamente el estado procesado
    peopleCountManual: manualPeopleCount,
  });

  const [currentTab, setCurrentTab] = useState(1);

  // Función para importar data desde Tab 1 a Tab 2
  const importarData = () => {
    setManualPeopleCount(peopleCount);
    setManualExtraCosts(String(extraCosts)); // Convertir a string si Tab2 espera string
    setManualRemainingBudget(String(remainingBudget)); // Convertir a string si Tab2 espera string

    setManualSelectedDestinations([...selectedDestinations]);

    setManualTransportCost(
      budget.transport.toLocaleString("en-US", { useGrouping: false })
    );
    setManualGuideCost(
      budget.guide.toLocaleString("en-US", { useGrouping: false })
    );

    setSeasonManual(season); // Copia la temporada actual de Tab 1 a Tab 2
    setImportedCotizacionCNY(budget.totalCNY); // Actualiza la cotización para Tab 2
  };

  // --- FUNCIÓN resetTab1 ---
  const resetTab1 = () => {
    setSeason(""); // Restablecer temporada
    setPeopleCount(1); // Restablecer contador de personas
    setGuideDays(0); // Restablecer días de guía
    resetPaquetes(); // Restablecer lógica de paquetes (destinos, paquetes seleccionados)

    // Restablecer costos adicionales y presupuesto restante a números
    setExtraCosts(0);
    setRemainingBudget(0);

    // Usamos la función de reinicio expuesta por useTransport
    resetTransportState();

    setManualGuide(null); // Restablecer costo de guía manual
    setIsManualGuideActive(false); // Desactivar modo manual de guía
    setManualTransportPrices({}); // Restablecer precios de transporte manual
    setIsManualTransportActive(false); // Desactivar modo manual de transporte
  };
  // --- FIN FUNCIÓN resetTab1 ---

  // --- FUNCIÓN resetTab2 ---
  const resetTab2 = () => {
    setManualPeopleCount(1);
    setManualExtraCosts("0");
    setManualRemainingBudget("0");
    setManualSelectedDestinations([]);
    setManualTransportCost("0");
    setManualGuideCost("0");
    setSeasonManual("");
    setImportedCotizacionCNY(0); // Reiniciar también la cotización importada
  };
  // --- FIN FUNCIÓN resetTab2 ---

  // Nuevo useEffect para resetear ambos Tabs al cambiar el usuario
  useEffect(() => {
    // Si 'user' no es 'undefined' (es decir, ya se inicializó el estado de autenticación),
    // reiniciamos ambos tabs. Esto se dispara al desloguearse (user pasa a null)
    // o al loguearse un nuevo usuario (user pasa de null a un objeto).
    if (user !== undefined) {
      console.log("User state changed, resetting Tab1 and Tab2 budgets.");
      resetTab1();
      resetTab2(); // Reinicia el Tab 2 también
    }
  }, [user, resetTab1, resetTab2]); // Dependencias: 'user', y las funciones de reseteo para que useEffect las vea

  return (
    <AuthWrapper
      user={user}
      logout={logout}
      loginManuallyConfirmed={loginManuallyConfirmed}
      setLoginManuallyConfirmed={setLoginManuallyConfirmed}
    >
      <AnimatedBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <HeaderSection />
        <TabsPresupuesto
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />

        {currentTab === 1 && (
          <Tab1Presupuesto
            destinations={destinations}
            season={season}
            setSeason={setSeason}
            peopleCount={peopleCount}
            setPeopleCount={setPeopleCount}
            paquetes={paquetes}
            togglePaquete={togglePaquete}
            paqueteIds={paqueteIds}
            selectedDestinations={selectedDestinations}
            toggleDestination={toggleDestination}
            isHighSeason={isHighSeason} // Pasa el valor procesado
            guideDays={guideDays}
            setGuideDays={setGuideDays}
            transportDays={transportDays}
            updateTransportDays={updateTransportDays}
            airportServicePricesByTransport={airportServicePricesByTransport}
            handleAirportServiceChange={handleAirportServiceChange}
            manualGuide={manualGuide}
            setManualGuide={setManualGuide}
            isManualGuideActive={isManualGuideActive}
            setIsManualGuideActive={setIsManualGuideActive}
            manualTransportPrices={manualTransportPrices}
            setManualTransportPrices={setManualTransportPrices}
            isManualTransportActive={isManualTransportActive}
            setIsManualTransportActive={setIsManualTransportActive}
            extraCosts={extraCosts}
            setExtraCosts={setExtraCosts}
            remainingBudget={remainingBudget}
            setRemainingBudget={setRemainingBudget}
            budget={budget}
            openPopup={openPopup}
            resetTab1={resetTab1}
          />
        )}

        {currentTab === 2 && (
          <Tab2Manual
            destinations={destinations}
            seasonManual={seasonManual}
            setSeasonManual={setSeasonManual}
            manualPeopleCount={manualPeopleCount}
            setManualPeopleCount={setManualPeopleCount}
            manualSelectedDestinations={manualSelectedDestinations}
            setManualSelectedDestinations={setManualSelectedDestinations}
            manualExtraCosts={manualExtraCosts}
            setManualExtraCosts={setManualExtraCosts}
            manualRemainingBudget={manualRemainingBudget}
            setManualRemainingBudget={setManualRemainingBudget}
            manualTransportCost={manualTransportCost}
            setManualTransportCost={setManualTransportCost}
            manualGuideCost={manualGuideCost}
            setManualGuideCost={setManualGuideCost}
            paquetes={paquetes}
            paqueteIds={paqueteIds}
            isHighSeasonManual={isHighSeasonManual} // Pasa el valor procesado
            manualBudget={manualBudget}
            resetTab2={resetTab2}
            importarData={importarData} // Pasa la función importarData como prop
          />
        )}
      </div>

      <BudgetPopup isOpen={isPopupOpen} onClose={closePopup} budget={budget} />
    </AuthWrapper>
  );
};

export default App;
