const Sequelize = require('sequelize');

const config = require('./config/config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    pool: {
        max: config.db.maxPool,
        min: config.db.minPool,
        idle: config.db.idlePool
    }
});

module.exports = sequelize;