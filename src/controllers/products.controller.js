const productsController = {};

const Product = require('../models/Product');

productsController.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: 'Error fetching products', error: error.message})
  }
}

productsController.getProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if(!product) return res.status(404).json({message: 'Product not found.'});
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({message: 'Error fetching product', error: error.message});
    }
}

productsController.createProducts = async (req, res) => {
    try {
      const { name, description, price, image, category, subCategory, sizes, date, bestSeller, stock, colour, discount } = req.body;
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
        colour,
        discount
      })
      await newProduct.save();
      res.status(201).json({message: 'Product saved'});
    } catch (error) {
      res.status(500).json({message: 'Error creating product', error: error.message});
    }
}

productsController.updateProductsDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.params;

        const product = await Product.findById(id);
        if(!product) return res.status(404).json({message: 'Product not found.'});

        Object.assign(product, updates);
        await Product.save()
        res.status(201).json({message: 'Product updated'});
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message});
    }
};

productsController.updateProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if(!quantity || quantiti <= 0) {
      return res.status(400).json({message: 'Invalid quantity'});
    }

    const product = await Product.findById(id);
    if(!product) return res.status(404).json({message: 'Product not found.'});

    const newStock = product.stock - quantity;
    if(newStock < 0) {
      return res.status(400).json({message: 'Insufficient stock'});
    }

    product.stock = newStock;
    await product.save();
    res.status(201).json({message: 'Stock product updated'})
  } catch (error) {
    res.status(500).json({message: 'Error updating product', error: error.message});
  }
}

productsController.deleteProducts = async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if(!deletedProduct) return res.status(404).json({message: 'Product not found.'});
      res.status(200).json({message: 'Product deleted'});
    } catch (error) {
      res.status(500).json({message: 'Error deleting product', error: error.message});
    }
}

module.exports = productsController;