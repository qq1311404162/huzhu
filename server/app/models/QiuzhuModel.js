const Sequelize = require('sequelize');
const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

const userModel = require('./UserModel');

class QiuzhuModel extends Model {

	constructor() {

		super(db.Qiuzhu);

		this.type = {
			1: '静态钱包',
			2: '动态钱包'
		};
	}

	/**
	 * 获取全部求助记录
	 * @param {*} user_id 
	 * @param {*} page 
	 * @param {*} limit 
	 */
	async getLists(user_id, page, limit) {

		return await this.findAll({
			where: {
				user_id: user_id,
			},
			include: [{
				model: db.QiuzhuInfo,
				attributes: ['id', 'amount', 'state'],
				include: [db.BangQiu]
			}],
			offset: (parseInt(page) - 1) * parseInt(limit),
			limit: parseInt(limit)
		});
	}

	/**
	 * 写入数据表中
	 * @param {*} data 
	 */
	async qiuzhu(data, user) {
		// 订单编号
		data.ident = 'qz' + moment().format('YYYYMMDDHHmmss') + Math.floor(Math.random() * 1000).toString();
		// 关联数据写入
		data.qiuzhu_infos = {
			amount: data.amount
		};

		return await db.sequelize.transaction(t => {

			return this.create(data, {
				include: [db.QiuzhuInfo]
			}, {
				transaction: t
			}).then(() => {
				// 根据类型减去相应的钱包金额
				let type = data.type == 1 ? 'static_wallet' : 'dynamic_wallet';

				return user.decrement(type, {
					by: data.amount
				}, {
					transaction: t
				});
			});

		});

	}


	/**
	 * 获取未完成的求助记录
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
	 * 完成求助
	 * @param {*} id 
	 */
	async done(id) {

		return await this.update({
			state: 1
		}, {
			where: {
				id: id
			}
		});
	}

}

module.exports = new QiuzhuModel();