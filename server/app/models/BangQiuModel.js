// const Sequelize = require('sequelize');
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

	/**
	 * 匹配
	 * @param {*} data 
	 */
	async pipei(data) {

		let upadteData = {
			state: 1
		};
		return await db.sequelize.transaction(t => {

			return bangzhuInfoModel.update(upadteData, {
				where: {
					id: data.bangzhu_info_id
				}
			}, {
				transaction: t
			}).then(() => {

				return qiuzhuInfoModel.update(upadteData, {
					where: {
						id: data.qiuzhu_info_id
					}
				}, {
					transaction: t
				}).then(() => {

					return this.create(data);
				});
			});
		});
	}


	/**
	 * 获取带有求助用户信息
	 * @param {*} id 
	 */
	async getInfoWithQiuzhu(id) {

		return await this.findById(id, {
			include: [{
				model: db.QiuzhuInfo,
				include: [{
					model: db.Qiuzhu,
					include: [db.User]
				}]
			}]
		});
	}


	/**
	 * 获取单个数据
	 * @param {*} id 
	 */
	async getOne(id) {

		return this.findById(id, {
			include: [db.QiuzhuInfo, db.BangzhuInfo]
		});
	}


	/**
	 * 更新打款信息
	 * @param {*} data 
	 */
	async updateMake(data) {

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

					return this.update({
						pic: data.pic,
						make_time: moment().format('YYYY-MM-DD HH:mm:ss'),
					}, {
						where: {
							id: data.id
						}
					}, {
						transaction: t
					});
				});
			});

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
				},
				updateInfoData = {
					state: 1
				};

			return qiuzhuInfoModel.update(updateInfoData, {
				where: {
					id: data.qiuzhu_info_id
				}
			}, {
				transaction: t
			}).then(() => {

				return bangzhuInfoModel.update(updateInfoData, {
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