const Bangzhu = require('../../models/Bangzhu');
const User = require('../../models/User');

const Math = require('mathjs');

const errCode = require('../../config/error-code');
const Setting = require('../../models/Setting');

class BangzhuController {

	/**
	 * 开始排单
	 * @param {*} ctx 
	 * 用户id   排单类型    排单倍数    交易密码
	 */
	static async add(ctx) {

		let request = ctx.request.body,
			requestUser = ctx.state.user;

		if (!requestUser.id || !request.type || !request.payword || !request.available) {

			return ctx.json(errCode.less_params);
		}

		// 获取设置中的排单额度基数
		let setting = await Setting.findOne({
			attributes: ['name', 'value'],
			where: {
				name: 'unit'
			}
		});

		// 用户验证
		let user = await User.findOne({
			attributes: ['id', 'available', 'state', 'payword', 'bangzhu_nums'],
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

		// 一天只能帮助一次
		let dayCount = await Bangzhu.getBangzhuDayCount(requestUser.id);

		if (dayCount > 0)
			return ctx.json(errCode.illegal_bangzhu_day_count);

		// 额度排单当前只能排一个
		if (request.type == 1) {

			let bangzhuCount = await Bangzhu.getEduHelpCount(requestUser.id);

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
			let bangzhuCount = await Bangzhu.getGiftHelpMonthCount(requestUser.id);
			// 当前排单次数达到上限
			if (user.bangzhu_nums <= bangzhuCount) {

				return ctx.json(errCode.illegal_more_bangzhu_count);
			}
		}

		// 开始排单

		await Bangzhu.bangzhu({
			user_id: requestUser.id,
			amount: Math.multiply(setting.value || 900, request.available),
			type: request.type,

		}).then(() => {

			return ctx.json({
				code: 0,
				msg: '排单成功'
			});
		}).catch(() => {

			return ctx.json(errCode.err_bangzhu);
		});
	}
}

module.exports = BangzhuController;