const Sequelize = require('sequelize');
const db = require('../db');

const Withdraw = db.define('withdraw', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '用户id'
    },
    amount: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: '0.00',
        comment: '提现金额'
    },
    type: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: '提现类型。静态钱包提现 or 动态钱包提现'
    },
	state: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0,
		comment: '状态。0：初始化成功；1：订单完成'
	}
}, {
	paranoid: true,
	comment: '提现表'
});

module.exports = Withdraw;