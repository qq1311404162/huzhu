const userModel = require('../../models/UserModel');

const config = require('../../../config/config');

class UserController {

	// 用户分页数据
	async list(ctx) {

		let query = ctx.request.query,
			page = query.page || 1;

		let result = await userModel.findAndCountAll({
			offset: (parseInt(page) - 1) * config.pageLimit,
			limit: config.pageLimit
		});

		return ctx.json({
			data: result
		});

	}

}

module.exports = new UserController();