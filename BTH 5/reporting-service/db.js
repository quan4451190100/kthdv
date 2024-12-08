const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './reporting-database.sqlite'
});

module.exports = sequelize;
