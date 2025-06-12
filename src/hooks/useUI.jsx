import { useState } from "react";

/**
 * useUI
 * Maneja estados UI comunes, como apertura de popups/modales
 */
export default function useUI() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  /**
   * Abre el popup
   */
  const openPopup = () => setIsPopupOpen(true);

  /**
   * Cierra el popup
   */
  const closePopup = () => setIsPopupOpen(false);

  return {
    isPopupOpen,
    openPopup,
    closePopup,
  };
}
