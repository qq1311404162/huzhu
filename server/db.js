const Sequelize = require('sequelize');

const config = require('./config/db');

const sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: config.dialect,
	pool: {
		max: config.maxPool,
		min: config.minPool,
		idle: config.idlePool
	},
	timezone: '+08:00',
	underscored: true
});

// module.exports = sequelize;