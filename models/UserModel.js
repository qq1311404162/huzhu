const md5 = require('md5');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const Model = require('./Model');
const db = require('../models/index');
const config = require('../config/config');

class UserModel extends Model {

	constructor() {

		super(db.User);
	}

	/**
	 * 设置密码
	 * @param {*} value 
	 */
	async setPassword(value) {

		return md5('huzhu' + value);
	}

	/**
	 * 手机唯一性检测
	 * @param {*} mobile 
	 */
	async uniqueMobile(mobile) {

		if (!mobile)
			return false;

		let user = await this.findOne({
			attributes: ['id'],
			where: {
				mobile: mobile
			}
		});

		return user === null ? true : false;
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


	/**
	 * 真实姓名检测
	 * @param {*} realname 
	 */
	async uniqueRealname(realname, preArr) {

		if (!realname)
			return false;

		let previousUsers = await this.findAll({
			attributes: ['realname'],
			where: {
				id: {
					[Sequelize.Op.or]: preArr
				}
			}
		});

		let preRealname = [];
		for (let pres of previousUsers) {

			if (pres.realname)
				preRealname.push(pres.realname);
		}

		return preRealname.indexOf(realname) === -1 ? true : false;
	}

	/**
	 * 设置 jwt token
	 * @param {*} data 
	 */
	async setToken(data) {

		return config.jwt.pre + jwt.sign(data, config.jwt.token, {
			expiresIn: config.jwt.express
		});
	}

	async getUserInfo(id) {

		return this.findOne({
			attributes: ['id', 'username', 'mobile', 'realname', 'avatar', 'team_id', 'state'],
			where: {
				id: id
			},
			include: [db.Team]
		});
	}


	async getEditInfo(id) {

		return this.findOne({
			attributes: ['id', 'mobile', 'realname', 'avatar', 'card_name', 'card_nums', 'wechat_qrcode', 'alipay_qrcode'],
			where: {
				id: id
			}
		});
	}
}

module.exports = new UserModel();