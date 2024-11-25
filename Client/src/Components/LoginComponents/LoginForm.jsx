// LoginForm.js
import React, { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

import ReCAPTCHA from "react-google-recaptcha";

import InputField from "../../AxiosRequest/Login/InputField";
import { SubmitButton } from "../../AxiosRequest/Login/SubmitButton";
import { LoginGoogle } from "./LoginGoogle";
import { useGoogleInit } from "../../AxiosRequest/Login/useGoogleInit";
import { useCaptcha } from "../../AxiosRequest/Login/useCaptcha";
import {
  successLogin,
  errorLogin,
} from "../../AxiosRequest/Login/Notifications";

const clientId =
  "467288965134-drgni37qcr378afu3rkedglvemtatu8m.apps.googleusercontent.com";

export const LoginForm = () => {
  // Hooks
  const navigate = useNavigate();
  useGoogleInit(clientId);
  const { captchaRef, validateCaptcha } = useCaptcha();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCaptcha()) return;

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const { message, user } = response.data;

      successLogin(message);
      setTimeout(() => navigate("/otp", { state: { data: user } }), 2000);
    } catch (error) {
      const message =
        error.response?.data?.message || "Error en el inicio de sesión";
      errorLogin(message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", maxWidth: "400px" }}
    >
      <Row className="justify-content-center w-100">
        <Col className="p-4 border rounded shadow-lg bg-light">
          <h2 className="text-center mb-4 fw-bold text-primary">
            Iniciar Sesión
          </h2>
          <Form onSubmit={handleSubmit}>
            <InputField
              label="Correo electrónico"
              type="email"
              placeholder="Introduce tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={showPassword ? <FaEyeSlash /> : <FaEye />}
              onIconClick={() => setShowPassword(!showPassword)}
            />
            <div className="d-flex justify-content-center mb-3">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey="6LerCU4qAAAAAPmvXEv78fvULZmKiSLup5WpDNta"
              />
            </div>
            <SubmitButton text="Iniciar Sesión" />

            <div className="text-center mb-3">
              <a
                href="/register"
                className="text-decoration-none text-primary fw-semibold"
              >
                ¿No tienes cuenta? Regístrate
              </a>
            </div>
            <LoginGoogle />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
