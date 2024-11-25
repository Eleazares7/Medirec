import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  handleChange,
  handleAddressChange,
} from "../../AxiosRequest/RegisterDoctor/useFormHandlers";
import { handleSubmit } from "../../AxiosRequest/RegisterDoctor/submitForm";
import { Adress } from "../RegisterComponents/AddressForm/Adress";
import { getDoctors } from "../../AxiosRequest/FormDoctor/getDoctors";
export const FormAddDoctor = () => {
  const navigate = useNavigate();

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
    doctor_speciality: "",
    doctor_licence_number_profesional: "",
  });

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="text-center mb-4">Registro Medico</h2>
            <Form onSubmit={(e) => handleSubmit(e, formData, navigate)}>
              <Form.Group controlId="user_name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="user_name"
                  placeholder="Enter the doctor's name"
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
              <Form.Group controlId="doctor_speciality" className="mb-3">
                <Form.Label>Doctor's speciality</Form.Label>
                <Form.Control
                  type="text"
                  name="doctor_speciality"
                  placeholder="Enter the doctor's speciality"
                  value={formData.doctor_speciality}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="form-control-sm"
                />
              </Form.Group>

              <Form.Group
                controlId="doctor_licence_number_profesional"
                className="mb-3"
              >
                <Form.Label>Professional ID</Form.Label>
                <Form.Control
                  type="text"
                  name="doctor_licence_number_profesional"
                  placeholder="Enter the doctor's professional ID"
                  value={formData.doctor_licence_number_profesional}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="form-control*sm"
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
      </Container>
    </>
  );
};
