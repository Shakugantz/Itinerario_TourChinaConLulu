import React, { useState } from "react"; // Importa React y useState para manejo de estado local
import { TextField } from "@mui/material"; // Importa componente TextField de Material UI
import { CalendarToday as CalendarTodayIcon } from "@mui/icons-material"; // Icono de calendario para las etiquetas

const DateRangePicker = ({ onDateChange }) => {
  // Estado para almacenar la fecha de inicio (mes y año, formato "YYYY-MM")
  const [startDate, setStartDate] = useState("");
  // Estado para almacenar la fecha de fin (mes y año)
  const [endDate, setEndDate] = useState("");

  // Función para validar que la fecha de fin no sea anterior a la fecha de inicio
  const isValidRange = (start, end) => {
    if (!start || !end) return true; // Si alguno no está definido, no hay problema
    // Como formato es "YYYY-MM", se puede comparar como strings lexicográficamente
    return start <= end;
  };

  // Manejador para cuando el usuario cambia la fecha de inicio
  const handleStartDateChange = (e) => {
    const date = e.target.value; // Obtiene el valor seleccionado del input
    setStartDate(date); // Actualiza el estado startDate con el nuevo valor

    // Si existe fecha fin y la fecha fin es menor que la fecha inicio, se limpia la fecha fin
    if (endDate && !isValidRange(date, endDate)) {
      setEndDate(""); // Limpia el estado endDate porque no es válido con el nuevo inicio
      onDateChange({ start: date, end: "" }); // Llama al callback con fecha fin vacía
      return; // Termina la función aquí para evitar llamar dos veces onDateChange
    }

    // Si la fecha fin existe y es válida, llama al callback con ambas fechas
    if (endDate) {
      onDateChange({ start: date, end: endDate });
    } else {
      // Si fecha fin no existe, envía solo fecha inicio y cadena vacía para fin
      onDateChange({ start: date, end: "" });
    }
  };

  // Manejador para cuando el usuario cambia la fecha de fin
  const handleEndDateChange = (e) => {
    const date = e.target.value; // Obtiene el valor del input

    // Solo acepta si la fecha fin no es anterior a la fecha inicio (si esta existe)
    if (startDate && !isValidRange(startDate, date)) {
      return; // Si no es válido, no hace nada (podrías mostrar error aquí si quieres)
    }

    setEndDate(date); // Actualiza el estado con la fecha fin seleccionada

    // Si hay fecha inicio, envía ambas fechas al callback
    if (startDate) {
      onDateChange({ start: startDate, end: date });
    } else {
      // Si no hay fecha inicio, envía fecha fin y cadena vacía para inicio
      onDateChange({ start: "", end: date });
    }
  };

  return (
    // Contenedor con grid responsivo: 1 columna en móvil, 2 columnas en desktop
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-purple-100 via-white to-purple-200 border border-gray-200 p-6 rounded-2xl shadow-md">
      {/* Selector del mes de inicio */}
      <div>
        {/* Etiqueta con ícono y texto */}
        <label
          htmlFor="start-date" // Relaciona la etiqueta con el input mediante el id
          className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2"
        >
          <CalendarTodayIcon className="text-blue-600" />{" "}
          {/* Icono de calendario */}
          Mes de inicio
        </label>

        {/* Componente TextField para seleccionar mes y año (tipo "month") */}
        <TextField
          id="start-date" // Id para relacionar con label y para accesibilidad
          type="month" // Input que permite seleccionar solo mes y año
          value={startDate} // Valor controlado por estado startDate
          onChange={handleStartDateChange} // Función para manejar cambios de fecha inicio
          inputProps={{ min: "2025-01" }} // Fecha mínima permitida (enero 2025)
          sx={{
            width: "100%", // Ancho completo del contenedor
            "& .MuiInputBase-root": {
              borderRadius: "12px", // Bordes redondeados del input
              backgroundColor: "#f9fafb", // Fondo claro
              transition: "all 0.3s", // Transición suave para hover y focus
              "&:hover": {
                backgroundColor: "#f3f4f6", // Color más claro al pasar el mouse
              },
            },
            "& input": {
              padding: "12px 16px", // Espaciado interno del texto
              fontSize: "1rem", // Tamaño de letra
              fontWeight: 500, // Peso de letra semibold
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2563eb", // Color azul en foco
              boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.2)", // Sombra azul suave en foco
            },
          }}
        />
      </div>

      {/* Selector del mes de fin */}
      <div>
        {/* Etiqueta con icono y texto */}
        <label
          htmlFor="end-date"
          className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2"
        >
          <CalendarTodayIcon className="text-blue-600" />{" "}
          {/* Icono calendario */}
          Mes de fin
        </label>

        {/* Componente TextField para seleccionar mes y año final */}
        <TextField
          id="end-date"
          type="month" // Selección mes/año
          value={endDate} // Valor controlado por estado endDate
          onChange={handleEndDateChange} // Función para manejar cambio de fecha fin
          inputProps={{ min: startDate || "2025-01" }} // Fecha mínima es inicio o enero 2025
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              borderRadius: "12px",
              backgroundColor: "#f9fafb",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            },
            "& input": {
              padding: "12px 16px",
              fontSize: "1rem",
              fontWeight: 500,
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2563eb",
              boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.2)",
            },
          }}
        />
      </div>
    </div>
  );
};

export default DateRangePicker; // Exporta el componente para usar en otras partes de la app
