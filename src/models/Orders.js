const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pendiente', 'Completado', 'Pagado'],
        default: 'Pendiente'
    },
    date: { type: Date, default: Date.now }
})

const Order = model('Order', orderSchema);
module.exports = Order;