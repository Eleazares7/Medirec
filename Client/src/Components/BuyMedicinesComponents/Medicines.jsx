import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Container, Pagination, Form, InputGroup, Modal, ListGroup, CloseButton } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FaShoppingCart } from 'react-icons/fa'; // Ícono del carrito
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export const Medicines = () => {
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]); // Carrito de compras
    const [showCart, setShowCart] = useState(false); // Modal del carrito
    const itemsPerPage = 10;
    const navigate = useNavigate(); // Crear instancia de navigate

    useEffect(() => {
        // Fetch medicines from the API
        axios
            .get('http://localhost:3001/getMedicines')
            .then((response) => {
                setMedicines(response.data);
                setFilteredMedicines(response.data);
            })
            .catch((error) => {
                console.error('Error fetching medicines:', error);
            });
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = medicines.filter((medicine) =>
            medicine.medicine_name.toLowerCase().includes(query)
        );
        setFilteredMedicines(filtered);
        setCurrentPage(1); // Reset to the first page when filtering
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Agregar al carrito
    const addToCart = (medicine) => {
        setCart([...cart, medicine]);
        Swal.fire({
            title: '¡Producto agregado al carrito!',
            text: `${medicine.medicine_name} ha sido agregado a tu carrito.`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });
    };

    // Eliminar del carrito
    const removeFromCart = (medicineToRemove) => {
        setCart(cart.filter((medicine) => medicine.id_medicine !== medicineToRemove.id_medicine));
    };

    // Abrir o cerrar el modal del carrito
    const toggleCartModal = () => {
        setShowCart(!showCart);
    };

    // Redirigir a la página de checkout
    const goToCheckout = () => {
        navigate('/checkout', { state: { cart } }); // Usa navigate con el estado del carrito
    };

    // Calcular los medicamentos a mostrar en la página actual
    const indexOfLastMedicine = currentPage * itemsPerPage;
    const indexOfFirstMedicine = indexOfLastMedicine - itemsPerPage;
    const currentMedicines = filteredMedicines.slice(indexOfFirstMedicine, indexOfLastMedicine);

    // Generar elementos de paginación
    const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container>
            <h1 className="my-4">Medicamentos Disponibles</h1>

            {/* Barra de búsqueda */}
            <Form className="mb-4">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Buscar medicamento por nombre..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </InputGroup>
            </Form>

            <Row>
                {currentMedicines.map((medicine) => (
                    <Col md={4} sm={6} xs={12} key={medicine.id_medicine} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{medicine.medicine_name}</Card.Title>
                                <Card.Text>{medicine.medicine_description}</Card.Text>
                                <Card.Text>
                                    <strong>Cantidad:</strong> {medicine.medicine_quantity}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Precio:</strong> ${medicine.medicine_price}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Tipo de Administración:</strong> {medicine.medicine_administration_type}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Stock:</strong> {medicine.medicine_stock}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" onClick={() => addToCart(medicine)}>
                                        Agregar al Carrito
                                    </Button>
                                    <Button variant="secondary">Información</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Paginación */}
            <Pagination className="justify-content-center mt-4">{paginationItems}</Pagination>

            {/* Carrito Modal */}
            <Modal show={showCart} onHide={toggleCartModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Carrito de Compras</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cart.length === 0 ? (
                        <p>No hay productos en el carrito.</p>
                    ) : (
                        <ListGroup>
                            {cart.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <h5>{item.medicine_name}</h5>
                                    <p>{item.medicine_description}</p>
                                    <p>
                                        <strong>Cantidad:</strong> {item.medicine_quantity}
                                    </p>
                                    <p>
                                        <strong>Precio:</strong> ${item.medicine_price}
                                    </p>
                                    <CloseButton onClick={() => removeFromCart(item)} />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleCartModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={goToCheckout}>
                        Proceder al Pago
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Botón para abrir el carrito */}
            <Button
                variant="success"
                onClick={toggleCartModal}
                className="fixed-bottom right-0 mb-4 mr-4 d-flex align-items-center justify-content-center"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                }}
            >
                <FaShoppingCart style={{ fontSize: '30px' }} />
                <span
                    className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '12px' }}
                >
                    {cart.length}
                </span>
            </Button>
        </Container>
    );
};
