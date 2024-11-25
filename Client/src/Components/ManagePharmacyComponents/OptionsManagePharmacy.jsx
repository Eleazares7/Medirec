import React from 'react';
import Addmedicines from "../../assets/Images/AdminImages/Addmedicines.webp";
import InventoryMedicines from "../../assets/Images/AdminImages/InventoryMedicines.webp";
import MedicineStatistics from "../../assets/Images/AdminImages/MedicineStatistics.webp";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "../../Css/OptionsManagePharmacy.css"
import { useNavigate } from 'react-router-dom';

export const OptionsManagePharmacy = () => {
    const navigate = useNavigate();
    return (
        <Container className="mt-4">
            {/* Encabezados */}
            <Row className="mb-4">
                <Col>
                    <h1 className="text-start">Bienvenido José Eleazar</h1>
                    <h4 className="text-start">¿Qué haremos el día de hoy?</h4>
                </Col>
            </Row>

            {/* Tarjetas */}
            <Row className="g-4">
                {/* Card 1 */}
                <Col md={4}>
                    <Card className="custom-card">
                        <Card.Img
                            variant="top"
                            src={Addmedicines}
                            alt="Agregar Medicamento"
                            className="card-image"
                        />
                        <Card.Body>
                            <Card.Title>Agregar Medicamento</Card.Title>
                            <Card.Text>
                                Aquí puedes añadir nuevos medicamentos al inventario de la farmacia.
                            </Card.Text>
                            <Button variant="primary" onClick={()=> navigate("/addMedicine")}>Agregar Medicamento</Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card 2 */}
                <Col md={4}>
                    <Card className="custom-card">
                        <Card.Img
                            variant="top"
                            src={InventoryMedicines}
                            alt="Tabla Medicamentos"
                            className="card-image"
                        />
                        <Card.Body>
                            <Card.Title>Tabla Medicamentos</Card.Title>
                            <Card.Text>
                                Consulta y gestiona todos los medicamentos existentes en el inventario.
                            </Card.Text>
                            <Button variant="primary" onClick={()=> navigate("/tableMedicines")}>Tabla Medicamentos</Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card 3 */}
                <Col md={4}>
                    <Card className="custom-card">
                        <Card.Img
                            variant="top"
                            src={MedicineStatistics}
                            alt="Estadísticas Medicamentos"
                            className="card-image"
                        />
                        <Card.Body>
                            <Card.Title>Estadísticas Medicamentos (Ventas)</Card.Title>
                            <Card.Text>
                                Visualiza las estadísticas de ventas y el rendimiento de los medicamentos.
                            </Card.Text>
                            <Button variant="primary">Ver Estadísticas</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
