const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: [
        {
            url: { type: String, required: true },
            alt: { type:String, required: false }
        }
    ],
    category: { type: String, required: true },
    subCategory: { type: String, required: false },
    sizes: { type: [String], required: true },
    date: { type: Date, default: Date.now },
    bestSeller: { type: Boolean, default: false, required: false },
    stock: { type: Number, required: true },
    colour: { type: String, required: false },
    discount: { type: Number, required: false, default: 0 }
})

const Product = model('Product', productSchema);
module.exports = Product;