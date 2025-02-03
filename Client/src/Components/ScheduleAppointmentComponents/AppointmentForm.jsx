import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { getDoctors } from "../../AxiosRequest/FormDoctor/getDoctors";
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "../../Context/SaveUserData";
import { PayPalButton } from "../PayPalComponents/PayPalButton";
export const AppointmentForm = () => {
  const [doctors, setDoctors] = useState([]); // Cambiar el estado de string a array
  const [doctor, setDoctor] = useState(""); // Estado para el doctor seleccionado
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const Data = useUser();
  const userData = Data ? Data.user : "";
  const id_user = userData ? userData.id_user : "";

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formateo de la hora si es necesario
    const formattedTime = time.length === 5 ? time : "00:00";

    const appointmentData = {
      doctor,
      date,
      time: formattedTime,
      reason,
    };

    const result = await Swal.fire({
      title: "¿Los datos de su cita son correctos?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí, lo son",
      denyButtonText: "Revisar",
      icon: "question",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:3001/generateAppointment",
          {
            appointmentData,
            id_user,
          }
        );
        const message = response.data.message;

        await Swal.fire({
          title: message,
          icon: "success",
          text: "Cita agendada correctamente, ¡No faltes!",
          confirmButtonText: "Ok",
        });

      } catch (error) {
        const message =
          error.response?.data?.message || "Error al agendar la cita";
        Swal.fire({
          title: "Alerta",
          text: message,
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    } else if (result.isDenied) {
      Swal.fire(
        "Revise sus datos y confirme el guardado de datos cuando esté seguro",
        "",
        "info"
      );
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsData = await getDoctors();
        setDoctors(doctorsData); 
      } catch (error) {
        console.error("Error al obtener doctores:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Agendar Cita</h3>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <Form.Group controlId="doctorSelect" className="mb-3">
          <Form.Label>Doctor</Form.Label>
          <Form.Select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
            size="sm"
          >
            <option value="">Selecciona un doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id_doctor} value={doc.id_doctor}>
                {doc.user_name + " - " + doc.doctor_specialty}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="dateInput" className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            size="sm"
          />
        </Form.Group>

        <Form.Group controlId="timeInput" className="mb-3">
          <Form.Label>Hora</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            size="sm"
          />
        </Form.Group>

        <Form.Group controlId="reasonTextarea" className="mb-3">
          <Form.Label>Motivo</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe el motivo de la cita"
            required
            size="sm"
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Agendar
          </Button>
        </div>

        <PayPalButton/>
      </Form>
    </Container>
  );
};
