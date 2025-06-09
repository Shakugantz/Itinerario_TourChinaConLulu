import React, { useState, useEffect, useMemo, useCallback } from "react";
import AirportServiceSelector from "./AirportServiceSelector"; // Componente reutilizable para seleccionar aeropuerto
import airportsList from "../mock/airportsList"; // Lista de aeropuertos disponibles
import airportServicePrices from "../mock/airportServicePrices"; // Precios por aeropuerto y transporte

// Importa componentes de diseño y todos los íconos en una sola línea
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
} from "@mui/material";
import {
  AddCircle,
  RemoveCircle,
  DirectionsBus,
  LocalTaxi,
  AirportShuttle,
} from "@mui/icons-material";

// Diccionario de íconos visuales por tipo de transporte
const transportIcons = {
  van: <DirectionsBus fontSize="large" color="primary" />, // Van turística
  bus: <AirportShuttle fontSize="large" color="secondary" />, // Autobús de lujo
  taxi: <LocalTaxi fontSize="large" sx={{ color: "#fbbf24" }} />, // Taxi personalizado
};

// Componente principal para seleccionar tipo de transporte, días y servicios al aeropuerto
const TransportSelector = ({
  transport, // Objeto del transporte seleccionado
  selectedDays, // Número de días seleccionados por el usuario
  onDaysChange, // Función que actualiza el número de días
  onAirportServiceChange, // Función que notifica los cambios en servicios aeropuerto
}) => {
  // Hooks de estado para guardar aeropuertos seleccionados
  const [envioAirport, setEnvioAirport] = useState("");
  const [recojoAirport, setRecojoAirport] = useState("");

  // Calcula el precio de envío al aeropuerto usando useMemo para optimización
  const envioPrice = useMemo(() => {
    if (!envioAirport || !transport?.id) return 0;
    return airportServicePrices[transport.id]?.[envioAirport]?.envio || 0;
  }, [envioAirport, transport?.id]);

  // Calcula el precio de recojo del aeropuerto
  const recojoPrice = useMemo(() => {
    if (!recojoAirport || !transport?.id) return 0;
    return airportServicePrices[transport.id]?.[recojoAirport]?.recojo || 0;
  }, [recojoAirport, transport?.id]);

  // Efecto que notifica cambios en selección de aeropuertos y sus precios
  useEffect(() => {
    if (onAirportServiceChange && transport?.id) {
      onAirportServiceChange({
        transportId: transport.id,
        envioAirport,
        recojoAirport,
        envioPrice,
        recojoPrice,
      });
    }
  }, [
    envioAirport,
    recojoAirport,
    envioPrice,
    recojoPrice,
    transport?.id,
    onAirportServiceChange,
  ]);

  // Incrementar número de días (máximo 30)
  const handleIncrement = useCallback(() => {
    if (selectedDays < 30) onDaysChange(selectedDays + 1);
  }, [selectedDays, onDaysChange]);

  // Disminuir número de días (mínimo 0)
  const handleDecrement = useCallback(() => {
    if (selectedDays > 0) onDaysChange(selectedDays - 1);
  }, [selectedDays, onDaysChange]);

  // Crea objeto de precios solo para envío
  const envioPrices = useMemo(() => {
    const prices = airportServicePrices[transport?.id] || {};
    return Object.fromEntries(
      Object.entries(prices).map(([key, val]) => [key, val.envio])
    );
  }, [transport?.id]);

  // Crea objeto de precios solo para recojo
  const recojoPrices = useMemo(() => {
    const prices = airportServicePrices[transport?.id] || {};
    return Object.fromEntries(
      Object.entries(prices).map(([key, val]) => [key, val.recojo])
    );
  }, [transport?.id]);

  // Si no hay transporte válido, no renderiza nada
  if (!transport || !transport.id) return null;

  return (
    <Card elevation={4} sx={{ mb: 3, backgroundColor: "#f9fafb" }}>
      <CardContent>
        {/* Cabecera: ícono, nombre del transporte, precio por día y controles de días */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
          mb={2}
          sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Ícono del tipo de transporte con Avatar MUI */}
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

          {/* Botones de incremento y decremento */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              flexShrink: 0,
              minWidth: 120,
              justifyContent: "flex-end",
              flexWrap: "nowrap",
            }}
          >
            <Tooltip title="Disminuir días">
              <IconButton
                onClick={handleDecrement}
                color="error"
                sx={{ padding: 1.5, touchAction: "manipulation" }}
              >
                <RemoveCircle fontSize="large" />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ minWidth: 30, textAlign: "center" }}
            >
              {selectedDays}
            </Typography>
            <Tooltip title="Aumentar días">
              <IconButton
                onClick={handleIncrement}
                color="primary"
                sx={{ padding: 1.5, touchAction: "manipulation" }}
              >
                <AddCircle fontSize="large" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Selectores de servicios al aeropuerto */}
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
