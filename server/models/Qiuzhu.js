const Sequelize = require('sequelize');
const db = require('../db');

const User = require('./User');

const Qiuzhu = db.define('qiuzhu', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	ident: {
		type: Sequelize.STRING,
		comment: '求助编号'
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '用户id',
		references: {
			model: User,
			key: 'id'
		}
	},
	amount: {
		type: Sequelize.DECIMAL(12, 2),
		defaultValue: '0.00',
		comment: '求助金额'
	},
	type: {
		type: Sequelize.TINYINT,
		allowNull: false,
		comment: '求助类型。静态钱包求助 or 动态钱包求助'
	},
	state: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0,
		comment: '状态。0：初始化成功，待匹配；1：匹配成功，待确认订单；2：订单完成'
	}
}, {
	// paranoid: true,
	comment: '求助表',
	underscored: true
});

Qiuzhu.belongsTo(User);

module.exports = Qiuzhu;