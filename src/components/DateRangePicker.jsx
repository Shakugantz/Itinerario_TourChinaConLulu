import React, { useState } from "react";
import { TextField } from "@mui/material";
import { CalendarToday as CalendarTodayIcon } from "@mui/icons-material";

const DateRangePicker = ({ onDateChange }) => {
  // Estado para almacenar el mes seleccionado en formato "YYYY-MM"
  const [selectedMonth, setSelectedMonth] = useState("");

  /* 
  // Código comentado para usar selección de rango de fechas (fecha inicio y fin)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handler para cambio en fecha inicio
  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    onDateChange({ startDate: date, endDate }); // Enviar objeto con rango
  };

  // Handler para cambio en fecha fin
  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setEndDate(date);
    onDateChange({ startDate, endDate: date }); // Enviar objeto con rango
  };
  */

  // Función que se ejecuta cuando el usuario cambia el mes
  const handleMonthChange = (e) => {
    const month = e.target.value; // Captura el valor seleccionado
    setSelectedMonth(month); // Actualiza el estado local
    onDateChange(month); // Envía el mes seleccionado al componente padre
  };

  return (
    <div className="w-full max-w-sm p-6 rounded-3xl bg-gradient-to-br from-purple-200 via-purple-100 to-white border border-purple-300 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <label
        htmlFor="month-picker" // Conecta el label con el input para accesibilidad
        className="flex items-center gap-3 text-lg font-bold text-purple-900 mb-4 select-none"
      >
        <CalendarTodayIcon className="text-purple-600 text-2xl" />
        Mes seleccionado
      </label>

      {/* Selección solo de un mes (actual) */}
      <TextField
        id="month-picker"
        type="month"
        value={selectedMonth}
        onChange={handleMonthChange}
        inputProps={{ min: "2025-01" }}
        aria-label="Seleccionar mes y año"
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            borderRadius: "16px",
            backgroundColor: "#faf5ff",
            boxShadow: "inset 0 2px 5px rgb(160 118 204 / 0.2)",
            transition: "background-color 0.3s, box-shadow 0.3s",
            "&:hover": {
              backgroundColor: "#f3e8ff",
              boxShadow: "inset 0 3px 7px rgb(160 118 204 / 0.35)",
            },
          },
          "& input": {
            padding: "14px 18px",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#5b21b6",
            letterSpacing: "0.02em",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7c3aed",
            boxShadow: "0 0 8px 3px rgba(124, 58, 237, 0.4)",
          },
        }}
      />

      {/*
      // Código comentado para selección de rango de fechas (inicio y fin)
      <div className="mt-6 space-y-4">
        <label
          htmlFor="start-date-picker"
          className="flex items-center gap-3 text-lg font-bold text-purple-900 select-none"
        >
          <CalendarTodayIcon className="text-purple-600 text-2xl" />
          Fecha inicio
        </label>
        <TextField
          id="start-date-picker"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          inputProps={{ min: "2025-01-01" }}
          aria-label="Seleccionar fecha inicio"
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              borderRadius: "16px",
              backgroundColor: "#faf5ff",
              boxShadow: "inset 0 2px 5px rgb(160 118 204 / 0.2)",
              transition: "background-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                backgroundColor: "#f3e8ff",
                boxShadow: "inset 0 3px 7px rgb(160 118 204 / 0.35)",
              },
            },
            "& input": {
              padding: "14px 18px",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#5b21b6",
              letterSpacing: "0.02em",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7c3aed",
              boxShadow: "0 0 8px 3px rgba(124, 58, 237, 0.4)",
            },
          }}
        />

        <label
          htmlFor="end-date-picker"
          className="flex items-center gap-3 text-lg font-bold text-purple-900 select-none"
        >
          <CalendarTodayIcon className="text-purple-600 text-2xl" />
          Fecha fin
        </label>
        <TextField
          id="end-date-picker"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          inputProps={{ min: startDate || "2025-01-01" }} // No permitir fechas antes de inicio
          aria-label="Seleccionar fecha fin"
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              borderRadius: "16px",
              backgroundColor: "#faf5ff",
              boxShadow: "inset 0 2px 5px rgb(160 118 204 / 0.2)",
              transition: "background-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                backgroundColor: "#f3e8ff",
                boxShadow: "inset 0 3px 7px rgb(160 118 204 / 0.35)",
              },
            },
            "& input": {
              padding: "14px 18px",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#5b21b6",
              letterSpacing: "0.02em",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7c3aed",
              boxShadow: "0 0 8px 3px rgba(124, 58, 237, 0.4)",
            },
          }}
        />
      </div>
      */}
    </div>
  );
};

export default DateRangePicker;
