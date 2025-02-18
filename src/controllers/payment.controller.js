const { MercadoPagoConfig, Payment, Preference } = require('mercadopago');

const paymentController = {}

paymentController.createOrder = async (req, res) => {
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

    const preference = new Preference(client);

    const result = await preference.create({
        body: {
            items: [
                {
                    title: 'Remera',
                    quantity: 1,
                    unit_price: 1000
                }
            ],
        }
    })
    .then(console.log)
    .catch(console.log);
    console.log(result)
}

module.exports = paymentController