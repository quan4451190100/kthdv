const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './order-database.sqlite'
});

module.exports = sequelize;
