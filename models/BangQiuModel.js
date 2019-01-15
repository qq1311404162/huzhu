const Sequelize = require('sequelize');
const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

const bangzhuInfoModel = require('./BangzhuInfoModel');
const qiuzhuInfoModel = require('./QiuzhuInfoModel');

class BangQiuModel extends Model {

	constructor() {

		super(db.BangQiu);

		this.staticValue = {
			state: {
				0: '等待打款',
				1: '等待确认',
				2: '已完成',
				9: '作废'
			}
		};
	}

	async pipei(data) {

		return await db.sequelize.transaction(t => {

			let updateData = {
				state: 1
			};

			return qiuzhuInfoModel.update(updateData, {
				where: {
					id: data.qiuzhu_info_id
				}
			}, {
				transaction: t
			}).then(() => {

				return bangzhuInfoModel.update(updateData, {
					where: {
						id: data.bangzhu_info_id
					}
				}, {
					transaction: t
				}).then(() => {

					return this.create(data, {
						transaction: t
					}, {
						transaction: t
					});
				});
			});

		});
	}


	/**
	 * 更新打款信息
	 * @param {*} id 
	 * @param {*} pic_path 
	 */
	async updateMake(id, pic_path) {

		return await this.update({
			pic: pic_path,
			make_time: moment().format('YYYY-MM-DD HH:mm:ss'),
			state: 1
		}, {
			where: {
				id: id
			}
		});
	}


	/**
	 * 确认信息
	 * @param {*} id 
	 */
	async confirmData(data) {

		return await db.sequelize.transaction(t => {

			let updateData = {
				state: 2
			};

			return qiuzhuInfoModel.update(updateData, {
				where: {
					id: data.qiuzhu_info_id
				}
			}, {
				transaction: t
			}).then(() => {

				return bangzhuInfoModel.update(updateData, {
					where: {
						id: data.bangzhu_info_id
					}
				}, {
					transaction: t
				}).then(() => {

					return this.update(updateData, {
						where: {
							id: data.id
						}
					}, {
						transaction: t
					}, {
						transaction: t
					});
				});
			});

		});
	}

	async testt() {

		setTimeout(() => {
			for (let i = 0; i <= 100000000000000; i++) {

				if (i == 1000000000) {
					return i;
				}
			}
		}, 0);


	}

}

module.exports = new BangQiuModel();