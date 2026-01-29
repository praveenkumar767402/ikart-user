const Product = require('../models/Product');
const User = require('../models/User');

exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, stock } = req.body;

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
            sellerId: req.user.id
        });

        res.json(newProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getMyProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ where: { sellerId: req.user.id } });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{
                model: User,
                attributes: ['name', 'avatar']
            }]
        });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Make sure user owns product
        if (product.sellerId !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await product.destroy();
        res.json({ message: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
