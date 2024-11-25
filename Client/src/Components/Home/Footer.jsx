import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p>
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="/privacy-policy" className="text-light mx-2">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-light mx-2">
              Terms of Service
            </a>
            <a href="/contact" className="text-light mx-2">
              Contact Us
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
