const Sequelize = require('sequelize');
const db = require('../db');

const Pai = db.define('paidan', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	ident: {
		type: Sequelize.STRING,
		comment: '排单编号'
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '用户id'
	},
	amount: {
		type: Sequelize.DECIMAL(12, 2),
		defaultValue: '0.00',
		comment: '排单金额'
	},
	type: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 1,
		comment: '排单类型。1:用户额度; 2:用户机会'
	},
	is_first: {
		type: Sequelize.TINYINT,
		defaultValue: 0,
		comment: '是否首次排单'
	},
	state: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0,
		comment: '状态。0：初始化成功，待匹配；1：匹配成功，待确认订单；2：订单完成'
	}
}, {
	// paranoid: true,
	comment: '排单表'
});

module.exports = Pai;

// 排单时，创建排单表和排单拆分表，匹配时根据金额拆分拆分表中的金额，最终打款完成时，两个表一起改变状态