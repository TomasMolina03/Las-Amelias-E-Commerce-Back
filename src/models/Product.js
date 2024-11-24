const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: false },
    sizes: { type: [String], required: true },
    date: { type: Date, default: Date.now },
    bestSeller: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    colour: { type: String, required: true }
})

const Product = model('Product', productSchema);
module.exports = Product;