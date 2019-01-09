const Sequelize = require('sequelize');
const db = require('../db');

const User = require('./User');

const UserLog = db.define('user_log', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	source_id: {
		type: Sequelize.INTEGER,
		comment: '操作用户id',
		references: {
			model: User,
			key: 'id'
		}
	},
	target_id: {
		type: Sequelize.INTEGER,
		comment: '目标id',
		references: {
			model: User,
			key: 'id'
		}
	},
	content: {
		type: Sequelize.STRING,
		comment: '操作描述'
	}
}, {
	// paranoid: true,
	comment: '用户操作表',
	underscored: true
});
// 关联
UserLog.belongsTo(User, {
	as: 'Source',
	foreignKey: 'source_id'
});
UserLog.belongsTo(User, {
	as: 'Target',
	foreignKey: 'target_id'
});

module.exports = UserLog;