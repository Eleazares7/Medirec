import React from "react";
import { Navbar, Container, NavLink , Nav} from "react-bootstrap";

export const NavBarRegister = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Medirec</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link" href="/">
              Home
            </NavLink>
            <NavLink to="/login" className="nav-link" href="/login">
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
 