const Sequelize = require('sequelize');
const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

class QiuzhuInfoModel extends Model {

	constructor() {

		super(db.QiuzhuInfo);

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

	/**
	 * 获取未完成订单的数量
	 * @param {*} qiuzhuInfo 
	 */
	async notDoneCountByIdent(qiuzhuInfo) {

		return this.count({
			where: {
				ident: qiuzhuInfo.ident,
				user_id: qiuzhuInfo.user_id,
				qiuzhu_id: qiuzhuInfo.qiuzhu_id,
				state: 0
			}
		});
	}

}

module.exports = new QiuzhuInfoModel();