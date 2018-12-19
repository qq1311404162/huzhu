const Sequelize = require('sequelize');
const db = require('../db');

const ActiveLog = db.define('active_log', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '用户id'
    },
    active_code_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '激活码id'
    },
	content: {
		type: Sequelize.STRING,
		comment: '激活码使用描述'
	}
}, {
	paranoid: true,
	comment: '激活码使用记录表'
});

module.exports = ActiveLog;