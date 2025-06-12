// Importa los hooks useState y useEffect desde React
import { useState, useEffect } from "react";

// Importa la instancia de autenticación de Firebase configurada en tu proyecto
import { auth } from "../firebaseConfig"; // Ajusta la ruta según tu proyecto

// Importa las funciones necesarias de Firebase para manejar autenticación
import { onAuthStateChanged, signOut } from "firebase/auth";

// Hook personalizado para gestionar la autenticación de usuario
export default function useAuth() {
  // Estado para almacenar el usuario autenticado
  const [user, setUser] = useState(null);

  // useEffect para suscribirse a los cambios de estado de autenticación
  useEffect(() => {
    // Escucha los cambios de autenticación (login/logout)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Actualiza el estado con el usuario actual
    });

    // Limpia la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  // Función para cerrar sesión
  const logout = () => signOut(auth);

  // Retorna el usuario actual y la función para cerrar sesión
  return { user, logout };
}
