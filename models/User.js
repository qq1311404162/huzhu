const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		comment: '用户名'
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '密码'
	},
	mobile: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		comment: '手机号'
	},
	realname: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '真实姓名'
	},
	card_name: {
		type: Sequelize.STRING,
		comment: '很行卡银行名称'
	},
	card_local: {
		type: Sequelize.STRING,
		comment: '银行卡开户行'
	},
	card_nums: {
		type: Sequelize.STRING,
		comment: '银行卡号'
	},
	alipay_qrcode: {
		type: Sequelize.STRING,
		comment: '支付宝收款码'
	},
	wechat_qrcode: {
		type: Sequelize.STRING,
		comment: '微信收款码'
	},
	static_wallet: {
		type: Sequelize.DECIMAL(12, 2),
		defaultValue: '0.00',
		comment: '静态钱包金额'
	},
	dynamic_wallet: {
		type: Sequelize.DECIMAL(12, 2),
		defaultValue: '0.00',
		comment: '动态钱包金额'
	},
	previous_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
		comment: '推荐人id'
	},
	previous_two: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '推荐人2层id，逗号分隔'
	},
	previous_all: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '所有推荐人id，逗号分隔'
	},
	active_code: {
		type: Sequelize.STRING,
		comment: '激活码'
	},
	type: {
		type: Sequelize.TINYINT,
		allowNull: false,
		comment: '用户类型'
	},
	available: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1,
		comment: '用户派单额度倍数'
	},
	pai_nums: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
		comment: '每月赠送派单次数'
	},
	pai_golds: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
		comment: '排单币数量'
	},
	team_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '团队级别id'
	},
	state: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 1,
		comment: '用户状态；0：封号。1：可用'
	}

}, {
	paranoid: true,
	comment: '用户表'
});

module.exports = User;