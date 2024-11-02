const { Router } = require('express');
const { getProducts, getProduct, createProducts, updateProducts, deleteProducts } = require('../controllers/products.controller');
const router = Router();

router.route('/')
.get(getProducts)
.post(createProducts)
router.route('/:id')
.get(getProduct)
.put(updateProducts)
.delete(deleteProducts)


module.exports = router;