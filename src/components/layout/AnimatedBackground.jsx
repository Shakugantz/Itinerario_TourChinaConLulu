import React from "react";

// Componente global que aplica un fondo degradado animado fijo en toda la app
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:400%_400%]"></div>
  );
};

export default AnimatedBackground;
