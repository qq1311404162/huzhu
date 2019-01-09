const Sequelize = require('sequelize');
const db = require('../db');
const md5 = require('md5');
const ActiveLog = require('./ActiveLog');

const Team = require('./Team');

const User = db.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '用户名',
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '密码'
	},
	payword: {
		type: Sequelize.STRING,
		defaultValue: '',
		comment: '支付密码'
	},
	mobile: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '手机号',
	},
	realname: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '真实姓名',
	},
	avatar: {
		type: Sequelize.STRING,
		defaultValue: '',
		comment: '头像'
	},
	card_name: {
		type: Sequelize.STRING,
		defaultValue: '',
		comment: '很行卡银行名称'
	},
	card_nums: {
		type: Sequelize.STRING,
		defaultValue: '',
		comment: '银行卡号'
	},
	alipay_qrcode: {
		type: Sequelize.STRING,
		defaultValue: '',
		comment: '支付宝收款码'
	},
	wechat_qrcode: {
		type: Sequelize.STRING,
		defaultValue: '',
		comment: '微信收款码'
	},
	static_wallet: {
		type: Sequelize.DECIMAL(12, 2),
		defaultValue: '0.00',
		comment: '静态钱包金额'
	},
	freeze: {
		type: Sequelize.DECIMAL,
		defaultValue: '0.00',
		comment: '静态钱包冻结金额'
	},
	dynamic_wallet: {
		type: Sequelize.DECIMAL(12, 2),
		defaultValue: '0.00',
		comment: '动态钱包金额'
	},
	previous_id: {
		type: Sequelize.STRING,
		// allowNull: false,
		defaultValue: '',
		comment: '推荐人id'
	},
	previous_two: {
		type: Sequelize.STRING,
		defaultValue: '',
		allowNull: false,
		comment: '推荐人2层id，逗号分隔'
	},
	previous_all: {
		type: Sequelize.STRING,
		defaultValue: '',
		allowNull: false,
		comment: '所有推荐人id，逗号分隔'
	},
	type: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 1,
		comment: '用户类型。0：管理员；1：普通用户'
	},
	available: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1,
		comment: '用户派单额度倍数'
	},
	bangzhu_nums: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
		comment: '每月赠送派单次数'
	},
	bangzhu_golds: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		comment: '排单币数量'
	},
	active_golds: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		comment: '激活码数量'
	},
	team_id: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
		comment: '团队级别id',
		references: {
			model: Team,
			key: 'id'
		}
	},
	state: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0,
		comment: '用户状态；0：初始化；1：可用；9：封号'
	}

}, {
	// paranoid: true,
	comment: '用户表',
	underscored: true

});
// 关联
User.belongsTo(Team);

// 设置加密密码
function setPassword(value) {

	return md5('huzhu' + value);
}

// 设置密码
User.setPasswordValue = async pwd => {

	return setPassword(pwd);
};

// 手机号唯一性验证
User.validateMobile = async mobile => {

	if (!mobile)
		return false;

	let user = await User.findOne({
		attributes: ['id'],
		where: {
			mobile: mobile
		}
	});

	return user === null ? true : false;
};

// 用户名唯一性验证
User.validateUsername = async username => {

	if (!username)
		return false;

	let user = await User.findOne({
		attributes: ['id'],
		where: {
			username: username
		}
	});

	return user === null ? true : false;
};

// 真实姓名三代内不得重名验证
User.validateRealname = async (realname, preArr) => {

	if (!realname)
		return false;

	let previousUsers = await User.findAll({
		attributes: ['realname'],
		where: {
			id: {
				[Sequelize.Op.or]: preArr
			}
		}
	});

	let preRealname = [];
	for (let pres of previousUsers) {

		if (pres.realname)
			preRealname.push(pres.realname);
	}

	return preRealname.indexOf(realname) === -1 ? true : false;
};

// 赠送激活码
User.giveActivation = async (data) => {

	return db.transaction(function (t) {

		// 赠送的用户减少激活码数量
		return User.update({
			active_golds: data.userActiveGolds - data.to_nums
		}, {
			where: {
				id: data.user_id
			}
		}, {
			transaction: t
		}).then(() => {

			// 被赠送的用户添加激活码数量
			return User.update({
				active_golds: parseInt(data.toUserActiveGolds) + parseInt(data.to_nums)
			}, {
				where: {
					id: data.to_user_id
				}
			}, {
				transaction: t
			}).then(() => {

				return ActiveLog.create({
					user_id: data.user_id,
					to_user_id: data.to_user_id,
					active_nums: data.to_nums,
					type: 1,
					content: '赠送激活码'
				}, {
					transaction: t
				});
			});
		});

	});
};


module.exports = User;