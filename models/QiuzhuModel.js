const Sequelize = require('sequelize');
const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

const userModel = require('./UserModel');

class QiuzhuModel extends Model {

	constructor() {

		super(db.Qiuzhu);

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
     * 写入数据表中
     * @param {*} data 
     */
	async qiuzhu(data, user) {
		// 订单编号
		data.ident = 'q' + moment().format('YYYYMMDDHHmmss') + Math.floor(Math.random() * 1000).toString();
		// 关联数据写入
		data.qiuzhu_infos = Object.assign({}, data);

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
     * 获取全部帮助记录
     * @param {*} user_id 
     */
	async getLists(user_id) {
		return await this.findAll({
			where: {
				user_id: user_id,
			}
		});
	}

}

module.exports = new QiuzhuModel();