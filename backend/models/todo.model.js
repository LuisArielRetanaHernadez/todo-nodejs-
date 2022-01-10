const { DataTypes } = require('sequelize')
const { bd } = require('../utils/database')

// model todo
const Todo = bd.define(
    'todos',
	{
		// Define attributes
		id: {
			// Define datatypes
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false, // NOT NULL
		},
		content: {
			type: DataTypes.STRING(222),
            allowNull: false,
		},
		status: {
			type: DataTypes.STRING(18),
			allowNull: true,
			defaultValue: 'pending',
		},
	},
	{ timestamps: false }
)
module.exports = { Todo }