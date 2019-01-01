const Sequelize = require('sequelize');
const db = require('../db');

const PaiInfo = db.define('paidan_info', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	pai_id: {
		type: Sequelize.INTEGER,
		comment: '排单id'
    },
    ident: {
        type: Sequelize.STRING,
        comment: '排单订单号'
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
	comment: '排单拆分表'
});

module.exports = PaiInfo;