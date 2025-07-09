import React from "react";

const tabs = [
  { id: 1, label: "Cotización Cliente" },
  { id: 2, label: "Porcentaje ganancia" },
  /*{ id: 3, label: "Resumen final" },*/
];

const TabsPresupuesto = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="flex justify-center space-x-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
          className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
            currentTab === tab.id
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl shadow-[0_0_30px_8px_rgba(99,102,241,0.8)]"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsPresupuesto;
