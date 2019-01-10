const Sequelize = require('sequelize');
const db = require('../db');
const moment = require('moment');

// const BangzhuInfo = require('./BangzhuInfo');
const User = require('./User');

const Bangzhu = db.define('bangzhu', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	ident: {
		type: Sequelize.STRING,
		comment: '帮助编号'
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
	comment: '帮助表',
	underscored: true
});

Bangzhu.belongsTo(User);

// 获取当前未完成帮助的个数
Bangzhu.getEduHelpCount = async (user_id) => {

	return await Bangzhu.count({
		where: {
			user_id: user_id,
			type: 1,
			state: {
				[Sequelize.Op.in]: [0, 1]
			}
		}
	});
};

Bangzhu.getBangzhuDayCount = async (user_id) => {

	return await Bangzhu.count({
		where: {
			user_id: user_id,
			createdAt: {
				[Sequelize.Op.gte]: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
				[Sequelize.Op.lte]: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
			}
		}
	});
};

// 获取当月赠送帮助的个数
Bangzhu.getGiftHelpMonthCount = async (user_id) => {

	return await Bangzhu.count({
		where: {
			user_id: user_id,
			type: 2,
			state: {
				[Sequelize.Op.in]: [0, 1]
			},
			createdAt: {
				[Sequelize.Op.gte]: moment().startOf('month'),
				[Sequelize.Op.lte]: moment().endOf('month')
			}
		}
	});
};

// 开始帮助
Bangzhu.bangzhu = async (data) => {
	// 生成订单号
	data.ident = 'p' + moment().format('YYYYMMDDHHmmss') + Math.floor(Math.random() * 1000).toString();

	return Bangzhu.create(data).then(bangzhu => {

		return bangzhu.createBangzhu(data);
	});


	// return db.transaction(function (t) {

	// 	// 帮助表新增
	// 	return Bangzhu.create(data, {
	// 		transaction: t
	// 	}).then((bangzhu) => {
	// 		// 帮助详情表新增
	// 		return bangzhu.createBangzhu(data, {
	// 			transaction: t
	// 		});
	// 	});
	// });
};

module.exports = Bangzhu;

// 帮助时，创建帮助表和帮助拆分表，匹配时根据金额拆分拆分表中的金额，最终打款完成时，两个表一起改变状态