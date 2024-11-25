import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const NavbarComponent = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold text-light">
          Medirec
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link text-light">
              Home
            </NavLink>
            <NavLink to="/login" className="nav-link text-light"> 
              Login
            </NavLink>
            <NavLink to="/register" className="nav-link text-light">
              Registro
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


