import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import SolutionImage from "./../../assets/Images/HomeImages/SolutionImage.jpg";

export const PromoSolutionsCard = () => {
  return (
    <>
      <Container className="mt-4" id="Soluciones">
        <Row>
          <Col>
            <hr className="mb-4" /> {/* Línea de separación */}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <h1>Soluciones médicas desde tu casa.</h1>
            <div className="ml-3">
              {[
                "Pagos en línea",
                "Experiencia personalizada",
                "Historial médico en tu bolsillo",
                "Recetas médicas en línea",
                "Farmacia virtual",
                "Renovación de recetas y medicamentos",
                "Conoce a tus médicos",
                "Confidencialidad médica",
                "Fácil e intuitivo",
              ].map((text, index) => (
                <div className="d-flex align-items-center mb-3" key={index}>
                  <FaCheckCircle size={24} className="mr-3" />
                  <div style={{ marginLeft: "10px" }}>
                    {" "}
                    <h5>{text}</h5>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <img
              src={SolutionImage}
              alt="Imagen de farmacia en línea"
              className="img-fluid mb-2"
              style={{ maxHeight: "500px", width: "100%" }}
            />
            <Button variant="primary" className="mt-2" href="/register">
              Agenda tu primera consulta
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
