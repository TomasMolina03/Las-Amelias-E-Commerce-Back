const { Router } = require('express');
const { getProducts, getProduct, createProducts, updateProductsDetails, updateProductStock, deleteProducts } = require('../controllers/products.controller');
const { body, param } = require('express-validator');
const router = Router();

router.route('/')
    .get(getProducts)
    .post(
        [
            body('name').isString().notEmpty().withMessage('Name is required.'),
            body('description').isString().notEmpty().withMessage('Description is required.'),
            body('price').isNumeric().withMessage('Price must be a number.'),
            body('image').isArray().notEmpty().withMessage('Image is required.'),
            body('image.*.url').isString().notEmpty().withMessage('URL is required.'),
            body('category').isString().notEmpty().withMessage('Category is required.'),
            body('sizes').isArray().notEmpty().withMessage('Sized is required.'),
            body('stock').isNumeric().withMessage('Stock must be a number.'),
            body('bestSeller').optional().isBoolean().withMessage('BestSeller must be a boolean.'),
            body('discount').optional().isNumeric().withMessage('Discount must be a number.')
        ],
        createProducts
    )
router.route('/:id')
    .get(
        [
            param('id').isMongoId().withMessage('Invalid ID format.')
        ],
        getProduct)
    .put(
        [
            body('name').isString().notEmpty().withMessage('Name is required.'),
            body('description').isString().notEmpty().withMessage('Description is required.'),
            body('price').isNumeric().withMessage('Price must be a number.'),
            body('image').isArray().notEmpty().withMessage('Image is required.'),
            body('image.*.url').isString().notEmpty().withMessage('URL is required.'),
            body('category').isString().notEmpty().withMessage('Category is required.'),
            body('sizes').isArray().notEmpty().withMessage('Sized is required.'),
            body('stock').isNumeric().withMessage('Stock must be a number.'),
            body('bestSeller').optional().isBoolean().withMessage('BestSeller must be a boolean.'),
            body('discount').optional().isNumeric().withMessage('Discount must be a number.')
        ],
        updateProductsDetails)
    .delete(
        [
            param('id').isMongoId().withMessage('Invalid ID format.')
        ],
        deleteProducts)

router.route('/:id/stock')
    .put(
        [
            param('id').isMongoId().withMessage('Invalid ID format.'),
            body('quantity')
                .isNumeric()
                .withMessage('Quantity must be a number')
                .custom((value) => value > 0).withMessage('Quantity must be > 0')
        ],
        updateProductStock
    )

module.exports = router;