const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: 'https://ui-avatars.com/api/?background=random'
    },
    role: {
        type: DataTypes.ENUM('user', 'creator', 'admin', 'seller'),
        defaultValue: 'user'
    },
    bio: {
        type: DataTypes.TEXT
    },
    location: {
        type: DataTypes.STRING
    },
    resetPasswordToken: {
        type: DataTypes.STRING
    },
    resetPasswordExpire: {
        type: DataTypes.DATE
    }
});

module.exports = User;
