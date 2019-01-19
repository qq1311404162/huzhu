const Sequelize = require('sequelize');
const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

class BangzhuModel extends Model {

	constructor() {

		super(db.Bangzhu);

		this.staticValue = {
			state: {
				0: '等待匹配',
				1: '等待确认',
				2: '已完成'
			},
			type: {
				1: '自身额度',
				2: '用户赠送'
			}
		};
	}


	/**
     * 获取当天帮助的条数
     * @param {*} user_id 
     */
	async getDayCount(user_id) {

		return await this.count({
			where: {
				user_id: user_id,
				created_at: {
					[Sequelize.Op.gte]: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
					[Sequelize.Op.lte]: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
				}
			}
		});
	}

	/**
     * 获取用户当前自身帮助中未完成的条数
     * @param {*} user_id 
     */
	async getMainDoingCount(user_id) {

		return await this.count({
			where: {
				user_id: user_id,
				type: 1,
				state: {
					[Sequelize.Op.in]: [0, 1]
				}
			}
		});
	}

	/**
     * 获取用户赠送机会本月帮助的条数
     * @param {*} user_id 
     */
	async getGiftDoingCount(user_id) {

		return await this.count({
			where: {
				user_id: user_id,
				type: 2,
				created_at: {
					[Sequelize.Op.gte]: moment().startOf('month'),
					[Sequelize.Op.lte]: moment().endOf('month')
				}
			}
		});
	}

	/**
     * 写入数据表中
     * @param {*} data 
     */
	async bangzhu(data, user, available) {
		// 订单编号
		data.ident = 'b' + moment().format('YYYYMMDDHHmmss') + Math.floor(Math.random() * 1000).toString();
		// 关联数据写入
		data.bangzhu_infos = Object.assign({}, data);

		return await db.sequelize.transaction(t => {

			return this.create(data, {
				include: [db.BangzhuInfo]
			},{
				transaction: t
			}).then(() => {
				// 递减
				return user.decrement('bangzhu_golds', {
					by: available
				}, {
					transaction: t
				});
			});
		});
	}


	/**
     * 获取未完成的帮助记录
     * @param {*} user_id 
     */
	async getNotDoneLists(user_id) {

		return await this.findAll({
			where: {
				user_id: user_id,
				state: {
					[Sequelize.Op.in]: [0, 1]
				}
			}
		});
	}


	/**
     * 获取全部帮助记录
     * @param {*} user_id 
     */
	async getLists(user_id) {
		return await this.findAll({
			where: {
				user_id: user_id,
			},
			include: [{
				model: db.BangzhuInfo,
				attributes: ['id', 'amount', 'state'],
				include: [db.BangQiu]
			}]
		});
	}

	/**
     * 获取最近一次未完成帮助记录的金额
     * @param {*} user_id 
     */
	async getLatestDoingAmount(user_id) {

		let bangzhu = await this.findOne({
			attributes: ['amount'],
			where: {
				user_id: user_id,
			},
			order: [
				['id', 'DESC']
			]
		});

		return bangzhu !== null ? bangzhu.getDataValue('amount') : 0;
	}

}

module.exports = new BangzhuModel();