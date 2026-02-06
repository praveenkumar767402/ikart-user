const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Seller = require('./Seller'); // Import Seller for association

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60'
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    sellerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Seller,
            key: 'id'
        }
    }
});

// Associations defined in models/index.js

module.exports = Product;
