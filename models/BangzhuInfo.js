const Sequelize = require('sequelize');
const db = require('../db');

const BangzhuInfo = db.define('bangzhu_info', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	bangzhu_id: {
		type: Sequelize.INTEGER,
		comment: '帮助id'
	},
	ident: {
		type: Sequelize.STRING,
		comment: '帮助订单号'
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '用户id'
	},
	amount: {
		type: Sequelize.DECIMAL(12, 2),
		defaultValue: '0.00',
		comment: '帮助金额'
	},
	type: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 1,
		comment: '帮助类型。1:用户额度; 2:用户机会'
	},
	state: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0,
		comment: '状态。0：初始化成功，待匹配；1：匹配成功，待确认订单；2：订单完成'
	}
}, {
	// paranoid: true,
	comment: '帮助拆分表'
});

module.exports = BangzhuInfo;