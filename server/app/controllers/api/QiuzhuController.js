const qiuzhuModel = require('../../models/QiuzhuModel');
const bangzhuModel = require('../../models/BangzhuModel');
const userModel = require('../../models/UserModel');
const settingModel = require('../../models/SettingModel');
const bangzhuInfoModel = require('../../models/BangzhuInfoModel');
const qiuzhuInfoModel = require('../../models/QiuzhuInfoModel');
const bangQiuModel = require('../../models/BangQiuModel');

const Mathjs = require('mathjs');

const errCode = require('../../config/error-code');
const config = require('../../config/config');
const Utils = require('../utils/Util');

class QiuzhuController {

	/**
	 * 求助页面首页
	 * @param {*} ctx 
	 */
	static async index(ctx) {

		let requestUser = ctx.state.user,
			query = ctx.request.query;

		if (!requestUser.id) {

			return ctx.json(errCode.less_params);
		}

		let page = query.page || 1,
			limit = query.length || 10;

		// 获取用户帮助额度和用户状态
		let lists = await qiuzhuModel.getLists(requestUser.id, page, limit);

		return ctx.json({
			data: {
				lists: lists,
				type: qiuzhuModel.type,
				state: config.genState,
			}
		});
	}


	static async getAdd(ctx) {

		let requestUser = ctx.state.user;

		if (!requestUser.id) {

			return ctx.json(errCode.less_params);
		}

		// 获取用户钱包金额
		let [user, setting] = await Promise.all([userModel.findById(requestUser.id, {
			attributes: ['id', 'static_wallet', 'dynamic_wallet'],
		}), settingModel.findMul(['dynamic_wallet_base', 'dynamic_wallet_mul', 'static_wallet_base', 'static_wallet_mul'])]);

		if (!user) {
			return ctx.json(errCode.illegal_user);
		}

		if (!setting) {

			return ctx.json(errCode.err_setting);
		}

		return ctx.json({
			data: {
				user: user.get({
					plain: true
				}),
				setting: setting

			}
		});
	}


	/**
	 * 求助
	 * @param {*} ctx 
	 * 1.求助上限为当前最近帮助额度的1.5倍
	 * 2.求助时至少有一个帮助中的列表
	 * 3.求助金额必须满足全局数据的设置条件
	 */
	static async postAdd(ctx) {

		let request = ctx.request.body,
			requestUser = ctx.state.user;

		if (!requestUser.id || !request.type || !request.payword || !request.amount) {

			return ctx.json(errCode.less_params);
		}

		// 获取设置中的排单额度基数
		let [setting, user, bangzhuAmount] = await Promise.all([settingModel.findMul(['dynamic_wallet_base', 'dynamic_wallet_mul', 'static_wallet_base', 'static_wallet_mul']), userModel.findOne({
			attributes: ['id', 'state', 'payword', 'dynamic_wallet', 'static_wallet'],
			where: {
				id: requestUser.id
			}
		}), bangzhuModel.getLatestDoingAmount(requestUser.id)]);

		if (!user) {

			return ctx.json(errCode.err_user);
		}

		if (!setting) {

			return ctx.json(errCode.err_setting);
		}

		// 提现金额需要满足全局设置信息
		if ((request.type == 1 && (request.amount < setting.static_wallet_base || (request.amount % parseInt(setting.static_wallet_mul) !== 0))) || (request.type == 2 && (request.amount < setting.dynamic_wallet_base || (request.amount % parseInt(setting.dynamic_wallet_mul) !== 0)))) {

			return ctx.json(errCode.illegal_qiuzhu_amount);
		}
		// 提现金额必须要超过钱包金额
		if (request.type == 1 && (request.amount - user.getDataValue('static_wallet') > 0)) {

			return ctx.json(errCode.illegal_static_wallet);
		}

		if (request.type == 2 && (request.amount - user.getDataValue('dynamic_wallet') > 0)) {

			return ctx.json(errCode.illegal_dynamic_wallet);
		}

		// 董涛求助金额必须不超过最近帮助金额的1.5倍
		if (request.type == 2 && request.amount > Mathjs.multiply(bangzhuAmount, 1.5)) {

			return ctx.json(errCode.illegal_max_bangzhu_amount);
		}
		// 开始求助
		await qiuzhuModel.qiuzhu({
			user_id: requestUser.id,
			amount: request.amount,
			type: request.type,
		}, user).then(() => {

			return ctx.json({
				code: 0,
				msg: '求助成功'
			});

		}).catch(() => {

			return ctx.json(errCode.err_qiuzhu);
		});
	}


	/**
	 * 匹配
	 * @param {*} ctx 
	 */
	static async pipei(ctx) {

		let request = ctx.request.body;

		if (!request.bangzhu_info_id || !request.qiuzhu_info_id) {

			return ctx.json(errCode.less_params);
		}

		let [bangzhuInfo, qiuzhuInfo] = await Promise.all([bangzhuInfoModel.getInfoWithBangzhu(request.bangzhu_info_id), qiuzhuInfoModel.getInfoWithQiuzhu(request.qiuzhu_info_id)]);

		if (!bangzhuInfo || !qiuzhuInfo) {

			return ctx.json({
				code: -1,
				msg: 'not exist'
			});
		}

		if (bangzhuInfo.getDataValue('amount') != qiuzhuInfo.getDataValue('amount')) {

			return ctx.json({
				code: -1,
				msg: 'amount 不相等'
			});
		}

		if (bangzhuInfo.getDataValue('bangzhu').getDataValue('user_id') === qiuzhuInfo.getDataValue('qiuzhu').getDataValue('user_id')) {

			return ctx.json({
				code: -1,
				msg: '用户不能是同一人'
			});
		}

		if (bangzhuInfo.getDataValue('state') !== 0 || qiuzhuInfo.getDataValue('state') !== 0) {

			return ctx.json({
				code: -1,
				msg: '状态不对'
			});
		}

		let bangQiu = await bangQiuModel.getOne({
			bangzhu_info_id: request.bangzhu_info_id,
			qiuzhu_info_id: request.qiuzhu_info_id
		});

		if (bangQiu) {

			return ctx.json({
				code: -1,
				msg: '已经匹配过'
			});
		}

		await bangQiuModel.pipei({
			bangzhu_info_id: request.bangzhu_info_id,
			qiuzhu_info_id: request.qiuzhu_info_id,
		}).then(() => {

			return ctx.json({
				code: 0,
				msg: 'success'
			});
		}).catch(() => {

			return ctx.json({
				code: -1,
				msg: 'fail'
			});
		});

	}


	/**
	 * 确认匹配订单
	 * @param {*} ctx 
	 */
	static async confirm(ctx) {

		let request = ctx.request.body;

		if (!request.id) {

			return ctx.json(errCode.less_params);
		}

		let bangQiu = await bangQiuModel.getOne({
			id: request.id
		});



		if (!bangQiu || bangQiu.getDataValue('state') !== 1) {

			return ctx.json(errCode.illegal_bangzhu_dakuan);
		}
		// 确认
		let result = await bangQiuModel.confirmData(bangQiu.get({
			plain: true
		}));

		if (!result) {

			return ctx.json(errCode.err_confirm);
		}

		// 求助表和帮助表最终确认,使用异步
		setTimeout(() => {
			Utils.confirm(bangQiu.get({
				plain: true
			}));
		}, 0);


		return ctx.json({
			msg: 'success'
		});
	}
}

module.exports = QiuzhuController;