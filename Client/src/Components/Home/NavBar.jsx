import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

export const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-primary shadow-lg py-3" variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#" className="fs-3 fw-bold text-light">
          Medirec
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav 
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#servicios" className="text-light fs-5 mx-2">Servicios</Nav.Link>
            <Nav.Link href="#Farmacia" className="text-light fs-5 mx-2">Farmacia</Nav.Link>
            <Nav.Link href="#Soluciones" className="text-light fs-5 mx-2">Soluciones</Nav.Link>
            <Nav.Link href="#Agendar" className="text-light fs-5 mx-2">¿Cómo agendar?</Nav.Link>
            <Nav.Link href="#Medicos" className="text-light fs-5 mx-2">Equipo Médico</Nav.Link>
          </Nav>
          <Button variant="outline-light" className="me-2 fw-bold" href="/login">Iniciar Sesión</Button>
          <Button variant="success" className="fw-bold" href="/register">Regístrate</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
