import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export const HowToSchedule = () => {
  return (
    <>
      <Container className="mt-4 mb-5 text-center" id="Agendar">
        <Row>
          <Col>
            <hr className="mb-4" />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>¿Cómo agendar una cita?</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div className="embed-responsive embed-responsive-16by9 mb-4 mt-4">
              <iframe
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/4dmZidu40FU"
                title="Medi Rec"
                allowFullScreen
                style={{ width: "100%", height: "500px" }}
              ></iframe>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" className="mt-2" href="/register">
              Agenda tu primera consulta
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
