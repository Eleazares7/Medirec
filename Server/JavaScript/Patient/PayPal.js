

import paypal from '@paypal/checkout-server-sdk';

// Configuración de cliente
const environment = new paypal.core.SandboxEnvironment(
    'AZHoktB7ICTbiaqk7TXB_moLDgIN5Vo5vjc2StdbwiuyuOLLHxZ234Oh0-2-I14iC6hWr7-NXV_BIpl5', // Reemplaza con tu Client ID
    'EJRSnRl7eOf8-O-6x5QBDxmNtdvOKLGviBOmhGmNddFra-p8Krh7FsqOgulnrh2yANhAJYYz5XEUyvcr' // Reemplaza con tu Secret
);
const client = new paypal.core.PayPalHttpClient(environment);

export const paypalPayment = (app) => {
    app.post('/create-order', async (req, res) => {
        const { items } = req.body;

        const request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: '100.00', // Cambia este valor por el total calculado
                    },
                },
            ],
        });

        try {
            const order = await client.execute(request);
            res.json({ id: order.result.id });
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    app.post('/capture-order', async (req, res) => {
        const { orderID } = req.body;

        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});

        try {
            const capture = await client.execute(request);
            res.json({ capture });
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
};
