//Hooks
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Libraries components
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

// Components
import { AdressGoogle } from "./AddressForm/AdressGoogle.jsx";
import {
  handleChange,
  handleAddressChange,
} from "../../AxiosRequest/Register/useFormHandlers.jsx";
import { handleSubmitGoogle } from "../../AxiosRequest/RegisterGoogle/submitFormGoogle.jsx";

export const FormRegisterGoogle = () => {
  //Data recived  LoginGoogle -> FormRegisterGoogle
  const location = useLocation();
  const { userData } = location.state || {};

  const [formData, setFormData] = useState({
    user_name: "",
    user_paternalSurname: "",
    user_maternalSurname: "",
    user_phone: "",
    id_state: "",
    id_municipality: "",
    id_cologne: "",
    user_email: userData.email,
    user_password: "",
    patient_birthday_date: "",
    patient_allergies: "",
  });

  const navigate = useNavigate();

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="text-center mb-4">Bienvenid@ {userData.name}</h2>
            <p className="text-center mb-4">
              Para que tengas una mejor experiencia con nosotros de favor
              ingresa los siguientes datos
            </p>
            <Form
              onSubmit={(e) =>
                handleSubmitGoogle(e, formData, navigate, userData)
              }
            >
              <Form.Group controlId="user_name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  value={formData.user_name}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="form-control-sm"
                />
              </Form.Group>
              <Form.Group controlId="user_paternalSurname" className="mb-3">
                <Form.Label>Paternal Surname</Form.Label>
                <Form.Control
                  type="text"
                  name="user_paternalSurname"
                  placeholder="Enter your paternal surname"
                  value={formData.user_paternalSurname}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="form-control-sm"
                />
              </Form.Group>
              <Form.Group controlId="user_maternalSurname" className="mb-3">
                <Form.Label>Maternal Surname</Form.Label>
                <Form.Control
                  type="text"
                  name="user_maternalSurname"
                  placeholder="Enter your maternal surname"
                  value={formData.user_maternalSurname}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="form-control-sm"
                />
              </Form.Group>
              <Form.Group controlId="user_phone" className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="user_phone"
                  placeholder="Enter your phone number"
                  value={formData.user_phone}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="form-control-sm"
                />
              </Form.Group>
              <AdressGoogle
                onAddressChange={(data) =>
                  handleAddressChange(data, setFormData)
                }
              />
              <Form.Group controlId="patient_birthday" className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  name="patient_birthday_date"
                  value={formData.patient_birthday_date}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="form-control-sm"
                  required
                />
              </Form.Group>
              <Form.Group controlId="patient_allergies" className="mb-3">
                <Form.Label>Allergies</Form.Label>
                <Form.Control
                  type="text"
                  name="patient_allergies"
                  placeholder="Enter your allergies"
                  value={formData.patient_allergies}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="form-control-sm"
                  required
                />
              </Form.Group>
              <Form.Group controlId="user_email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="user_email"
                  placeholder="Enter your email"
                  value={formData.user_email}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="form-control-sm"
                />
              </Form.Group>
              <Form.Group controlId="user_password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="user_password"
                  placeholder="Enter your password"
                  value={formData.user_password}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="form-control-sm"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-4">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
        <Toaster />
      </Container>
    </>
  );
};
