import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useUser } from "../../Context/SaveUserData";
import HistorialCitas from "./../../assets/Images/PatientImages/HistorialCitas.jpg";
import Farmacia from "./../../assets/Images/PatientImages/Farmacia.jpg";
import CitaMedica from "./../../assets/Images/PatientImages/CitaMedica.jpg";
import RecetasMedicas from "./../../assets/Images/PatientImages/RecetasMedicas.jpg";
import "./../../Css/ServicesCards.css";
import { Weather } from "./Weather";
import { useNavigate } from "react-router-dom";

export const ServiceCards = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const services = [
    {
      title: "Agenda una cita",
      image: CitaMedica,
      description:
        "Reserva fácilmente una cita médica con el especialista de tu elección. Explora horarios disponibles y asegúrate de recibir la atención médica que necesitas en el momento adecuado.",
    },
    {
      title: "Compra medicamentos",
      image: Farmacia,
      description:
        "Accede a nuestra farmacia en línea para adquirir tus medicamentos de forma rápida y segura. Consulta la disponibilidad, precios y recibe tus productos directamente en tu domicilio.",
    },
    {
      title: `Historial de citas médicas de ${user ? user.user_name : "Usuario"
        }`,
      image: HistorialCitas,
      description:
        "Consulta el registro completo de tus citas médicas anteriores. Revisa detalles importantes, fechas y resultados para dar seguimiento a tu salud de manera organizada.",
    },
    {
      title: `Historial de recetas médicas de ${user ? user.user_name : "Usuario"
        }`,
      image: RecetasMedicas,
      description:
        "Mantén un control de tus recetas médicas y medicamentos prescritos. Accede a tus recetas anteriores para verificar indicaciones, dosis y recomendaciones médicas.",
    },
  ];

  return (
    <Row>
      <Col
        xs={12}
        className="mb-4" // Añadido margen inferior aquí
      >
        <Card className="text-center h-100 w-100">
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <Card.Title>Clima Actual</Card.Title>
            <Weather />
          </Card.Body>
        </Card>
      </Col>

      {services.map((service, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="h-100 service-card">
            <Card.Img
              variant="top"
              src={service.image}
              className="card-image"
            />
            <Card.Body>
              <Card.Title className="mb-2">{service.title}</Card.Title>
              <Card.Text className="text-muted mb-3">
                {service.description}
              </Card.Text>
              <Button
                variant="primary"
                block
                onClick={() => {
                  if (service.title.includes("Agenda una cita")) {
                    navigate("/scheduleAppointment")
                  } else if (service.title.includes("Compra medicamentos")) {
                    navigate("/buyMedicines");
                  } else if (
                    service.title.includes("Historial de citas médicas")
                  ) {
                    console.log("Mostrando historial de citas...");
                  } else if (
                    service.title.includes("Historial de recetas médicas")
                  ) {
                    console.log("Mostrando historial de recetas...");
                  }
                }}
              >
                {service.title.includes("Agenda una cita") && "Agendar Cita"}
                {service.title.includes("Compra medicamentos") &&
                  "Comprar Medicamentos"}
                {service.title.includes("Historial de citas médicas") &&
                  "Ver Historial de Citas"}
                {service.title.includes("Historial de recetas médicas") &&
                  "Ver Historial de Recetas"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
