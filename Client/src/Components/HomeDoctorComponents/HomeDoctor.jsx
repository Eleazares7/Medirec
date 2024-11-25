// DoctorDashboard.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { getAppointments } from "../../AxiosRequest/HomeDoctor/getAppointments";
import { useUser } from "../../Context/SaveUserData";

export const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      try {
        const appointmentsData = await getAppointments(user);

        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error al obtener las citas médicas", error);
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <Container
      fluid
      className="px-3"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <Row>
        <Col>
          <h2>Bienvenido Doctor José Eleazar</h2>
          <p>Tiene estas citas el día de hoy:</p>
        </Col>
      </Row>

      {/* Appointments Table */}
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Motivo</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appointment.user_name}</td>
                <td>{appointment.appointment_reason}</td>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.appointment_hour}</td>
                <td>{appointment.appointment_status}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="success">Atender Cita</Button>
                    <Button variant="warning">Reagendar Cita</Button>
                  </div>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No hay citas programadas.
              </td>
            </tr>
          )}
        </tbody>

      </Table>
    </Container>
  );
};


