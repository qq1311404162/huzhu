const md5 = require('md5');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const Model = require('./Model');
const db = require('../models/index');
const config = require('../config/config');

const teamModel = require('./TeamModel');

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


	/**
	 * 用户注册
	 * @param {*} data 
	 */
	async register(data) {

		let pwd = data.password;
		data.password = await this.setPassword(pwd);
		// 团队级别
		data.team_id = 1;
		// 支付密码
		data.payword = pwd;

		return await this.create(data);
	}

	/**
	 * 获取用户信息
	 * @param {*} id 
	 */
	async getUserInfo(id) {

		return this.findOne({
			attributes: ['id', 'username', 'mobile', 'realname', 'avatar', 'team_id', 'state'],
			where: {
				id: id
			},
			include: [db.Team]
		});
	}


	/**
	 * 用户激活
	 * @param {*} user 
	 */
	async activation(user) {

		return this.update({
			state: 1,
			active_golds: user.active_golds - 1
		}, {
			where: {
				id: user.id
			}
		});
	}


	/**
	 * 赠送
	 * @param {*} user 
	 * @param {*} toUser 
	 * @param {*} to_nums 
	 * @param {*} type 
	 */
	async give(user, toUser, to_nums, type) {

		return db.sequelize.transaction(function (t) {

			// 赠送的用户减少激活码数量
			return user.decrement(type, {
				by: to_nums,
				transaction: t
			}).then(() => {
				// 被赠送的用户增加激活码数量
				return toUser.increment(type, {
					by: to_nums,
					transaction: t
				});
			});
		});
	}


	/**
	 * 获取修改信息内容
	 * @param {*} id 
	 */
	async getEditInfo(id) {

		return this.findOne({
			attributes: ['id', 'mobile', 'realname', 'avatar', 'card_name', 'card_nums', 'wechat_qrcode', 'alipay_qrcode'],
			where: {
				id: id
			}
		});
	}


	/**
	 * 返回用户直推且完成帮助的人数
	 * @param {*} previous_id 
	 */
	async getUserZhituiCount(previous_id) {

		return await this.count({
			where: {
				previous_id: previous_id,
				freeze: {
					[Sequelize.Op.ne]: '0.00'
				}
			}
		});
	}


	/**
	 * 返回用户团队人数
	 * @param {*} id 
	 */
	async getUserTeamCount(id) {

		return await this.count({
			where: {
				[Sequelize.Op.or]: [{
					previous_id: id
				},
				{
					previous_two_id: id
				},
				{
					previous_thr_id: id
				},
				],
			}
		});
	}

	/**
	 * 返回用户团队且完成帮助的人数
	 * @param {*} id 
	 */
	async getUserTeamDoneCount(id) {

		return await this.count({
			where: {
				[Sequelize.Op.or]: [{
					previous_id: id
				},
				{
					previous_two_id: id
				},
				{
					previous_thr_id: id
				},
				],
				freeze: {
					[Sequelize.Op.ne]: '0.00'
				}
			}
		});
	}

	/**
	 * 更新用户团队级别
	 * @param {*} user 
	 */
	async updateTeamLevel(user) {
		// 用户下一级的信息
		let nextTeamInfo = teamModel.findOne({
			where: {
				id: user.team_id + 1
			}
		});
		// 有下一级信息，则开始更新
		if (nextTeamInfo) {
			// 获取直推人数和团队人数
			let [zhituiCount, teamCount] = Promise.all([this.getUserZhituiCount(user.id), this.getUserTeamCount(user.id)]);

			// 如果直推人数和团队人数都超过下一级的信息，更新团队级别
			if (zhituiCount >= nextTeamInfo.getDataValue('zhitui_num') && teamCount >= nextTeamInfo.getDataValue('tem_num')) {

				this.update({
					team_id: nextTeamInfo.getDataValue('id')
				}, {
					where: {
						id: user.id
					}
				});
			}
		}
	}


	/**
	 * 更新用户帮助次数
	 * @param {*} count 
	 */
	async updateUserBangzhuCount(user_id, count) {

		await this.update({
			bangzhu_nums: count
		}, {
			where: {
				id: user_id
			}
		});
	}
}

module.exports = new UserModel();