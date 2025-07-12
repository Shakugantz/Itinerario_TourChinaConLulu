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

  const [extraCosts, setExtraCosts] = useState("0");
  const [remainingBudget, setRemainingBudget] = useState("0");

  const [manualPeopleCount, setManualPeopleCount] = useState(1);
  const [manualExtraCosts, setManualExtraCosts] = useState("0");
  const [manualRemainingBudget, setManualRemainingBudget] = useState("0");
  const [manualSelectedDestinations, setManualSelectedDestinations] = useState(
    []
  );
  const [manualTransportCost, setManualTransportCost] = useState("0");
  const [manualGuideCost, setManualGuideCost] = useState("0");

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

  const [season, setSeason] = useState("");
  const [seasonManual, setSeasonManual] = useState("");

  const isHighSeason = season === "high";
  const isHighSeasonManual = seasonManual === "high";

  const { peopleCount, setPeopleCount } = usePeopleCount();

  const [manualGuide, setManualGuide] = useState(null);
  const [isManualGuideActive, setIsManualGuideActive] = useState(false);

  const [manualTransportPrices, setManualTransportPrices] = useState({});
  const [isManualTransportActive, setIsManualTransportActive] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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

  const manualBudget = useManualBudget({
    selectedDestinationsManual: manualSelectedDestinations,
    transportManual: manualTransportCost,
    guiaManual: manualGuideCost,
    extraCosts: manualExtraCosts,
    remainingBudget: manualRemainingBudget,
    cotizacionCliente: budget.totalCNY,
    isHighSeason: isHighSeasonManual,
    peopleCountManual: manualPeopleCount,
  });

  const [currentTab, setCurrentTab] = useState(1);

  const resetTab1 = () => {
    setSeason("");
    setPeopleCount(1);
    setGuideDays(0);
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

  const resetTab2 = () => {
    setManualPeopleCount(1);
    setManualExtraCosts("0");
    setManualRemainingBudget("0");
    setManualSelectedDestinations([]);
    setManualTransportCost("0");
    setManualGuideCost("0");
    setSeasonManual("");
  };

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
            isHighSeason={isHighSeason}
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
            isHighSeasonManual={isHighSeasonManual}
            manualBudget={manualBudget}
            resetTab2={resetTab2}
            peopleCount={peopleCount}
            extraCosts={extraCosts}
            remainingBudget={remainingBudget}
            selectedDestinations={selectedDestinations}
            season={season}
            setSeason={setSeason}
          />
        )}
      </div>

      <BudgetPopup isOpen={isPopupOpen} onClose={closePopup} budget={budget} />
    </AuthWrapper>
  );
};

export default App;
