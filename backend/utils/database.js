const { Sequelize } = require('sequelize');
require('dotenv').config();

const bd = new Sequelize({
	dialect: 'postgres',
    host: process.env.BD_HOST,
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    database: process.env.BD,
    port: process.env.BD_PORT,
    logging: false,
})
module.exports = { bd }