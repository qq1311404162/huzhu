const md5 = require('md5');
const Sequelize = require('sequelize');

const db = require('../models/index');
const User = db.User;

class UserModel {

	/**
     * 查询单条记录
     * @param {*} opts 
     */
	static async findOne(opts) {

		return await User.findOne(opts);
	}


	/**
     * 查询多条记录
     * @param {*} opts 
     */
	static async findAll(opts) {

		return await User.findAll(opts);
	}


	/**
     * 创建用户
     * @param {*} data 
     */
	static async create(data) {

		return await User.create(data);
	}


	/**
     * 设置密码
     * @param {*} value 
     */
	static async setPassword(value) {

		return md5('huzhu' + value);
	}

	/**
     * 手机唯一性检测
     * @param {*} mobile 
     */
	static async uniqueMobile(mobile) {

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
	static async uniqueUsername(username) {

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
	static async uniqueRealname(realname, preArr) {

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
}

module.exports = UserModel;