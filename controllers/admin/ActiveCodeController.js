const ActiveCode = require('../../models/ActiveCode');

class ActiveCodeController {

	/**
	 * 激活码管理首页
	 */
	static async index(ctx) {

		ctx.body = await ctx.render('admin/active_code/index');
	}

	// 数据
	static async list(ctx) {

		let query = ctx.request.query,
			result = {
				'code': 0,
				'msg': '',
				'count': 0,
				'data': []
			};

		result.count = await ActiveCode.count();

		result.data = await ActiveCode.findAll({
			offset: (parseInt(query.page) - 1) * parseInt(query.limit),
			limit: parseInt(query.limit)
		});

		ctx.body = result;
	}

	/**
	 * 生成激活码
	 * @param {*} ctx 
	 */
	static async create(ctx) {

		let code = await ActiveCode.setCode();

		let result = await ActiveCode.create({
			code: code
		});

		if (!result) {

			return ctx.sendError(500, '创建失败');
		}

		return ctx.send({}, '创建成功');

	}
}

module.exports = ActiveCodeController;