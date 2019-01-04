const Sequelize = require('sequelize');
const db = require('../db');

const Admin = db.define('admin', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		comment: '用户名'
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '密码'
	},
	token: {
		type: Sequelize.STRING,
		comment: '登录token'
	},
	nickname: {
		type: Sequelize.STRING,
		comment: '昵称'
	},
	type: {
		type: Sequelize.TINYINT,
		defaultValue: 0,
		comment: '管理员类型。0：超级管理员；。。。'
	},
	state: {
		type: Sequelize.TINYINT,
		defaultValue: 1,
		comment: '管理员状态。0：封号；1：正常'
	}
}, {
	// paranoid: true,
	comment: '管理员表'
});

module.exports = Admin;