const moment = require('moment');

module.exports = function (sequelize, DataTypes) {

	return sequelize.define('team', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '级别名称'
		},
		zhitui_num: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			comment: '直推人员数量'
		},
		tem_num: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			comment: '团队人员数量'
		},
		reward_one: {
			type: DataTypes.TINYINT,
			defaultValue: 0,
			comment: '一层奖励，百分比'
		},
		reward_two: {
			type: DataTypes.TINYINT,
			defaultValue: 0,
			comment: '二层奖励，百分比'
		},
		reward_three: {
			type: DataTypes.TINYINT,
			defaultValue: 0,
			comment: '三层奖励，百分比'
		},
		reward_other: {
			type: DataTypes.TINYINT,
			defaultValue: 0,
			comment: '额外奖励，百分比'
		},
		state: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 1,
			comment: '状态。0：禁用；1：可用'
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
		comment: '团队表',
	});
};