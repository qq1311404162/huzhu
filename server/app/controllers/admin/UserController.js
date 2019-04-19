// const User = require('../../models/User');
const userModel = require('../../models/userModel');

class UserController extends Controller {

	// 用户分页数据
	static async list(ctx) {
		console.log(this.limit);

		let query = ctx.request.query;

		let result = await findAndCountAll({
			offset: (parseInt(query.page) - 1) * this.limit,
			limit: this.limit
		});


		return ctx.jsonPage({
			data: result
		});

	}

}

module.exports = UserController;