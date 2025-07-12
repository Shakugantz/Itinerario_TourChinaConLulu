import React, { useMemo, useState, useEffect } from "react";
import { Man as ManIcon, AddCircle, RemoveCircle } from "@mui/icons-material";
import {
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Checkbox,
  TextField,
} from "@mui/material";

const GuideSelector = ({
  peopleCount,
  selectedDays,
  onDaysChange,
  guidePrices,
  maxDays = 30,
  setManualGuide,
  isManualGuideActive,
  setIsManualGuideActive,
}) => {
  const [customRate, setCustomRate] = useState(0);

  // Precio diario automático según rango de personas
  const dailyRate = useMemo(() => {
    const rate = (guidePrices || []).find(
      (g) => peopleCount >= g.minPeople && peopleCount <= g.maxPeople
    );
    return rate ? rate.dailyRate : 0;
  }, [peopleCount, guidePrices]);

  // Para incrementar días
  const handleIncrement = () => {
    if (selectedDays < maxDays) {
      onDaysChange(selectedDays + 1);
    }
  };

  // Para decrementar días
  const handleDecrement = () => {
    if (selectedDays > 0) {
      onDaysChange(selectedDays - 1);
    }
  };

  // Cambia el precio manual personalizado
  const handlePriceChange = (event) => {
    const val = event.target.value;
    setCustomRate(val);
  };

  // Alterna el estado del checkbox manualPrice
  const handleCheckboxChange = () => {
    const newManualActive = !isManualGuideActive;
    setIsManualGuideActive(newManualActive);

    setManualGuide(
      newManualActive
        ? { days: selectedDays, price: Number(customRate) }
        : { days: selectedDays, price: dailyRate }
    );
  };

  // Usa el precio manual si está activo, sino el automático
  const rateToUse = isManualGuideActive ? Number(customRate) : dailyRate;

  // Sincroniza manualGuide si cambia días o precio manual
  useEffect(() => {
    if (isManualGuideActive) {
      setManualGuide({ days: selectedDays, price: Number(customRate) });
    } else {
      setManualGuide({ days: selectedDays, price: dailyRate });
    }
  }, [
    selectedDays,
    customRate,
    dailyRate,
    isManualGuideActive,
    setManualGuide,
  ]);

  return (
    <div
      data-aos="fade-up"
      className="bg-gradient-to-br from-purple-100 via-white to-purple-200 shadow-lg p-6 rounded-2xl border border-purple-300"
    >
      {/* Encabezado */}
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 shadow-md shadow-blue-300/50">
          <ManIcon className="text-3xl" />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-semibold text-gray-800">
            ¿Quieres un guía profesional?
          </p>
          <p className="text-sm text-gray-600">
            Usa los botones para seleccionar los días
          </p>
        </div>
      </div>
      {/* Selector días */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span className="text-gray-700 font-medium">Días seleccionados:</span>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Tooltip title="Disminuir días">
            <span>
              <IconButton
                onClick={handleDecrement}
                color="error"
                sx={{ padding: 1.5, touchAction: "manipulation" }}
                aria-label="Disminuir días"
                disabled={selectedDays === 0}
              >
                <RemoveCircle fontSize="large" />
              </IconButton>
            </span>
          </Tooltip>

          <Typography
            variant="h6"
            color="text.primary"
            sx={{
              minWidth: 30,
              textAlign: "center",
              fontWeight: "bold",
              px: 1,
            }}
          >
            {selectedDays}
          </Typography>

          <Tooltip
            title={
              selectedDays < maxDays ? "Aumentar días" : "Máximo alcanzado"
            }
          >
            <span>
              <IconButton
                onClick={handleIncrement}
                color="primary"
                sx={{ padding: 1.5, touchAction: "manipulation" }}
                aria-label="Aumentar días"
                disabled={selectedDays >= maxDays}
              >
                <AddCircle fontSize="large" />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </div>
      {/* Checkbox para activar precio manual solo si hay días */}
      {selectedDays > 0 && (
        <div className="flex items-center mt-4">
          <Checkbox
            checked={isManualGuideActive}
            onChange={handleCheckboxChange}
            color="primary"
          />
          <Typography variant="body1" className="ml-2 text-black">
            ¿Quieres establecer el precio manual?
          </Typography>
        </div>
      )}
      // Input para precio manual
      {isManualGuideActive && (
        <div className="mt-4">
          <TextField
            label="Precio del guía (¥)"
            type="number"
            value={customRate}
            onChange={handlePriceChange}
            fullWidth
            variant="outlined"
          />
        </div>
      )}
      {/* Mostrar tarifa y total si hay días */}
      {selectedDays > 0 && (
        <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 font-medium shadow-inner">
          <p>
            Tarifa diaria para{" "}
            <span className="font-semibold">{peopleCount}</span> persona
            {peopleCount !== 1 ? "s" : ""}
          </p>
          <p className="text-2xl mt-1">¥{rateToUse.toLocaleString()}</p>
          <p className="mt-1 text-sm text-blue-700">
            Total guía ({selectedDays} día{selectedDays !== 1 ? "s" : ""}):{" "}
            <strong>¥{(rateToUse * selectedDays).toLocaleString()}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default GuideSelector;
