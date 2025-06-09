import React, { useMemo } from "react";
import { Man as ManIcon, AddCircle, RemoveCircle } from "@mui/icons-material";
import { Typography, IconButton, Tooltip, Stack } from "@mui/material";

const GuideSelector = ({
  peopleCount,
  selectedDays,
  onDaysChange,
  guidePrices,
  maxDays = 30, // límite máximo de días con valor por defecto
}) => {
  const dailyRate = useMemo(() => {
    const rate = guidePrices.find(
      (g) => peopleCount >= g.minPeople && peopleCount <= g.maxPeople
    );
    return rate ? rate.dailyRate : 0;
  }, [peopleCount, guidePrices]);

  const handleIncrement = () => {
    if (selectedDays < maxDays) {
      onDaysChange(selectedDays + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedDays > 0) {
      onDaysChange(selectedDays - 1);
    }
  };

  return (
    <div
      data-aos="fade-up"
      className="bg-gradient-to-br from-purple-100 via-white to-purple-200 shadow-lg p-6 rounded-2xl border border-purple-300"
    >
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
              {/* Span envuelve el botón para evitar warning al usar disabled dentro de Tooltip */}
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

      {selectedDays > 0 && (
        <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 font-medium shadow-inner">
          <p>
            Tarifa diaria para{" "}
            <span className="font-semibold">{peopleCount}</span> persona
            {peopleCount !== 1 ? "s" : ""}
          </p>
          <p className="text-2xl mt-1">¥{dailyRate.toLocaleString()}</p>
          <p className="mt-1 text-sm text-blue-700">
            Total guía ({selectedDays} día{selectedDays !== 1 ? "s" : ""}):{" "}
            <strong>¥{(dailyRate * selectedDays).toLocaleString()}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default GuideSelector;
