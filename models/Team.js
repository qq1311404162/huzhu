const Sequelize = require('sequelize');
const db = require('../db');

const Team = db.define('team', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '级别名称'
	},
	zhitui_num: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		comment: '直推人员数量'
	},
	tem_num: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		comment: '团队人员数量'
	},
	reward_one: {
		type: Sequelize.TINYINT,
		defaultValue: 0,
		comment: '一层奖励，百分比'
	},
	reward_two: {
		type: Sequelize.TINYINT,
		defaultValue: 0,
		comment: '二层奖励，百分比'
	},
	reward_three: {
		type: Sequelize.TINYINT,
		defaultValue: 0,
		comment: '三层奖励，百分比'
	},
	reward_other: {
		type: Sequelize.TINYINT,
		defaultValue: 0,
		comment: '额外奖励，百分比'
	},
	state: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 1,
		comment: '状态。0：禁用；1：可用'
	}
}, {
	// paranoid: true,
	comment: '团队表'
});

module.exports = Team;