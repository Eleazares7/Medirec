import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PromoPharmacyImage from "../../assets/Images/HomeImages/PromoPharmacyImage.jpg";

export const PromoPharmacy = () => {
  return (
    <Container className="mt-4" id="Farmacia">
      <Row>
        <Col>
          <hr className="mb-4" /> 
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <h1>Farmacia en línea</h1>
          <h3 className="mb-4">No batalles en encontrar lo que necesites</h3>
          <div className="ml-3">
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div>
                  <h5>Amplia variedad de productos</h5>
                  <p className="text-muted">
                    Encuentra todo lo que necesitas en un solo lugar, desde
                    medicamentos hasta productos de cuidado personal.
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div>
                  <h5>Precios competitivos</h5>
                  <p className="text-muted">
                    Ofrecemos precios accesibles para que puedas cuidar tu salud
                    sin gastar de más.
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div>
                  <h5>Entrega rápida y segura</h5>
                  <p className="text-muted">
                    Recibe tus productos en la puerta de tu casa de manera
                    rápida y segura.
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div>
                  <h5>Atención al cliente 24/7</h5>
                  <p className="text-muted">
                    Estamos disponibles para ayudarte en cualquier momento del
                    día, los 7 días de la semana.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="image-container">
            <img
              src={PromoPharmacyImage}
              alt="Imagen de farmacia en línea"
              className="img-fluid"
            />
          </div>
          <Button variant="primary" className="mt-2" href="/register">
            Descubre lo que tenemos para ti
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
