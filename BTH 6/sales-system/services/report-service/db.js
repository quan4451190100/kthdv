const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './report-database.sqlite',
});

module.exports = sequelize;
