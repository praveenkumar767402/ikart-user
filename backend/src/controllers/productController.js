const Product = require('../models/Product');
const Seller = require('../models/Seller');

// Note: These might not be used if User App is read-only for products
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, stock } = req.body;
        // This likely needs updating if we keep it, but for now focusing on getAllProducts
        // If User app allows adding products, it needs to be updated to use Seller model logic
        res.status(501).json({ message: 'Use Seller App to add products' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getMyProducts = async (req, res) => {
    // Legacy support or if we implement user-seller view
    res.json([]);
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{
                model: Seller,
                attributes: ['companyName', 'id']
            }],
            order: [['createdAt', 'DESC']]
        });

        // Transform data for frontend
        const formattedProducts = products.map(product => {
            const p = product.toJSON();
            return {
                ...p,
                creatorName: p.Seller ? p.Seller.companyName : 'Unknown Creator',
                SellerId: p.Seller ? p.Seller.id : null
            };
        });

        res.json(formattedProducts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{
                model: Seller,
                attributes: ['companyName', 'id']
            }]
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const p = product.toJSON();
        const formattedProduct = {
            ...p,
            creatorName: p.Seller ? p.Seller.companyName : 'Unknown Creator',
            creatorId: p.Seller ? p.Seller.id : null
        };

        res.json(formattedProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        // Authorization logic would need update
        res.status(501).json({ message: 'Use Seller App to delete products' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
