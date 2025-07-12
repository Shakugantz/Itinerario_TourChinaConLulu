import React from "react";
import Login from "./Login";
import { Logout } from "@mui/icons-material";

const AuthWrapper = ({
  user,
  logout,
  loginManuallyConfirmed,
  setLoginManuallyConfirmed,
  children,
}) => {
  if (!user || !loginManuallyConfirmed) {
    return <Login onLoginSuccess={() => setLoginManuallyConfirmed(true)} />;
  }

  return (
    <>
      <button
        onClick={logout}
        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-red-500 via-red-600 to-red-700 
             text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform 
             hover:shadow-2xl duration-300 group"
        title="Cerrar sesión"
      >
        <Logout className="w-6 h-6 text-yellow-300 group-hover:animate-bounce" />
      </button>
      {children}
    </>
  );
};

export default AuthWrapper;
