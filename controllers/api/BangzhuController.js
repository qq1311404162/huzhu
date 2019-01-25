const bangzhuModel = require('../../models/BangzhuModel');
const userModel = require('../../models/UserModel');
const settingModel = require('../../models/SettingModel');
const bangzhuInfoModel = require('../../models/BangzhuInfoModel');
const bangQiuModel = require('../../models/BangQiuModel');

const Math = require('mathjs');

const errCode = require('../../config/error-code');

class BangzhuController {



	/**
	 * 帮助页面首页
	 * @param {*} ctx 
	 */
	static async index(ctx) {

		let requestUser = ctx.state.user;

		if (!requestUser.id) {

			return ctx.json(errCode.less_params);
		}

		// 获取用户帮助额度和用户状态
		let lists = await bangzhuModel.getLists(requestUser.id);

		return ctx.json({
			data: {
				lists: lists,
				type: bangzhuModel.staticValue.type,
				bangzhuState: bangzhuModel.staticValue.state,
				bangQiuState: bangQiuModel.staticValue.state,
				infoState: bangzhuModel.staticValue.state


			}
		});
	}

	static async getAdd(ctx) {

		let requestUser = ctx.state.user;

		if (!requestUser.id) {

			return ctx.json(errCode.less_params);
		}

		// 获取用户帮助额度和用户状态
		let [user, setting] = await Promise.all([userModel.findOne({
			attributes: ['id', 'available', 'state', 'bangzhu_nums'],
			where: {
				id: requestUser.id
			}
		}), settingModel.findOne({
			attributes: ['name', 'value'],
			where: {
				name: 'unit'
			}
		})]);

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
				setting: setting.get({
					plain: true
				})


			}
		});
	}
	/**
	 * 开始排单
	 * @param {*} ctx 
	 * 用户id   排单类型    排单倍数    交易密码
	 */
	static async postAdd(ctx) {

		let request = ctx.request.body,
			requestUser = ctx.state.user;

		if (!requestUser.id || !request.type || !request.payword || !request.available) {

			return ctx.json(errCode.less_params);
		}

		// 获取设置中的排单额度基数
		let setting = await settingModel.findOne({
			attributes: ['name', 'value'],
			where: {
				name: 'unit'
			}
		});

		// 用户验证
		let user = await userModel.findOne({
			attributes: ['id', 'available', 'state', 'payword', 'bangzhu_nums', 'bangzhu_golds'],
			where: {
				id: requestUser.id
			}
		});

		if (user === null)
			return ctx.json(errCode.illegal_user);

		// 用户状态验证
		if (user.state !== 1)
			return ctx.json(errCode.illegal_bangzhu_state);

		// 选择金额超过自身可用额度
		if (user.available < request.available)
			return ctx.json(errCode.illegal_bangzhu_amount);

		// 支付密码不正确
		if (user.payword !== request.payword)
			return ctx.json(errCode.illegal_payword);

		// 需要排单币
		if (user.bangzhu_golds < request.available) {
			return ctx.json(errCode.less_bangzhu_golds);
		}

		// 一天只能帮助一次
		let dayCount = await bangzhuModel.getDayCount(requestUser.id);

		if (dayCount > 0)
			return ctx.json(errCode.illegal_bangzhu_day_count);

		// 额度排单当前只能排一个
		if (request.type == 1) {

			let bangzhuCount = await bangzhuModel.getMainDoingCount(requestUser.id);

			if (bangzhuCount > 0) {

				return ctx.json(errCode.illegal_bangzhu_count);
			}
		}

		// 次数排单不能超过当前次数
		if (request.type == 2) {
			// 当前可用排单次数不足
			if (user.bangzhu_nums < 1)
				return ctx.json(errCode.illegal_less_bangzhu_count);

			// 获取当月
			let bangzhuCount = await bangzhuModel.getGiftDoingCount(requestUser.id);
			// 当前排单次数达到上限
			if (user.bangzhu_nums <= bangzhuCount) {

				return ctx.json(errCode.illegal_more_bangzhu_count);
			}
		}

		// 开始排单

		await bangzhuModel.bangzhu({
			user_id: requestUser.id,
			amount: Math.multiply(setting.value || 900, request.available),
			type: request.type,

		}, user, request.available).then(() => {

			return ctx.json({
				code: 0,
				msg: '排单成功'
			});
		}).catch(() => {

			return ctx.json(errCode.err_bangzhu);
		});
	}

	/**
	 * 帮助拆分
	 * @param {*} ctx 
	 */
	static async bangzhuChai(ctx) {

		let request = ctx.request.body;

		if (!request.amount || !request.id) {

			return ctx.json(errCode.less_params);
		}

		let bangzhuInfo = await bangzhuInfoModel.findOne({
			where: {
				id: request.id
			}
		});

		if (!bangzhuInfo) {

			return ctx.json({
				code: -1,
				msg: 'aaa'
			});
		}
		// 拆分状态只能是待打款
		if (bangzhuInfo.getDataValue('state') !== 0) {

			return ctx.json({
				code: -2,
				msg: 'aaa'
			});
		}

		if (bangzhuInfo.getDataValue('amount') - request.amount < 0) {

			return ctx.json({
				code: -3,
				msg: 'aaa'
			});
		}



		let status = await bangzhuInfoModel.chai(bangzhuInfo, request.amount);

		if (!status) {

			return ctx.json({
				code: -4
			});
		}

		return ctx.json({
			msg: 'yes'
		});
	}


	/**
	 * 获取帮助详情页
	 * @param {*} ctx 
	 */
	static async getInfo(ctx) {

		let request = ctx.request.query;

		if (!request.id) {

			return ctx.json(errCode.less_params);
		}

		let bangzhuInfo = await bangzhuInfoModel.getInfo(request.id);

		if (!bangzhuInfo) {

			return ctx.json(errCode.err_get_bangzhu_info);
		}

		return ctx.json({
			data: bangzhuInfo
		});
	}


	/**
	 * 打款提交
	 * @param {*} ctx 
	 */
	static async postInfo(ctx) {

		let request = ctx.request.body;

		if (!request.pic || !request.bang_qiu_id) {

			return ctx.json(errCode.less_params);
		}
		// 验证此条信息是否可更改
		let bangQiu = await bangQiuModel.findOne({
			where: {
				id: request.bang_qiu_id
			}
		});

		if (!bangQiu || bangQiu.getDataValue('state') !== 0) {

			return ctx.json(errCode.illegal_bangzhu_dakuan);
		}

		// 更新
		let result = await bangQiuModel.updateMake(request.bang_qiu_id, request.pic);

		if (!result) {

			return ctx.json(errCode.err_upload);
		}

		return ctx.json({
			msg: '上传成功'
		});
	}
}

module.exports = BangzhuController;