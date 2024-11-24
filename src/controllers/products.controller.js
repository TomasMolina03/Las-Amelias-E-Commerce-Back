const productsController = {};

const Product = require('../models/Product');

productsController.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

productsController.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
}

productsController.createProducts = async (req, res) => {
    const { name, description, price, image, category, subCategory, sizes, date, bestSeller, stock, colour } = req.body;
    const newProduct = new Product({
        name,
        description,
        price,
        image,
        category,
        subCategory,
        sizes,
        date,
        bestSeller,
        stock,
        colour
    })
    await newProduct.save();
    res.json({message: 'Product saved'});
}

productsController.updateProducts = async (req, res) => {
    const { name, description, price, image, category, subCategory, sizes, date, bestSeller, stock, colour } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        price,
        image,
        category,
        subCategory,
        sizes,
        date,
        bestSeller,
        stock,
        colour
    })
    res.json({message: 'Product updated'});
}

productsController.deleteProducts = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({message: 'Product deleted'});
}

module.exports = productsController;