const Sequelize = require('sequelize');

// const config = require('./config');

const sequelize = new Sequelize('huzhu', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
// var sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: config.dialect,
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });

module.exports = sequelize;