import React, { useEffect } from 'react';
import axios from 'axios';

export const PayPalButton = ({ cart }) => {
    useEffect(() => {
        if (!window.paypal) {
            const script = document.createElement('script');
            script.src = "https://www.paypal.com/sdk/js?client-id=AZHoktB7ICTbiaqk7TXB_moLDgIN5Vo5vjc2StdbwiuyuOLLHxZ234Oh0-2-I14iC6hWr7-NXV_BIpl5&components=buttons";
            script.async = true;
            script.onload = () => {
                const totalAmount = cart.reduce((sum, item) => {
                    const price = parseFloat(item.medicine_price) || 0;
                    const quantity = parseInt(item.medicine_quantity) || 0;
                    return sum + price * quantity;
                }, 0);

                window.paypal.Buttons({
                    createOrder: async function () {
                        const response = await axios.post('http://localhost:3001/create-order', {
                            items: cart.map((item) => ({
                                name: item.medicine_name,
                                quantity: item.medicine_quantity,
                                price: item.medicine_price,
                            })),
                            total: totalAmount.toFixed(2),
                        });
                        return response.data.id;
                    },
                    onApprove: async function (data) {
                        try {
                            const response = await axios.post('http://localhost:3001/capture-order', {
                                orderID: data.orderID,
                            });
                            alert('Pago completado con éxito.');
                        } catch (error) {
                            alert('Error al procesar el pago: ' + error.message);
                        }
                    },
                }).render('#paypal-button-container');
            };
            document.body.appendChild(script);
        }
    }, [cart]);

    return <div id="paypal-button-container"></div>;
};
