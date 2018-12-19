const Sequelize = require('sequelize');
const db = require('../db');

const ActiveCode = db.define('active_code', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	code: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '激活码'
	},
	state: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0,
		comment: '状态。0：未使用；1：已分配；2：已使用'
	}
}, {
	paranoid: true,
	comment: '激活码表'
});

module.exports = ActiveCode;