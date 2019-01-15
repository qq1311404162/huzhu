const Sequelize = require('sequelize');
const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

class QiuzhuInfoModel extends Model {

	constructor() {

		super(db.QiuzhuInfo);

		this.staticValue = {
			state: {
				0: '等待匹配',
				1: '等待确认',
				2: '已完成'
			},
			type: {
				1: '静态钱包',
				2: '动态钱包'
			}
		};
	}

	/**
	 * 拆分指定金额
	 * @param {*} amount 
	 */
	async chai(qiuzhuInfo, amount) {

		// 复制一份并修改内容
		let newData = Object.assign({}, qiuzhuInfo.get({
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
				return qiuzhuInfo.decrement('amount', {
					by: amount
				}, {
					transaction: t
				});
			});
		});
	}

}

module.exports = new QiuzhuInfoModel();