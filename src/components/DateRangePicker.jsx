import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FaCalendarAlt } from "react-icons/fa";

const DateRangePicker = ({ onDateChange }) => {
  // Estado local para la fecha de inicio seleccionada
  const [startDate, setStartDate] = useState("");
  // Estado local para la fecha de fin seleccionada
  const [endDate, setEndDate] = useState("");

  // Función que maneja el cambio en la fecha de inicio
  // Actualiza el estado startDate y llama a onDateChange
  // solo si ya hay una fecha de fin seleccionada
  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    if (endDate) onDateChange({ start: date, end: endDate });
  };

  // Función que maneja el cambio en la fecha de fin
  // Actualiza el estado endDate y llama a onDateChange
  // solo si ya hay una fecha de inicio seleccionada
  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setEndDate(date);
    if (startDate) onDateChange({ start: startDate, end: date });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-gray-200 p-6 rounded-2xl shadow-md">
      {/* Campo para seleccionar la fecha de inicio */}
      <div>
        <label
          htmlFor="start-date"
          className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2"
        >
          <FaCalendarAlt className="text-blue-600" />
          Fecha de inicio
        </label>
        <TextField
          id="start-date"
          type="date"
          value={startDate} // Valor controlado por estado
          onChange={handleStartDateChange} // Se llama cuando cambia la fecha
          inputProps={{ min: "2025-01-01" }} // Fecha mínima permitida
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

      {/* Campo para seleccionar la fecha de fin */}
      <div>
        <label
          htmlFor="end-date"
          className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2"
        >
          <FaCalendarAlt className="text-blue-600" />
          Fecha de fin
        </label>
        <TextField
          id="end-date"
          type="date"
          value={endDate} // Valor controlado por estado
          onChange={handleEndDateChange} // Se llama cuando cambia la fecha
          inputProps={{ min: startDate || "2025-01-01" }} // Evita seleccionar fecha anterior a la de inicio
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

export default DateRangePicker;
