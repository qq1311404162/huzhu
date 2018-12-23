const Sequelize = require('sequelize');
const db = require('../db');

const Pai = db.define('paidan', {
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
    type: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: '排单类型。用户额度 or 用户机会'
    },
    match_time: {
        type: Sequelize.DATE,
        comment: '匹配时间'
    },
	state: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0,
		comment: '状态。0：初始化成功，待匹配；1：匹配成功，待确认订单；2：订单完成'
	}
}, {
	paranoid: true,
	comment: '排单表'
});

module.exports = Pai;