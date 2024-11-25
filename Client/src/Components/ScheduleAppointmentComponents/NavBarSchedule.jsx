import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useUser } from "../../Context/SaveUserData";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./../../Css/NavBarPatient.css";
import userImage from "../../assets/Images/PatientImages/userImageDefault.png";

export const NavBarSchedule = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useUser();

  const userLogOut = () => {
    logoutUser();
    toast.loading("Cerrando sesión");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Navbar bg="light" expand="lg" className="py-3">
      <Container fluid>
        <Toaster />

        {/* Nombre de la web y barra de búsqueda */}
        <Navbar.Brand href="/homePatient" className="me-3">
          <strong>Medirec</strong>
        </Navbar.Brand>

        <Form className="d-flex align-items-center me-auto ms-2">
          <FormControl
            type="search"
            placeholder="Buscar"
            aria-label="Search"
            className="me-2"
            style={{ maxWidth: "200px" }}
          />
          <Button variant="outline-dark">Buscar</Button>
        </Form>

        {/* Opciones centradas */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="nav-links">
            <Nav.Link href="/homePatient">
              <i className="bi bi-house-door"></i> Inicio
            </Nav.Link>
            <Nav.Link href="/scheduleAppointment">
              <i className="bi bi-calendar-check"></i> Agendar Cita
            </Nav.Link>
            <Nav.Link href="#medications">
              <i className="bi bi-bag"></i> Comprar Medicamentos
            </Nav.Link>
            <Nav.Link href="#history">
              <i className="bi bi-clock-history"></i> Historial de Citas
            </Nav.Link>
            <Nav.Link href="#prescriptions">
              <i className="bi bi-file-earmark-medical"></i> Historial de
              Recetas
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Usuario e información de la esquina derecha */}
        <Nav className="ms-auto">
          <NavDropdown
            title={
              <span className="d-flex align-items-center">
                <img
                  src={
                    user && user.user_google_image
                      ? user.user_google_image
                      : userImage
                  }
                  alt="User Image"
                  className="user-image me-2"
                />

                <span>{user ? user.user_name : "Invitado"}</span>
              </span>
            }
            id="nav-dropdown"
            align="end"
            className="d-inline-flex align-items-center"
          >
            <NavDropdown.Item href="#profile">Perfil</NavDropdown.Item>
            <NavDropdown.Item href="#settings">Configuración</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={userLogOut}>
              Cerrar Sesión
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};
