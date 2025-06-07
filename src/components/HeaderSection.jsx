import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { TravelExplore } from "@mui/icons-material";

const HeaderSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out" });
  }, []);

  return (
    <div className="text-center mb-10 select-none" data-aos="fade-down">
      {/* Contenedor de título e ícono */}
      <div
        className="inline-flex items-center justify-center gap-3 mb-4"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        {/* Ícono con animación flotante y glow */}
        <TravelExplore
          className="text-cyan-300 animate-float drop-shadow-lg"
          style={{ fontSize: "3rem" }}
        />

        {/* Título con fuente personalizada, gradiente y animación glow */}
        <h1 className="text-4xl md:text-5xl font-orbitron font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent uppercase tracking-wide animate-glow">
          ViajeChinaConLulu
        </h1>
      </div>

      {/* Subtítulo con estilo suave, fuente Poppins e ingreso animado */}
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
