const moment = require('moment');

module.exports = function (sequelize, DataTypes) {

	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '用户名',
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '密码'
		},
		payword: {
			type: DataTypes.STRING,
			defaultValue: '',
			comment: '支付密码'
		},
		mobile: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '手机号',
		},
		realname: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '真实姓名',
		},
		avatar: {
			type: DataTypes.STRING,
			defaultValue: '',
			comment: '头像'
		},
		card_name: {
			type: DataTypes.STRING,
			defaultValue: '',
			comment: '很行卡银行名称'
		},
		card_nums: {
			type: DataTypes.STRING,
			defaultValue: '',
			comment: '银行卡号'
		},
		alipay_qrcode: {
			type: DataTypes.STRING,
			defaultValue: '',
			comment: '支付宝收款码'
		},
		wechat_qrcode: {
			type: DataTypes.STRING,
			defaultValue: '',
			comment: '微信收款码'
		},
		static_wallet: {
			type: DataTypes.DECIMAL(12, 2),
			defaultValue: '0.00',
			comment: '静态钱包金额'
		},
		freeze: {
			type: DataTypes.DECIMAL,
			defaultValue: '0.00',
			comment: '静态钱包冻结金额'
		},
		dynamic_wallet: {
			type: DataTypes.DECIMAL(12, 2),
			defaultValue: '0.00',
			comment: '动态钱包金额'
		},
		previous_id: {
			type: DataTypes.STRING,
			// allowNull: false,
			defaultValue: '',
			comment: '推荐人id'
		},
		previous_two: {
			type: DataTypes.STRING,
			defaultValue: '',
			allowNull: false,
			comment: '推荐人2层id，逗号分隔'
		},
		previous_all: {
			type: DataTypes.STRING,
			defaultValue: '',
			allowNull: false,
			comment: '所有推荐人id，逗号分隔'
		},
		type: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 1,
			comment: '用户类型。0：管理员；1：普通用户'
		},
		available: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
			comment: '用户派单额度倍数'
		},
		bangzhu_nums: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			comment: '每月赠送派单次数'
		},
		bangzhu_golds: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			comment: '排单币数量'
		},
		active_golds: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			comment: '激活码数量'
		},
		// team_id: {
		// 	type: DataTypes.INTEGER,
		// 	defaultValue: 1,
		// 	comment: '团队级别id',
		// },
		state: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 0,
			comment: '用户状态；0：初始化；1：可用；9：封号'
		},
		created_at: {
			type: DataTypes.DATE,
			get() {
				return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
			}
		},
		updated_at: {
			type: DataTypes.DATE,
			get() {
				return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
			}
		},
	}, {
		comment: '用户表',
	});
};