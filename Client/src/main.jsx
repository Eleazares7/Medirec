import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/Css/bootstrap.css";
import { Routes } from "./Routes/Routes.jsx";

import { UserProvider } from "./Context/SaveUserData.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "467288965134-drgni37qcr378afu3rkedglvemtatu8m.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <StrictMode>
      <UserProvider>
        <Routes />
      </UserProvider>
    </StrictMode>
  </GoogleOAuthProvider>
);
