import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Email, Lock, LoginRounded } from "@mui/icons-material";
import confetti from "canvas-confetti";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado para desactivar botón

  // Dispara una animación de confetti al escribir
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

  // Maneja el login al hacer submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Correo o contraseña incorrectos");
      setLoading(false);
    }
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

        <form onSubmit={handleLogin} className="space-y-6" data-aos="fade-up">
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

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock />
              </span>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 font-semibold animate-glow"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleConfetti();
                }}
                required
              />
            </div>
          </div>

          {error && (
            <p
              className="text-red-500 text-sm text-center animate-pulse"
              data-aos="fade-in"
            >
              {error}
            </p>
          )}

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
