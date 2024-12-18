const { Router } = require('express');
const { getUsers, getUser, createUsers, updateUsers, deleteUsers } = require('../controllers/users.controller');
const { body, param } = require('express-validator');

const router = Router();

router.route('/')
    .get(getUsers)
    .post(
        [
            body('email').isEmail().withMessage('Invalid email format.'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
        ],
        createUsers)

router.route('/:id')
    .get(
        [
            param(id).isMongoId().withMessage('Invalid ID format.')
        ],
        getUser)

    .put(
        [
            param(id).isMongoId().withMessage('Invalid ID format.'),
            body('name').optional().isString(),
            body('surname').optional().isString(),
            body('address').optional().isString(),
            body('mobileNumber').optional().isString(),
            body('email').optional.isEmail().withMessage('Invalid email format'),

        ],
        updateUsers)

    .delete(
        [
            param(id).isMongoId().withMessage('Invalid ID format.')
        ],
        deleteUsers)


module.exports = router;
