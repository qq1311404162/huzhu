// const Sequelize = require('sequelize');
// const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

class BangzhuInfoModel extends Model {

	constructor() {

		super(db.BangzhuInfo);

		this.staticValue = {
			state: {
				0: '处理中',
				1: '已完成',
				9: '作废'
			},
			type: {
				1: '静态钱包',
				2: '动态钱包'
			}
		};
	}


	/**
	 * 获取带帮助信息的帮助详情
	 * @param {*} id 
	 */
	async getInfoWithBangzhu(id) {

		return await this.findById(id, {
			include: [{
				model: db.Bangzhu
			}],
		});
	}


	/**
	 * 获取帮助拆分表，关联用户表和关联匹配表的信息
	 * @param {*} id 
	 */
	async getInfo(id) {

		return this.findOne({
			// attribute: [],
			where: {
				id: id
			},
			include: [{
				model: db.Bangzhu,
				include: [db.User]
			}, {
				model: db.BangQiu
			}]
		});
	}


	/**
	 * 拆分指定金额
	 * @param {*} amount 
	 */
	async chai(bangzhuInfo, amount) {

		// 复制一份并修改内容
		let newData = Object.assign({}, bangzhuInfo.get({
			plain: true
		}));

		newData.amount = amount;

		delete(newData.id);

		// 保存
		return await db.sequelize.transaction(t => {

			return this.create(newData, {
				transaction: t
			}).then(() => {
				// 递减
				return bangzhuInfo.decrement('amount', {
					by: amount
				}, {
					transaction: t
				});
			});
		});
	}

	/**
	 * 获取未完成订单的数量
	 * @param {*} ident 
	 */
	async notDoneCountByIdent(bangzhuInfo) {

		return this.count({
			where: {
				ident: bangzhuInfo.ident,
				user_id: bangzhuInfo.user_id,
				bangzhu_id: bangzhuInfo.bangzhu_id,
				state: 0
			}
		});
	}


	/**
	 * 获取指定已完成的全部拆分订单
	 * @param {*} bangzhuInfo 
	 */
	async findAllInfos(bangzhuInfo) {

		return await this.findAll({
			where: {
				ident: bangzhuInfo.ident,
				user_id: bangzhuInfo.user_id,
				bangzhu_id: bangzhuInfo.bangzhu_id,
			},
			include: [db.BangQiu]
		});
	}

}

module.exports = new BangzhuInfoModel();