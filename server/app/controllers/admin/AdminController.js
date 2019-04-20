const md5 = require('md5');

const adminModel = require('../../models/AdminModel');
const adminLogModel = require('../../models/AdminLogModel');
const config = require('../../../config/config');
const errCode = require('../../../config/error-code');

class AdminController {

	// 用户分页数据
	async list(ctx) {

		let query = ctx.request.query,
			page = query.page || 1;

		let result = await adminModel.findAndCountAll({
			offset: (parseInt(page) - 1) * config.pageLimit,
			limit: config.pageLimit
		});

		return ctx.json({
			data: result
		});

	}
	// 管理员登录
	async login(ctx) {

		let query = ctx.request.body;

		if (!query.username || !query.password) {

			return ctx.json(errCode.err_admin_login_less_params);
		}

		query.password = adminModel.setPassword(query.password);
		// 登录流程
		let result = await adminModel.findOne({
			attributes: ['id', 'username', 'nickname', 'type'],
			where: query
		});

		if (!result) {

			return ctx.json(errCode.err_admin_login);
		}

		let token = adminModel.setToken(result.get({
			plain: true
		}));
		// 添加管理员登录日志
		adminLogModel.createLoginLog(result.getDataValue('id'));

		return ctx.json({
			msg: '登录成功',
			data: {
				admin: result.get({
					plain: true
				}),
				token: token
			}
		});
	}
	// 添加管理员
	async adminCreate(ctx) {
		let query = ctx.request.body,
			admin = ctx.state.user;

		if (!query.username || !query.password || !query.nickname || !query.type || !admin.id) {

			return ctx.json(errCode.admin_less_params);
		}
		// 用户名验证
		let usernameStatus = await adminModel.uniqueUsername(query.username);

		if (!usernameStatus)
			return ctx.json(errCode.err_admin_admin);

		query.password = adminModel.setPassword(query.password);

		let result = await adminModel.create(query);

		if (!result) return ctx.json(errCode.err_admin_admin_create);
		// 添加管理员创建日志
		adminLogModel.createCreateLog(admin.id, '登录名：' + query.username);

		return ctx.json({ msg: '创建成功' });
	}

}

module.exports = new AdminController();