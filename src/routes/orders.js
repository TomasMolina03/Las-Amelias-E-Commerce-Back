const { Router } = require('express');
const { getOrders, getOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/orders.controller');
const router = Router();

router.route('/')
.get(getOrders)
.post(createOrder)
router.route('/:id')
.get(getOrder)
.put(updateOrder)
.delete(deleteOrder)


module.exports = router;