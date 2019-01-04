const Sequelize = require('sequelize');
const db = require('../db');

/**
 * 激活码分配日志
 */
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
	to_user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '被赠送用户id'
	},
	active_nums: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '激活码数量'
	},
	type: {
		type: Sequelize.TINYINT,
		defaultValue: 1,
		comment: '激活码使用类型。1：赠送；2：使用'
	},
	content: {
		type: Sequelize.STRING,
		comment: '描述'
	}
}, {
	// paranoid: true,
	comment: '激活码使用记录表'
});

module.exports = ActiveLog;