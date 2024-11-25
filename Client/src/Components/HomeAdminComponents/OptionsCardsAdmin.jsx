import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import AddPatient from "../../assets/images/AdminImages/AddDoctor.jpg";
import Medicines from "../../assets/Images/AdminImages/Medicines.jpg";

function InteractiveCard({ title, text, imgSrc, buttonLabel, onButtonClick }) {
  return (
    <Card className="h-100 shadow-sm border-0 rounded mt-4">
      <Card.Img
        variant="top"
        src={imgSrc}
        alt="Card image"
        style={{ height: "350px", objectFit: "cover" }}
        className="p-3"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{title}</Card.Title>
        <Card.Text className="text-muted text-center mb-4">{text}</Card.Text>
        <Button
          variant="primary"
          className="mt-auto align-self-center"
          onClick={onButtonClick}
        >
          {buttonLabel}
        </Button>
      </Card.Body>
    </Card>
  );
}

export const OptionsCardsAdmin = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Agrega un nuevo medico",
      text: "Con un simple formulario puedes ingresar nuevos empleados Medicos dentro del sistema para que impartan consultas, recetetas medicas.",
      imgSrc: AddPatient,
      buttonLabel: "Agregar un nuevo Medico",
      onButtonClick: () => navigate("/addDoctor"),
    },
    {
      id: 2,
      title: "Administrar farmacia",
      text: "En este apartado podrás visualizar estadísticas de ventas de medicamentos, así como agregar, eliminar o modificar la información de los medicamentos disponibles.",
      imgSrc: Medicines,
      buttonLabel: "Administrar farmacia",
      onButtonClick: () => navigate("/managePharmacy"),
    },
    {
      id: 3,
      title: "Card 3",
      text: "This is the third card.",
      imgSrc: "https://via.placeholder.com/150",
      buttonLabel: "Click Me",
      onButtonClick: () => alert("Card 3 clicked!"),
    },
  ];

  return (
    <Container>
      <Row className="gy-4">
        {cards.map((card) => (
          <Col key={card.id} xs={12} sm={6} md={4}>
            <InteractiveCard
              title={card.title}
              text={card.text}
              imgSrc={card.imgSrc}
              buttonLabel={card.buttonLabel}
              onButtonClick={card.onButtonClick}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
