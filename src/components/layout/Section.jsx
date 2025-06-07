import React from "react";

const Section = ({ title, children }) => {
  return (
    <section
      data-aos="fade-up" // Animación AOS al hacer scroll
      data-aos-duration="800" // Duración en ms
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
    >
      {/* Título de la sección */}
      <h2 className="text-xl font-semibold mb-4 text-gray-900">{title}</h2>
      {/* Contenido dinámico */}
      {children}
    </section>
  );
};

export default Section;
