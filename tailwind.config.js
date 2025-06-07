/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Fuentes personalizadas
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      // Animaciones personalizadas (elige descomentando la que deseas)
      animation: {
        float: "float 3s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        gradient: "gradientBG 15s ease infinite",
        // bounce-in: "bounceIn 1s ease",
        // wiggle: "wiggle 1s ease-in-out infinite",
        // spin-slow: "spin 10s linear infinite",
        // pulse-slow: "pulse 4s ease-in-out infinite",
        // shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%, 100%": {
            textShadow: "0 0 2px #21cbf3, 0 0 4px #2196f3",
          },
          "50%": {
            textShadow: "0 0 4px #00ffff, 0 0 8px #00e0ff",
          },
        },
        gradientBG: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        // bounceIn: {
        //   "0%": { opacity: 0, transform: "scale(0.3)" },
        //   "50%": { opacity: 1, transform: "scale(1.05)" },
        //   "70%": { transform: "scale(0.9)" },
        //   "100%": { transform: "scale(1)" },
        // },
        // wiggle: {
        //   "0%, 100%": { transform: "rotate(-3deg)" },
        //   "50%": { transform: "rotate(3deg)" },
        // },
        // shake: {
        //   "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
        //   "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
        //   "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
        //   "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        // },
      },
    },
  },
  plugins: [],
};
