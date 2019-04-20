const moment = require('moment');

module.exports = function (sequelize, DataTypes) {

	return sequelize.define('admin', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			comment: '用户名'
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '密码'
		},
		token: {
			type: DataTypes.STRING,
			comment: '登录token'
		},
		nickname: {
			type: DataTypes.STRING,
			comment: '昵称'
		},
		type: {
			type: DataTypes.TINYINT,
			defaultValue: 0,
			comment: '管理员类型。0：超级管理员；1: xxx'
		},
		state: {
			type: DataTypes.TINYINT,
			defaultValue: 1,
			comment: '管理员状态。0：封号；1：正常'
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
		comment: '管理员表',
	});
};