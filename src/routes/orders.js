const { Router } = require('express');
const { getOrders, getOrder, createOrder, updateOrder, deleteOrder, getOrdersByUserId } = require('../controllers/orders.controller');
const router = Router();

router.route('/')
.get(getOrders)
.post(createOrder)
router.route('/:id')
.get(getOrder)
.put(updateOrder)
.delete(deleteOrder)
router.route('/user/:userId')
  .get(getOrdersByUserId); // Llamada al controlador para obtener órdenes por usuario



module.exports = router;