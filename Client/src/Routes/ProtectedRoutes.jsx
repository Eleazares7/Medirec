import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/",{state: {title: "¿Que intentas hacer?", text: "Primero debes iniciar sesión !!"}}); 
    }
  }, [token, navigate]);

  // Si hay token, se renderizan los hijos
  return token ? children : null;
};
