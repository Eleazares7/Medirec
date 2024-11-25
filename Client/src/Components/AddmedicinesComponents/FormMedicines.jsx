import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export const FormMedicines = () => {
    const [medicineName, setMedicineName] = useState('');
    const [medicineDescription, setMedicineDescription] = useState('');
    const [medicineQuantity, setMedicineQuantity] = useState('');
    const [medicineAdminType, setMedicineAdminType] = useState('');
    const [medicineStock, setMedicineStock] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMedicine = {
            medicine_name: medicineName,
            medicine_description: medicineDescription,
            medicine_quantity: medicineQuantity,
            medicine_administration_type: medicineAdminType,
            medicine_stock: medicineStock,
        };

        Swal.fire({
            title: "¿Los datos del medicamento son correctos?",
            showDenyButton: true,
            confirmButtonText: "Si , lo son",
            denyButtonText: "Revisar",
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("http://localhost:3001/addMedicine", { newMedicine })
                    .then((response) => {
                        const { message } = response.data;

                        Swal.fire({
                            title: message,
                            icon: "success",
                            text: "Medicamento agregado correctamente",
                            confirmButtonAriaLabel: "ok"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate("/homeAdmin");
                            }
                        })

                    }).catch((error) => {
                        const message = error.response?.data?.message;
                        Swal.fire({
                            title: "ErrorQ",
                            text: message,
                            icon: "error",
                            confirmButtonText: "ok"
                        });

                    })
            } else if (result.isDenied) {
                Swal.fire(
                    "Revise sus datos y confirme el guardado de datos cuando este seguro",
                    "",
                    "info"
                );
            }
        })

    };

    return (
        <Container className="mt-4">
            {/* Centrar título */}
            <div className="text-center mb-4">
                <h2>Registrar Nuevo Medicamento</h2>
            </div>
            {/* Establecer un max-width para que el formulario sea más angosto */}
            <div className="w-50 mx-auto">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formMedicineName">
                        <Form.Label>Nombre del Medicamento</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre del medicamento"
                            value={medicineName}
                            onChange={(e) => setMedicineName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMedicineDescription">
                        <Form.Label>Descripción del Medicamento</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Ingrese la descripción del medicamento"
                            value={medicineDescription}
                            onChange={(e) => setMedicineDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMedicineQuantity">
                        <Form.Label>Cantidad (mg/ml)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ej. 500 mg o 120 ml"
                            value={medicineQuantity}
                            onChange={(e) => setMedicineQuantity(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMedicineAdminType">
                        <Form.Label>Tipo de Administración</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ej. Oral, Inyección, Inhalación"
                            value={medicineAdminType}
                            onChange={(e) => setMedicineAdminType(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMedicineStock">
                        <Form.Label>Stock Disponible</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese la cantidad de stock disponible"
                            value={medicineStock}
                            onChange={(e) => setMedicineStock(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Registrar Medicamento
                    </Button>
                </Form>
            </div>
        </Container>
    );
};
