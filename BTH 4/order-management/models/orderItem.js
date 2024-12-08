const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Order = require('./order');

const OrderItem = sequelize.define('OrderItem', {
    order_id: { type: DataTypes.INTEGER, references: { model: Order, key: 'id' } },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    product_name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

module.exports = OrderItem;
