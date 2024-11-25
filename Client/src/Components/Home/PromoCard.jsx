import React from "react";
import { Card, Button, Row, Col, Image, Badge } from "react-bootstrap";

import Patient1 from "./../../assets/Images/HomeImages/Patient1.jpg";
import Patient2 from "./../../assets/Images/HomeImages//Patient2.jpg";
import Patient3 from "./../../assets/Images/HomeImages/Patient3.jpg";

import PromoCardImg from "./../../assets/Images/HomeImages/PromoCardImg.jpg";

export const PromoCard = () => {
  return (
    <Card
      className="shadow-sm my-3 p-3 rounded" 
      style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}
    >
      <Row className="g-0">
        <Col md={8} className="d-flex flex-column justify-content-center">
          <Card.Body>
            <Card.Title style={{ fontSize: "2rem" }}>
              Atención médica en línea por solo <strong>$99 MXN</strong>
            </Card.Title>
            <Button variant="primary" className="my-3">
              Comenzar consulta
            </Button>
            <div className="d-flex align-items-center">
              <Image
                src={Patient1}
                roundedCircle
                className="me-2"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <Image
                src={Patient2}
                roundedCircle
                className="me-2"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <Image
                src={Patient3}
                roundedCircle
                className="me-2"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <span>Pacientes Atendidos +10,000</span>
            </div>
          </Card.Body>
        </Col>
        <Col md={4}>
          <Image
            src={PromoCardImg}
            alt="Consulta médica"
            className="img-fluid rounded-end"
          />
        </Col>
      </Row>
    </Card>
  );
};
