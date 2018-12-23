const Sequelize = require('sequelize');
const db = require('../db');

const Setting = db.define('setting', {
    name: {
        type: Sequelize.STRING,
        primaryKey: true,
        comment: '属性名称'
    },
    value: {
        type: Sequelize.STRING,
        comment: '属性值'
    },
    display: {
        type: Sequelize.STRING,
        comment: '属性别名'
    },
}, {
	paranoid: true,
	comment: '设置表'
});

module.exports = Setting;