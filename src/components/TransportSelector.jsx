import React, { useState, useEffect, useMemo, useCallback } from "react";
import AirportServiceSelector from "./AirportServiceSelector";
import airportsList from "../mock/airportsList";
import airportServicePrices from "../mock/airportServicePrices";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Avatar,
  Tooltip,
  Stack,
  Divider,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import {
  AddCircle,
  RemoveCircle,
  DirectionsBus,
  LocalTaxi,
  AirportShuttle,
} from "@mui/icons-material";

// Iconos según tipo de transporte
const transportIcons = {
  van: <DirectionsBus fontSize="large" color="primary" />,
  bus: <AirportShuttle fontSize="large" color="secondary" />,
  taxi: <LocalTaxi fontSize="large" sx={{ color: "#fbbf24" }} />,
};

const TransportSelector = ({
  transport,
  selectedDays,
  onDaysChange,
  onAirportServiceChange,
  manualInfo = { isManual: false, price: "" }, // Recibe datos manuales del padre
}) => {
  const [envioAirport, setEnvioAirport] = useState("");
  const [recojoAirport, setRecojoAirport] = useState("");

  // Estado local de precio manual
  const [useManualPrice, setUseManualPrice] = useState(false);
  const [manualPrice, setManualPrice] = useState("");

  // Sincronización con prop externa manualInfo
  useEffect(() => {
    if (
      manualInfo.isManual !== useManualPrice ||
      manualInfo.price !== manualPrice
    ) {
      setUseManualPrice(manualInfo.isManual || false);
      setManualPrice(manualInfo.price || "");
    }
  }, [manualInfo]);

  // Cálculo de precio envío
  const envioPrice = useMemo(() => {
    if (!envioAirport || !transport?.id) return 0;
    return airportServicePrices[transport.id]?.[envioAirport]?.envio || 0;
  }, [envioAirport, transport?.id]);

  // Cálculo de precio recojo
  const recojoPrice = useMemo(() => {
    if (!recojoAirport || !transport?.id) return 0;
    return airportServicePrices[transport.id]?.[recojoAirport]?.recojo || 0;
  }, [recojoAirport, transport?.id]);

  // Comunicación al padre de cambios
  useEffect(() => {
    if (onAirportServiceChange && transport?.id) {
      onAirportServiceChange({
        transportId: transport.id,
        envioAirport,
        recojoAirport,
        envioPrice,
        recojoPrice,
        useManualPrice,
        manualPrice: parseFloat(manualPrice) || 0,
      });
    }
  }, [
    envioAirport,
    recojoAirport,
    envioPrice,
    recojoPrice,
    transport?.id,
    useManualPrice,
    manualPrice,
    onAirportServiceChange,
  ]);

  // +1 día
  const handleIncrement = useCallback(() => {
    if (selectedDays < 30) onDaysChange(selectedDays + 1);
  }, [selectedDays, onDaysChange]);

  // -1 día
  const handleDecrement = useCallback(() => {
    if (selectedDays > 0) onDaysChange(selectedDays - 1);
  }, [selectedDays, onDaysChange]);

  // Precios dropdown envío
  const envioPrices = useMemo(() => {
    const prices = airportServicePrices[transport?.id] || {};
    return Object.fromEntries(
      Object.entries(prices).map(([key, val]) => [key, val.envio])
    );
  }, [transport?.id]);

  // Precios dropdown recojo
  const recojoPrices = useMemo(() => {
    const prices = airportServicePrices[transport?.id] || {};
    return Object.fromEntries(
      Object.entries(prices).map(([key, val]) => [key, val.recojo])
    );
  }, [transport?.id]);

  if (!transport || !transport.id) return null;

  return (
    <Card elevation={4} sx={{ mb: 3, backgroundColor: "#f9fafb" }}>
      <CardContent>
        {/* CABECERA: Avatar, nombre y precio por día */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
          mb={2}
        >
          {/* Info del transporte */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                bgcolor: "white",
                border: "2px solid #e0e0e0",
                width: 56,
                height: 56,
              }}
              variant="rounded"
            >
              {transportIcons[transport.icon] || "🚐"}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                className="text-2xl uppercase tracking-tight bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
              >
                {transport.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ¥{transport.dailyPrice} por día
              </Typography>
            </Box>
          </Stack>

          {/* Botones de control de días */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ minWidth: 120, justifyContent: "flex-end" }}
          >
            <Tooltip title="Disminuir días">
              <IconButton
                onClick={handleDecrement}
                color="error"
                sx={{ padding: 1.5 }}
              >
                <RemoveCircle fontSize="large" />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" sx={{ minWidth: 30, textAlign: "center" }}>
              {selectedDays}
            </Typography>
            <Tooltip title="Aumentar días">
              <IconButton
                onClick={handleIncrement}
                color="primary"
                sx={{ padding: 1.5 }}
              >
                <AddCircle fontSize="large" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Mostrar checkbox e input en fila independiente si hay días seleccionados */}
        {selectedDays > 0 && (
          <Stack spacing={2} mt={2}>
            {/* Checkbox para activar precio manual */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={useManualPrice}
                  onChange={(e) => setUseManualPrice(e.target.checked)}
                />
              }
              label="Usar precio manual"
            />

            {/* Input para escribir precio manual */}
            {useManualPrice && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Precio manual (¥)"
                  type="number"
                  size="small"
                  value={manualPrice}
                  onChange={(e) => setManualPrice(e.target.value)}
                  sx={{
                    width: 180,
                    bgcolor: "#ffffff",
                    boxShadow: 3,
                    borderRadius: 2,
                    "& input": {
                      textAlign: "center",
                      fontWeight: "bold",
                    },
                  }}
                  inputProps={{ min: 0 }}
                />
              </Box>
            )}
          </Stack>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Selectores de aeropuerto */}
        <Stack spacing={3}>
          <AirportServiceSelector
            label="Envío al aeropuerto"
            value={envioAirport}
            onChange={(e) => setEnvioAirport(e.target.value)}
            airportPrices={envioPrices}
            airports={airportsList}
          />
          <AirportServiceSelector
            label="Recojo del aeropuerto"
            value={recojoAirport}
            onChange={(e) => setRecojoAirport(e.target.value)}
            airportPrices={recojoPrices}
            airports={airportsList}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TransportSelector;
