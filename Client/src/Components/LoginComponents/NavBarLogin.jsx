import React from "react";
import { Navbar, Container, Nav, NavLink } from "react-bootstrap";

export const NavBarLogin = () => {
  return (
    <>
      <Navbar bg="primary" expand="lg" variant="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold text-light">
            Medirec
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link text-light" href="/">
                Home
              </NavLink>
              <NavLink
                to="/login"
                className="nav-link text-light"
                href="/register"
              >
                Registro
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
