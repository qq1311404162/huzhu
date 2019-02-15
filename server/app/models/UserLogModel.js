// const Sequelize = require('sequelize');
// const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

class UserLogModel extends Model {

	constructor() {

		super(db.UserLog);
	}


	/**
     * 用户注册日志
     * @param {*} user_id 
     */
	async createRegisterLog(user_id) {

		return await this.createLog(user_id, 1, '用户注册');
	}


	/**
     * 用户登录日志
     * @param {*} user_id 
     */
	async createLoginLog(user_id) {

		return await this.createLog(user_id, 2, '用户登录');
	}

	/**
     * 用户激活日志
     * @param {*} user_id 
     */
	async createActivationLog(user_id) {

		return await this.createLog(user_id, 6, '用户激活');
	}


	/**
     * 赠送激活码日志
     * @param {*} user_id 
     * @param {*} content 
     */
	async createGiveActivationLog(user_id, content) {

		return await this.createLog(user_id, 4, content);
	}


	/**
     * 接收激活码日志
     * @param {*} user_id 
     * @param {*} content 
     */
	async createReceiveActivationLog(user_id, content) {

		return await this.createLog(user_id, 5, content);
	}


	/**
     * 添加用户日志
     * @param {*} user_id 
     * @param {*} type 
     * @param {*} content 
     */
	async createLog(user_id, type, content) {

		return await this.create({
			user_id: user_id,
			type: type,
			content: content
		});
	}

}

module.exports = new UserLogModel();