const { Seller, Product } = require('../models');

exports.getAllCreators = async (req, res) => {
    try {
        const creators = await Seller.findAll({
            attributes: ['id', 'companyName', 'bio', 'location', 'website', 'image'],
            include: [{
                model: Product,
                attributes: ['id', 'image'],
                limit: 3 // Show a preview of 3 products
            }]
        });

        const formattedCreators = creators.map(seller => ({
            id: seller.id,
            name: seller.companyName,
            category: 'Influencer',
            bio: seller.bio,
            location: seller.location,
            image: seller.image,
            website: seller.website,
            products: seller.Products
        }));

        res.json(formattedCreators);
    } catch (error) {
        console.error('Error fetching creators:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getCreatorById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const seller = await Seller.findByPk(id, {
            include: [{
                model: Product
            }]
        });

        if (!seller) {
            return res.status(404).json({ message: 'Creator not found' });
        }

        const formattedCreator = {
            id: seller.id,
            name: seller.companyName,
            category: 'Influencer',
            bio: seller.bio,
            location: seller.location,
            folder: '10K+',
            image: seller.image, // Correctly mapped from DB
            website: seller.website,
            Products: seller.Products
        };

        res.json(formattedCreator);
    } catch (error) {
        console.error('Error fetching creator:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
