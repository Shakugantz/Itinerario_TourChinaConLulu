import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  LoginRounded,
} from "@mui/icons-material";
import confetti from "canvas-confetti";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar email guardado si existe
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleConfetti = () => {
    confetti({
      particleCount: 20 + Math.floor(Math.random() * 30),
      spread: 80 + Math.random() * 60,
      angle: Math.random() * 360,
      startVelocity: 30 + Math.random() * 30,
      scalar: 0.8 + Math.random() * 1.2,
      origin: {
        x: Math.random() * 0.8 + 0.1,
        y: 0.6,
      },
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;

      await setPersistence(auth, persistence);
      await signInWithEmailAndPassword(auth, email, password);

      // Guardar o eliminar el email del localStorage
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      if (onLoginSuccess) onLoginSuccess();
      setLoading(false);
    } catch (err) {
      setError("Correo o contraseña incorrectos");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 relative">
      <div
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in"
        data-aos="zoom-in"
      >
        <h2
          className="text-3xl font-extrabold text-center text-gray-800 mb-6"
          data-aos="fade-down"
        >
          Bienvenido de nuevo
        </h2>

        <form
          onSubmit={handleLogin}
          autoComplete="on"
          className="space-y-6"
          data-aos="fade-up"
        >
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Email />
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 font-semibold animate-glow"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleConfetti();
                }}
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 font-semibold animate-glow"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleConfetti();
                }}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-purple-600"
                aria-label="Mostrar contraseña"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </div>

          {/* Recordarme */}
          <label className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
            <input
              type="checkbox"
              className="form-checkbox text-purple-600"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span>Recordarme en este dispositivo</span>
          </label>

          {/* Error */}
          {error && (
            <p
              className="text-red-500 text-sm text-center animate-pulse"
              data-aos="fade-in"
            >
              {error}
            </p>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold shadow-md transition duration-300 group ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"
            }`}
            data-aos="zoom-in"
          >
            {loading ? "Iniciando..." : "Iniciar sesión"}{" "}
            <LoginRounded className="w-6 h-6 text-yellow-300 inline-block ml-2 group-hover:animate-bounce" />
          </button>
        </form>

        <p
          className="mt-6 text-sm text-center text-gray-500"
          data-aos="fade-up"
        >
          © {new Date().getFullYear()} TourChina con Lulu - Todos los derechos
          reservados
        </p>
      </div>
    </div>
  );
};

export default Login;
