const Sequelize = require('sequelize');
const db = require('../db');
const md5 = require('md5');

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
		comment: '用户名',
		validate: {
			// 用户名唯一验证
			async notUnique(value){
				let result = await User.findOne({
					attributes: ['id'],
					where:{
						username: value
					}
				});
				if (result !== null)
					throw new Error('用户名重复');
			}
		}
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
		comment: '手机号',
		validate: {
			// 手机号唯一验证
			async notUnique(value){
				let result = await User.findOne({
					attributes: ['id'],
					where:{
						mobile: value
					}
				});
				if (result !== null)
					throw new Error('手机号重复');
			}
		}
	},
	realname: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '真实姓名',
		validate: {
			// 真实姓名唯一验证 -- 目前先唯一性验证，三代内以后再改
			async notUnique(value){
				let result = await User.findOne({
					attributes: ['id'],
					where:{
						realname: value
					}
				});
				if (result !== null)
					throw new Error('该姓名已是会员');
			}
		}
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
		defaultValue: '0,',
		allowNull: false,
		comment: '推荐人2层id，逗号分隔'
	},
	previous_all: {
		type: Sequelize.STRING,
		defaultValue: '0,',
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
		defaultValue: 1,
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
		defaultValue: 1,
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
	comment: '用户表',
	
});

// 设置加密密码
function setPassword(value) {

	return md5('huzhu' + value);
}

User.setPasswordValue = async pwd => {
	
	return setPassword(pwd);
}


module.exports = User;