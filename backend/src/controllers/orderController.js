const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

        const newOrder = await Order.create({
            userId: req.user.id,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
            status: 'Processing'
        });

        res.json(newOrder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
