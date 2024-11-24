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

// productsController.updateProducts = async (req, res) => {
//     const { name, description, price, image, category, subCategory, sizes, date, bestSeller, stock, colour } = req.body;
//     await Product.findByIdAndUpdate(req.params.id, {
//         name,
//         description,
//         price,
//         image,
//         category,
//         subCategory,
//         sizes,
//         date,
//         bestSeller,
//         stock,
//         colour
//     })
//     res.json({message: 'Product updated'});
// }

productsController.updateProducts = async (req, res) => {
    try {
        // Buscar el producto por su ID
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Obtener el nuevo stock al restar la cantidad comprada
        const newStock = product.stock - req.body.quantity;

        if (newStock < 0) {
            return res.status(400).json({ message: 'No hay suficiente stock disponible' });
        }

        // Actualizar el producto con el nuevo stock
        product.stock = newStock;

        // Guardar los cambios en la base de datos
        await product.save();

        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};


productsController.deleteProducts = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({message: 'Product deleted'});
}

module.exports = productsController;