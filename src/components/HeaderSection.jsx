import React, { useEffect } from "react";
import AOS from "aos"; // Librería para animaciones al hacer scroll
import "aos/dist/aos.css"; // Estilos de AOS
import { TravelExplore } from "@mui/icons-material"; // Ícono de exploración de viaje

const HeaderSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out" });
  }, []);

  return (
    <div className="text-center mb-10 select-none" data-aos="fade-down">
      {/* Contenedor flexible para ícono y título, con wrap para que baje el texto en móvil */}
      <div
        className="flex flex-wrap items-center justify-center gap-3 mb-4"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        {/* Ícono animado */}
        <TravelExplore
          className="text-cyan-300 animate-float drop-shadow-lg flex-shrink-0"
          style={{ fontSize: "3rem" }}
        />

        {/* Título principal:
            - En móviles toma todo el ancho para que pueda hacer wrap y no se oculte
            - Permite quiebre de palabra si es necesario para evitar overflow
            - flex-grow para que tome el espacio restante
            - min-w-0 para permitir reducción dentro del flex container */}
        <h1
          className="
            w-full sm:w-auto
            break-words min-w-0 flex-grow
            text-3xl sm:text-4xl md:text-5xl
            font-orbitron font-extrabold
            bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
            bg-clip-text text-transparent
            uppercase tracking-wide
            animate-glow
          "
        >
          ViajeChinaConLulu
        </h1>
      </div>

      {/* Subtítulo responsive */}
      <p
        className="text-lg md:text-xl font-poppins italic text-gray-200 tracking-wide"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        Planifica tu aventura perfecta con control total
      </p>
    </div>
  );
};

export default HeaderSection;
