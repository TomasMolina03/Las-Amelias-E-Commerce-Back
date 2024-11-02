const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    colour: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    finalPrice: { type: Number, required: false },
    date: {type: Date, default: Date.now}
})

const Product = model('Product', productSchema);
module.exports = Product;