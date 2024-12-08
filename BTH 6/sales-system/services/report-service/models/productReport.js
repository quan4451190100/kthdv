const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ProductReport = sequelize.define('ProductReport', {
    order_report_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    total_sold: { type: DataTypes.INTEGER, allowNull: false },
    revenue: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    profit: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

module.exports = ProductReport;
