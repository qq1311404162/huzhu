// const Sequelize = require('sequelize');
// const moment = require('moment');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const Model = require('./Model');
const db = require('../models/index');
const config = require('../../config/config');

class AdminModel extends Model {

	constructor() {

		super(db.Admin);

		this.staticValue = {
			state: {
				0: '等待打款',
				1: '等待确认',
				2: '已完成',
				9: '作废'
			}
		};
	}

	/**
	 * 设置密码
	 * @param {*} value 
	 */
	setPassword(value) {

		return md5(value);
	}

	/**
	 * 设置 jwt token
	 * @param {*} data 
	 */
	setToken(data) {

		return config.jwt.pre + jwt.sign(data, config.jwt.adminToken, {
			expiresIn: config.jwt.express
		});
	}
	/**
	 * 用户名唯一性检测
	 * @param {*} username 
	 */
	async uniqueUsername(username) {

		if (!username)
			return false;

		let user = await this.findOne({
			attributes: ['id'],
			where: {
				username: username
			}
		});

		return user === null ? true : false;
	}

}

module.exports = new AdminModel();