const User = require('../../models/User');

class LoginController {

	/**
     * 通用注册方法
     * @param {*} ctx 
     */
	static async register(ctx) {

		let request = ctx.request.body;

		if (!request.mobile || !request.username || !request.password || !request.realname) {

			return ctx.sendError(400, '参数不足');
		}

		let previous = {};

		if (request.previous_id) {
			// 存在上级推荐人，找到其信息
			previous = await User.findOne({
				where: {
					'username': request.previous_id
				}
			});

		}
		// 上级id
		request.previous_id = previous.id || '';

		request.previous_two = !previous.previous_id ? previous.id : (previous.previous_id + ',' + previous.id);
		request.previous_all = !previous.previous_all ? previous.id : (previous.previous_all + ',' + previous.id);

		try {

			// 设置密码
			let password = await User.setPasswordValue(request.password);

			request.password = password;

			// 注册用户
			await User.create(request).then(() => {

				return ctx.send({}, '注册成功');

			}).catch(err => {

				return ctx.sendError(500, err.errors[0].message || '注册失败');
			});

		} catch (err) {
			return ctx.sendError(500, '设置密码失败');
		}

	}

	/**
     * 通用登录方法
     * @param {} ctx 
     */
	static async login(ctx) {

		let request = ctx.request.body;

		if (!request.mobile || !request.password) {

			return ctx.sendError(400, '参数不足');
		}

		try {

			// 获取加密的密码
			request.password = await User.setPasswordValue(request.password);

			// 验证用户
			let result = await User.findOne({
				attributes: ['id', 'username', 'mobile', 'realname'],
				where: request
			});

			if (result === null) {

				return ctx.sendError(400, '用户名或密码错误');
			}

			return ctx.send(result);


		} catch (err) {

			return ctx.sendError(400, '密码错误');
		}
	}

	/**
     * 修改密码
     * @param {*} ctx 
     */
	static async editPwd(ctx) {

		let request = ctx.request.body;

		if (!request.user_id || !request.password) {

			return ctx.sendError(400, '参数不足');
		}

		let user = await User.findOne({
			attributes: ['id'],
			where: {
				id: request.user_id
			}
		});

		if (user === null) {

			return ctx.sendError(400, '该用户不存在');
		}

		// 获取加密的密码
		request.password = await User.setPasswordValue(request.password);

		await User.update({
			password: request.password
		}, {
			where: {
				id: request.user_id
			}
		});

		return ctx.send({}, '修改密码成功');

	}

	/**
     * 用户激活
     * @param {*} ctx 
     */
	static async activation(ctx) {

		let request = ctx.request.body;

		if (!request.user_id) {

			return ctx.sendError(400, '参数不足');
		}
		// 获取用户激活码数量
		let user = await User.findOne({
			attributes: ['id', 'active_golds', 'state'],
			where: {
				id: request.user_id
			}
		});

		if (!user) {
			return ctx.sendError(500, '用户验证失败');
		}

		if (user.state != 0) {

			return ctx.sendError(500, '用户状态不正确');
		}

		if (user.active_golds < 1) {

			return ctx.sendError(500, '激活码数量不足');
		}

		// 设置状态为1且激活码数量减1
		await User.update({
			state: 1,
			active_golds: user.active_golds - 1
		}, {
			where: {
				id: request.user_id
			}
		}).then(() => {

			return ctx.send({}, '激活成功');

		}).catch(() => {

			return ctx.sendError(500, '激活失败');
		});

	}

	/**
     * 赠送激活码
     * @param {*} ctx 
     *      user_id         用户id
     *      to_username     赠送用户名
     *      to_nums         赠送数量
     *      password        用户密码
     */
	static async giveActivation(ctx) {

		let request = ctx.request.body;

		if (!request.user_id || !request.to_username || !request.password) {

			return ctx.sendError(400, '参数不足');
		}

		request.to_nums = request.to_nums || 0;

		let user = await User.findOne({
				attributes: ['id', 'username', 'password', 'active_golds'],
				where: {
					id: request.user_id
				}
			}),
			userPwd = await User.setPasswordValue(request.password),
			toUser = await User.findOne({
				attributes: ['id', 'username', 'password', 'active_golds', 'previous_all'],
				where: {
					username: request.to_username
				}
			});

		// 校验密码
		if (user.password !== userPwd) {

			return ctx.sendError(500, '密码不正确');
		}

		// 校验激活码数量
		if (user.active_golds < request.to_nums) {

			return ctx.sendError(500, '激活码数量不足');
		}

		// 检测必须是直系才能赠送
		if (toUser.previous_all.split(',').indexOf(user.id) == -1) {

			return ctx.sendError(500, '必须是直系才能赠送');
		}

		// 赠送激活码
		let result = await User.giveActivation({
			user_id: user.id,
			to_user_id: toUser.id,
			userActiveGolds: user.active_golds,
			toUserActiveGolds: toUser.active_golds,
			to_nums: request.to_nums
		});

		if (!result) {

			return ctx.sendError(500, '赠送失败');
		}

		return ctx.send({}, '赠送成功');

	}
}

module.exports = LoginController;