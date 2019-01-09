const Sequelize = require('sequelize');
const db = require('../db');

const Admin = require('./Admin');

const AdminLog = db.define('admin_log', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	admin_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '管理员id',
		references: {
			model: Admin,
			key: 'id'
		}
	},
	content: {
		type: Sequelize.STRING,
		comment: '操作内容'
	}
}, {
	// paranoid: true,
	comment: '管理员操作表',
	underscored: true
});

AdminLog.belongsTo(Admin);

module.exports = AdminLog;