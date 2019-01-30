const bangzhuInfoModel = require('../../models/BangzhuInfoModel');
const qiuzhuInfoModel = require('../../models/QiuzhuInfoModel');
const bangzhuModel = require('../../models/BangzhuModel');
const qiuzhuModel = require('../../models/QiuzhuModel');
const settingModel = require('../../models/SettingModel');
const userModel = require('../../models/UserModel');

const Rate = require('./Rate');

const moment = require('moment');
const Mathjs = require('mathjs');


class Util {


	/**
     * 确认求助完成
     * @param {*} qiuzhuInfo 
     */
	static async qiuzhuConfirm(qiuzhuInfo) {
		// 1.查找所有拆分表是否全部完成
		let count = await qiuzhuInfoModel.notDoneCountByIdent(qiuzhuInfo);

		if (count === 0) {

			let qiuzhu = await qiuzhuModel.findOne({
				where: {
					id: qiuzhuInfo.qiuzhu_id
				}
			});

			if (qiuzhu && qiuzhu.getDataValue('state') === 0) {
				// 求助表更新为已完成

				await qiuzhuModel.done(qiuzhuInfo.qiuzhu_id);


			}
		}
	}


	/**
     * 确认帮助完成
     * @param {*} bangzhuInfo 
     */
	static async bangzhuConfirm(bangzhuInfo) {

		// 1.查找所有拆分表是否全部完成
		let count = await bangzhuInfoModel.notDoneCountByIdent(bangzhuInfo);
		// 2.全部完成后更新帮助表状态(先检查状态是否已完成)
		if (count === 0) {

			let bangzhu = await bangzhuModel.findOne({
				where: {
					id: bangzhuInfo.bangzhu_id
				}
			});

			if (bangzhu && bangzhu.getDataValue('state') === 0) {
				// 更新帮助表为已完成
				let done = await bangzhuModel.done(bangzhu.getDataValue('id'));

				// 3.帮助表更新后，进行帮助表完成结算方法
				if (done) {
					let user = await userModel.findOne({
						attributes: [],
						where: {
							id: bangzhu.getDataValue('user_id')
						}
					});

					if (user) {

						// 首次排单，本金放入冻结字段中
						if (user.getDataValue('freeze') == '0.00') {
							await userModel.update({
								freeze: bangzhu.getDataValue('amount')
							}, {
								where: {
									id: user.getDataValue('id')
								}
							});

							// 写入日志中
							// 更新团队级别，并确认机会排单次数
							if (user.getDataValue('previous_id')) {
								// 获取上家信息
								let previousUser = userModel.getUserInfo(user.getDataValue('previous_id'));
								// 更新上家团队级别
								await userModel.updateTeamLevel(previousUser.get({
									plain: true
								}));

								if (previousUser.getDataValue('previous_id')) {
									// 获取上上家信息
									let previousTwoUser = userModel.getUserInfo(previousUser.getDataValue('previous_id'));
									// 更新上上家团队级别
									await userModel.updateTeamLevel(previousTwoUser.get({
										plain: true
									}));
								}

								// 判断上级直推人数，根据人数更改排单次数
								let zhituiCount = await userModel.getUserZhituiCount(user.getDataValue('previous_id'));
								// 更新用户帮助次数
								if (zhituiCount > 20 && user.getDataValue('bangzhu_nums') != 30) {

									await userModel.updateUserBangzhuCount(user.getDataValue('id'), 30);

								} else if (zhituiCount > 10 && user.getDataValue('bangzhu_nums') != 20) {

									await userModel.updateUserBangzhuCount(user.getDataValue('id'), 20);

								} else if (zhituiCount > user.getDataValue('bangzhu_nums')) {

									await userModel.updateUserBangzhuCount(user.getDataValue('id'), zhituiCount);
								}
							}

						} else {
							// 非首次排单，本金放入静态钱包中
							await user.increment('static_wallet', {
								by: bangzhu.getDataValue('amount')
							}).then(() => {
								// 写入日志中
							});
						}

						// 如果设置是固定收益，开始计算收益
						let setting = await settingModel.findOne({
							attributes: ['name', 'value'],
							where: {
								name: 'rate_mode'
							}
						});

						if (setting && setting.getDataValue('value') == 1) {

							await Util.updateGudingRate(bangzhu.get({
								plain: true
							}), user.get({
								plain: true
							}));
							// 计算自己的利息，并放入静态钱包中
							// 计算上级的利息，并放入动态钱包中
							// 计算上上级的利息，并放入动态钱包中
							// Util.rate(); ???
						}
					}

				}
			}
		}
	}
	/**
     * 确认该订单关联的帮助和求助完成
     * @param {*} opts 
     */
	static async confirm(bangQiu) {

		await Util.bangzhuConfirm(bangQiu.bangzhu_info);
		await Util.qiuzhuConfirm(bangQiu.qiuzhu_info);
	}


	/**
     * 更新固定分配利息
     * @param {*} bangzhu 
     */
	async updateGudingRate(bangzhu, user) {

		let [bangzhuInfos, setting] = Promise.all([
			bangzhuInfoModel.findAllInfos(bangzhu),
			settingModel.findMul(['reward_trans_time', 'reward_trans_rate', 'timeout_trans_time'])
		]);

		let rate = 15,
			previousUser = null,
			previousTwoUser = null,
			rateArr = [];

		if (user.previous_id) {

			previousUser = await userModel.getUserInfo(user.previous_id);

			if (previousUser && previousUser.previous_id) {

				previousTwoUser = await userModel.getUserInfo(previousUser.previous_id);
			}
		}

		if (bangzhuInfos.length) {

			for (const bangzhuInfo of bangzhuInfos) {

				let confirm_time = moment(bangzhuInfo.getDataValue('bang_qiu').getDataValue('make_time')),
					created_time = moment(bangzhuInfo.getDataValue('bang_qiu').getDataValue('created_at'));
				// 奖励时间内打款，增加额度
				if (confirm_time.diff(created_time, 'seconds') > (setting.reward_trans_time * 3600)) {

					rate += setting.reward_trans_rate;

					let userRate = Mathjs.round(Mathjs.multiply(bangzhuInfo.getDataValue('amount'), Mathjs.divide(rate + setting.reward_trans_rate, 100)), 2);

					let previousUseRate = Mathjs.round(Mathjs.multiply(userRate, ), 2);



				} else if (confirm_time.diff(created_time, 'seconds') > (setting.timeout_trans_time * 3600)) {
					// 超时，不打款
					rate = 0;
				}



			}
		}
	}

	// /**
	//  * 帮助表是否已完成
	//  */
	// static async bangzhuDone(bangzhuInfo) {

	// 	// 1.查找所有拆分表是否全部完成
	// 	let count = bangzhuInfoModel.notDoneCountByIdent(bangzhuInfo);
	// 	// 2.全部完成后更新帮助表状态(先检查状态是否已完成)
	// 	if (count === 0) {

	// 		let bangzhu = bangzhuModel.findOne({
	// 			where: {
	// 				id: bangzhuInfo.bangzhu_id
	// 			}
	// 		});

	// 		if (bangzhu && bangzhu.getDataValue('state') === 0) {
	// 			// 更新帮助表为已完成
	// 			let done = await bangzhuModel.done(bangzhu.getDataValue('id'));

	// 			// 3.帮助表更新后，进行帮助表完成结算方法
	// 			if (done) {
	// 				// 确认是否是固定结算
	// 				// let setting = 

	// 				// 计算自己的利息，并放入静态钱包中
	// 				// 计算上级的利息，并放入动态钱包中
	// 				// 计算上上级的利息，并放入动态钱包中
	// 			}
	// 		}
	// 	}
	// }
}

module.exports = Util;