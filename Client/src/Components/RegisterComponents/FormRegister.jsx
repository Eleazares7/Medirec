// src/components/FormRegister.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

import { Adress } from "./AddressForm/Adress.jsx";
import {
  handleChange,
  handleAddressChange,
} from "../../AxiosRequest/Register/useFormHandlers.jsx";
import { handleSubmit } from "../../AxiosRequest/Register/submitForm.jsx";

export const FormRegister = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_paternalSurname: "",
    user_maternalSurname: "",
    user_phone: "",
    id_state: "",
    id_municipality: "",
    id_cologne: "",
    user_email: "",
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
            <h2 className="text-center mb-4">Register</h2>
            <Form onSubmit={(e) => handleSubmit(e, formData, navigate)}>
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
              <Adress
                onAddressChange={(data) =>
                  handleAddressChange(data, setFormData)
                }
              />
              <Form.Group controlId="patient_allergies" className="mb-3">
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

              <p>La contraseña debe tener almenos</p>
              <li>Una mayuscula</li>
              <li>Una minuscula</li>
              <li>Un número</li>
              <li>Un caracter especial </li>
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
