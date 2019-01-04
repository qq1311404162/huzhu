const User = require('../../models/User');
const errCode = require('../../config/error-code');

class LoginController {

	/**
	 * 通用注册方法
	 * @param {*} ctx 
	 * 用户名	上级推荐人用户名	登录密码	确认密码	真实姓名	手机号
	 */
	static async register(ctx) {

		let request = ctx.request.body,
			data = {};

		if (!request.mobile || !request.username || !request.password || !request.realname || !request.repassword) {

			return ctx.json(errCode.less_params);
		}

		// 密码验证
		if (request.password !== request.repassword) {
			return ctx.json(errCode.illegal_pwd);
		}

		// 通用验证
		let [mobileStatus, usernameStatus] = await Promise.all([User.validateMobile(request.mobile), User.validateUsername(request.username)]);

		if (!mobileStatus)
			return ctx.json(errCode.illegal_mobile);

		if (!usernameStatus)
			return ctx.json(errCode.illegal_username);

		// 有上级
		if (request.prename != '') {
			// 获取上级用户
			let preUser = await User.findOne({
				attributes: ['id', 'previous_two', 'previous_id', 'previous_all'],
				where: {
					username: request.prename
				}
			});

			if (!preUser)
				return ctx.json(errCode.illegal_prevoius);

			let preArr = preUser.previous_two === '' ? [] : preUser.previous_two.split(',');
			preArr.push(preUser.id);

			let realnameStatus = await User.validateRealname(request.realname, preArr);

			if (!realnameStatus)
				return ctx.json(errCode.illegal_realname);
			// 添加用户

			data.previous_id = preUser.id || '';
			data.previous_two = !preUser.previous_id ? preUser.id : (preUser.previous_id + ',' + preUser.id);
			data.previous_all = !preUser.previous_all ? preUser.id : (preUser.previous_all + ',' + preUser.id);

		}

		// 密码设置
		data.password = await User.setPasswordValue(request.password);
		// 数据设置
		data.username = request.username;
		data.realname = request.realname;
		data.mobile = request.mobile;

		// 注册用户
		await User.create(data).then(() => {

			return ctx.json({
				code: 0,
				msg: '注册成功'
			});

		}).catch(() => {

			return ctx.json(errCode.err_register);
		});

	}

	/**
	 * 通用登录方法
	 * @param {} ctx 
	 * 手机号	密码
	 */
	static async login(ctx) {

		let request = ctx.request.body;

		if (!request.mobile || !request.password) {

			return ctx.json(errCode.less_params);
		}

		// 获取加密的密码
		request.password = await User.setPasswordValue(request.password);

		// 验证用户
		let result = await User.findOne({
			attributes: ['id', 'username', 'mobile', 'realname'],
			where: request
		});

		if (!result) {

			return ctx.json(errCode.err_user);
		}

		return ctx.json({
			code: 0,
			msg: '登录成功',
			data: result
		});
	}

	/**
	 * 修改密码
	 * @param {*} ctx 
	 */
	static async editPwd(ctx) {

		let request = ctx.request.body;

		if (!request.user_id || !request.password) {

			return ctx.json(errCode.less_params);
		}

		let user = await User.findOne({
			attributes: ['id'],
			where: {
				id: request.user_id
			}
		});

		if (user === null) {

			return ctx.json(errCode.illegal_user);
		}

		// 获取加密的密码
		request.password = await User.setPasswordValue(request.password);

		await User.update({
			password: request.password
		}, {
			where: {
				id: request.user_id
			}
		}).then(() => {

			return ctx.json({
				code: 0,
				msg: '修改密码成功'
			});

		}).catch(() => {

			return ctx.json({
				code: 10030,
				msg: '修改密码失败'
			});
		});

	}

	/**
	 * 用户激活
	 * @param {*} ctx 
	 */
	static async activation(ctx) {

		let request = ctx.request.body;

		if (!request.user_id) {

			return ctx.json({
				code: 10001,
				msg: '参数不足'
			});
		}
		// 获取用户激活码数量
		let user = await User.findOne({
			attributes: ['id', 'active_golds', 'state'],
			where: {
				id: request.user_id
			}
		});

		if (!user) {
			return ctx.json({
				code: 10011,
				msg: '用户验证失败'
			});
		}

		if (user.state != 0) {

			return ctx.json({
				code: 10012,
				msg: '用户状态不正确'
			});
		}

		if (user.active_golds < 1) {

			return ctx.json({
				code: 10013,
				msg: '激活码数量不足'
			});
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

			return ctx.json({
				code: 0,
				msg: '激活成功'
			});

		}).catch(() => {

			return ctx.json({
				code: 10014,
				msg: '激活失败'
			});
		});

	}

	/**
	 * 修改个人资料
	 * @param {*} ctx 
	 * 用户头像		银行卡号	开户行	支付宝二维码	微信二维码	
	 */
	static async editInfo(ctx) {

		let request = ctx.request.body,
			data = {};

		// 银行卡号和开户行必须
		if (!request.card_nums || !request.card_name || !request.user_id) {

			return ctx.json({
				code: 10001,
				msg: '参数不足'
			});
		}

		let user = await User.findOne({
			attributes: ['id'],
			where: {
				id: request.user_id
			}
		});

		if (!user) {

			return ctx.json({
				code: 10010,
				msg: '用户不存在'
			});
		}

		for (let name in request) {

			if (request.hasOwnProperty(name) && request[name] != '' && name != 'user_id') {

				data[name] = request[name];
			}

		}

		// 保存信息
		await User.update(data, {
			where: {
				id: request.user_id
			}
		}).then(() => {

			return ctx.json({
				code: 0,
				msg: '修改信息成功'
			});
		}).catch(() => {
			return ctx.json({
				code: 10020,
				msg: '修改信息失败'
			});
		});

	}

	/**
	 * 修改交易密码
	 * @param {*} ctx 
	 */
	static async editPayword(ctx) {

		let request = ctx.request.body;

		if (!request.user_id || !request.payword) {

			return ctx.json({
				code: 10001,
				msg: '参数不足'
			});
		}

		let user = await User.findOne({
			attributes: ['id'],
			where: {
				id: request.user_id
			}
		});

		if (!user) {

			return ctx.json({
				code: 10010,
				msg: '用户不存在'
			});
		}

		// 修改支付密码
		await User.update({
			payword: request.payword
		}, {
			where: {
				id: request.user_id
			}
		}).then(() => {

			return ctx.json({
				code: 0,
				msg: '修改支付密码成功'
			});

		}).catch(() => {

			return ctx.json({
				code: 10030,
				msg: '修改支付密码失败'
			});
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