// const User = require('../../models/User');

class UserController {

	// 用户管理首页
	static async index(ctx) {

		ctx.body = await ctx.render('admin/user/index');
	}

	// 用户数据
	static async list(ctx) {

		// let query = ctx.request.query;

		// let [count, result] = await Promise.all([User.count(), User.findAll({
		// 	offset: (parseInt(query.page) - 1) * parseInt(query.limit),
		// 	limit: parseInt(query.limit)
		// })]);


		// return ctx.jsonPage({
		// 	data: result,
		// 	count: count
		// });

	}

	static async form(ctx) {

		ctx.body = await ctx.render('admin/form');
	}
}

module.exports = UserController;