const ordersController = {};

const Order = require('../models/Orders');
const User = require('../models/User');

ordersController.getOrders = async (req, res) => {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
}

ordersController.getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user').populate('products.product');
    res.json(order);
}

ordersController.createOrder = async (req, res) => {
    const { user: userId, products, totalAmount } = req.body;
    
    const newOrder = new Order({
        user: userId,
        products,
        totalAmount
    });

    try {
        await newOrder.save();
        const user = await User.findById(userId);

        if (user) {
            user.orders.push(newOrder._id);
            await user.save();
        }

        res.status(201).json({ message: 'Order created', order: newOrder });
    } catch (error) {
        res.status(400).json({ message: 'Error creating order', error: error.message });
    }
};

ordersController.updateOrder = async (req, res) => {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order updated', order });
};

ordersController.deleteOrder = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
};

module.exports = ordersController;
