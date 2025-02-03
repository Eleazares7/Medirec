import React from 'react';
import { useLocation } from 'react-router-dom';
import { PayPalButton } from '../PayPalComponents/PayPalButton';
import { Container, Card, Table, Button } from 'react-bootstrap';

export const CheckoutPage = () => {
    const location = useLocation();
    const cart = location?.state?.cart || [];

    const totalAmount = cart.reduce((sum, item) => {
        const price = parseFloat(item.medicine_price) || 0;
        const quantity = parseInt(item.medicine_quantity) || 0;
        return sum + price;
    }, 0);

    if (cart.length === 0) {
        return (
            <Container className="text-center mt-5">
                <h2>No hay productos en el carrito para procesar el checkout.</h2>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h1 className="mb-4">Checkout</h1>
            <Card className="p-3 mb-4">
                <h2>Detalles del Pedido</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.medicine_name}</td>
                                <td>{item.medicine_description}</td>
                                <td>{item.medicine_quantity}</td>
                                <td>${parseFloat(item.medicine_price).toFixed(2)}</td>
                                <td>
                                    ${(
                                        parseFloat(item.medicine_price)
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <h3 className="text-end mt-3">
                    <strong>Total:</strong> ${totalAmount.toFixed(2)}
                </h3>
            </Card>
            <Card className="p-3">
                <h2>Pago</h2>
                <PayPalButton cart={cart} />
            </Card>
        </Container>
    );
};
