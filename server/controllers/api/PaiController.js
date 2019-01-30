const Sequelize = require('sequelize');
const Pai = require('../../models/Pai');
const User = require('../../models/User');
const Math = require('mathjs');
const moment = require('moment');

class PaiController {

	/**
     * 开始排单
     * @param {*} ctx 
     * 用户id   排单类型    排单倍数    交易密码
     */
	static async addPai(ctx) {

		let request = ctx.request.body,
			unit = 900;

		if (!request.user_id || !request.type || !request.payword || !request.available) {

			return ctx.json({
				code: 10001,
				msg: '参数不足'
			});
		}

		// 用户验证
		let user = await User.findOne({
			attributes: ['id', 'available', 'state', 'payword', 'pai_nums'],
			where: {
				id: request.user_id
			}
		});

		if (user === null)
			return ctx.json({
				code: 10010,
				msg: '用户验证错误'
			});

		// 用户状态验证
		if (user.state !== 1)
			return ctx.json({
				code: 10020,
				msg: '当前状态不可排单'
			});

		// 额度验证
		if (user.available < request.available)
			return ctx.json({
				code: 10031,
				msg: '当前排单额度不可用'
			});

		if (user.payword !== request.payword)
			return ctx.json({
				code: 10032,
				msg: '支付密码不正确'
			});

		// 额度排单当前只能排一个
		if (request.type == 1) {

			let paiCount = await Pai.count({
				where: {
					user_id: request.user_id,
					type: 1,
					state: {
						[Sequelize.Op.in]: [0, 1]
					}
				}
			});

			if (paiCount > 0) {

				return ctx.json({
					code: 10034,
					msg: '您当前正在排单中，无法再次排单'
				});
			}
		}

		// 次数排单不能超过当前次数
		if (request.type == 2) {

			if (user.pai_nums < 1)
				return ctx.json({
					code: 10044,
					msg: '您还没有次数排单'
				});

			// 获取
			let paiCount = await Pai.count({
				where: {
					user_id: request.user_id,
					type: 2,
					state: {
						[Sequelize.Op.in]: [0, 1]
					},
					createdAt: {
						[Sequelize.Op.gte]: moment().startOf('month'),
						[Sequelize.Op.lte]: moment().endOf('month')
					}
				}
			});

			if (user.pai_nums <= paiCount) {

				return ctx.json({
					code: 10045,
					msg: '次数排单超过本月上限'
				});
			}
		}

		// 开始排单
		await Pai.create({
			ident: 'p',
			user_id: request.user_id,
			amount: Math.multiply(unit, request.available),
			type: request.type,

		}).then(() => {

			return ctx.json({
				code: 0,
				msg: '排单成功'
			});

		}).catch(() => {

			return ctx.json({
				code: 10033,
				msg: '排单失败'
			});
		});
	}

}

module.exports = PaiController;