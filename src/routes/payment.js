const { Router } = require('express');
const { createOrder } = require('../controllers/payment.controller');

const router = Router();

router.get('/create-order', createOrder)

router.get('/success', (req, res) => res.send('Success.'))

router.get('/failure', (req, res) => res.send('Failure.'))

router.get('/pending', (req, res) => res.send('Pending.'))

router.get('/webhook', (req, res) => res.send('Webhook.'))

module.exports = router