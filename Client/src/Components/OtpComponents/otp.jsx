//Hooks
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//Library
import axios from "axios";

//Componentes libraries
import toast, { Toaster } from "react-hot-toast";
import { Button, Container } from "react-bootstrap";

// Context
import { useUser } from "../../Context/SaveUserData";

//Components
import { OtpInput } from "./OutputInput";
import { NavbarComponent } from "./NavbarComponent";

export const OTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState();
  const [qr, setQr] = useState("");
  const location = useLocation();


  const { data } = location.state || {};
  const { loginUser } = useUser();
  

  const navigate = useNavigate();

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^[0-9]*$/.test(value) || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (!otpCode.trim()) {
      toast.error("Ingresa un OTP válido");
      return;
    }

    if (otpCode.length < 6) {
      toast.error("Ingresa un OTP completo");
      return;
    }



    //verify otp
    try {
      const response = await axios.post("http://localhost:3001/verifyOtp", {
        otpCode,
        secret,
      });
      const verify = response.data.success;

      if (!verify) {
        toast.error("OTP FAIL");
        return;
      }

      const roleMessages = {
        patient: {
          message: `¡Bienvenido, Paciente! ${data.user_name}`,
          path: "/homePatient",
        },
        doctor: { message: `¡Bienvenido, Doctor! ${data.user_name}` , path: "/homeDoctor" },
        admin: {
          message: `¡Bienvenido, Administrador! ${data.user_name}`,
          path: "/homeAdmin",
        },
      };

      const userRole = roleMessages[data.id_rol];

      if (userRole) {
        toast.success(userRole.message);
        setTimeout(() => {
          loginUser(data,token);
          navigate(userRole.path);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/getDataSecret",
          {
            userId: data.id_user,
            data
          }
        );
        const { secret, qrCode, token } = response.data;
        setSecret(secret);
        setQr(qrCode);
        setToken(token);
      } catch (error) {
        console.error("Error fetching secret:", error);
      }
    };
    fetchSecret();
  }, [data]);

  return (
    <>
      <NavbarComponent />
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh", textAlign: "center" }}
      >
        <Toaster />
        <h4 className="mb-4">
          Please scan the QR code or manually enter the code in the Google
          Authenticator app.
        </h4>
        <h5 className="mb-3">{secret}</h5>
        {qr && (
          <img
            src={qr}
            alt="QR Code"
            style={{ width: "200px", height: "200px", marginBottom: "20px" }}
          />
        )}
        <OtpInput
          otp={otp}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
        />
        <Button
          type="submit"
          variant="primary"
          className="mt-4"
          style={{ width: "100%", padding: "10px", fontSize: "1.25rem" }}
          onClick={handleSubmit}
        >
          Submit OTP
        </Button>
        <p className="mt-3" style={{ color: "#6c757d" }}>
          Please enter the OTP within 30 seconds to ensure it is valid.
        </p>
      </Container>
    </>
  );
};
