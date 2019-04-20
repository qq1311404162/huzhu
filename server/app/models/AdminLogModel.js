const Sequelize = require('sequelize');
const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

class AdminLogModel extends Model {

	constructor() {

		super(db.AdminLog);
	}

	/**
     * 用户登录日志
     * @param {*} admin_id 
     */
	async createLoginLog(admin_id) {

		await this.createLog(admin_id, 2, '管理员登录');
	}

	/**
     * 添加管理员
     * @param {*} admin_id 
     * @param {*} info 
     */
	async createCreateLog(admin_id, info = '') {

		await this.createLog(admin_id, 1, '添加管理员' + info !== '' ? (' ' + info) : info);
	}

	/**
     * 添加管理员日志
     * @param {*} admin_id 
     * @param {*} type 
     * @param {*} content 
     */
	async createLog(admin_id, type, content) {

		return await this.create({
			admin_id: admin_id,
			type: type,
			content: content
		});
	}

}

module.exports = new AdminLogModel();