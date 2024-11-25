import React from "react";
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
import userImage from "../../assets/Images/PatientImages/userImageDefault.png";

export const NavBarDoctor = () => {
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
    <Navbar bg="light" expand="lg" className="py-3 w-100 mb-4">
      <Container style={{ maxWidth: "1200px" }}>
        <Toaster />

        {/* Nombre de la web */}
        <Navbar.Brand href="/homeDoctor" className="me-3">
          <strong>Medirec</strong>
        </Navbar.Brand>

        {/* Barra de búsqueda */}
        <Form className="d-flex align-items-center me-auto ms-2">
          <FormControl
            type="search"
            placeholder="Buscar"
            aria-label="Search"
            className="me-2"
            style={{ maxWidth: "200px" }}
          />
          <Button variant="outline-primary">Buscar</Button>
        </Form>

        {/* Opciones de navegación */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="nav-links">
            <Nav.Link href="/homeDoctor">
              <i className="bi bi-house-door"></i> Inicio
            </Nav.Link>
            <Nav.Link href="/citas">Citas</Nav.Link>
            <Nav.Link href="/historial-citas">Historial Citas</Nav.Link>
            <Nav.Link href="/historial-recetas">Historial Recetas</Nav.Link>
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
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
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
