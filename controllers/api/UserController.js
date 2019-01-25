const errCode = require('../../config/error-code');

const userModel = require('../../models/UserModel');
const userLogModel = require('../../models/UserLogModel');


class UserController {

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
			return ctx.json(errCode.illegal_repwd);
		}

		// 通用验证
		let [mobileStatus, usernameStatus] = await Promise.all([userModel.uniqueMobile(request.mobile), userModel.uniqueUsername(request.username)]);

		if (!mobileStatus)
			return ctx.json(errCode.illegal_mobile);

		if (!usernameStatus)
			return ctx.json(errCode.illegal_username);

		// 有上级
		if (request.prename !== undefined && request.prename != '') {
			// 获取上级用户
			let preUser = await userModel.findOne({
				attributes: ['id', 'previous_thr', 'previous_id', 'previous_all'],
				where: {
					username: request.prename
				}
			});

			if (!preUser)
				return ctx.json(errCode.illegal_prevoius);

			let preArr = preUser.getDataValue('previous_thr').split(','),
				preAllArr = preUser.getDataValue('previous_all').split(',');

			// 上家第三级上级去掉
			if (preArr.length === 4) {
				preArr.splice(0, 1);
			}

			preArr.splice(preArr.length - 1, 1);
			preAllArr.splice(preAllArr.length - 1, 1);

			// 上级赋值
			preArr.push(preUser.getDataValue('id'));
			preAllArr.push(preUser.getDataValue('id'));

			let realnameStatus = await userModel.uniqueRealname(request.realname, preArr);

			if (!realnameStatus)
				return ctx.json(errCode.illegal_realname);
			// 添加用户

			data.previous_id = preUser.getDataValue('id');
			data.previous_thr = preArr.join(',') + ',';
			data.previous_all = preAllArr.join(',') + ',';

		}

		// 数据设置
		data.password = request.password;
		data.username = request.username;
		data.realname = request.realname;
		data.mobile = request.mobile;

		// 注册用户
		await userModel.register(data).then(user => {

			// 添加用户注册日志
			userLogModel.createRegisterLog(user.getDataValue('id'));

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
		request.password = await userModel.setPassword(request.password);

		// 验证用户
		let result = await userModel.findOne({
			attributes: ['id', 'username', 'mobile', 'realname'],
			where: request
		});

		if (!result) {

			return ctx.json(errCode.err_user);
		}

		let token = await userModel.setToken(result.get({
			plain: true
		}));

		// 添加用户登录日志
		userLogModel.createLoginLog(result.getDataValue('id'));

		return ctx.json({
			code: 0,
			msg: '登录成功',
			data: {
				user: result.get({
					plain: true
				}),
				token: token
			}
		});
	}


	/**
	 * 获取用户信息
	 * @param {*} ctx 
	 */
	static async userInfo(ctx) {

		let requestUser = ctx.state.user;

		// 获取用户信息
		let user = await userModel.getUserInfo(requestUser.id);

		if (user === null) {

			return ctx.json(errCode.err_user_info);
		}

		return ctx.json({
			data: user.get({
				plain: true
			})
		});
	}

	/**
	 * 用户激活
	 * @param {*} ctx 
	 */
	static async activation(ctx) {

		let requestUser = ctx.state.user;

		if (!requestUser.id) {

			return ctx.json(errCode.less_params);
		}
		// 获取用户激活码数量
		let user = await userModel.findOne({
			attributes: ['id', 'active_golds', 'state'],
			where: {
				id: requestUser.id
			}
		});

		if (!user) {
			return ctx.json(errCode.illegal_user);
		}
		// 用户不存在
		if (user.getDataValue('state') != 0) {

			return ctx.json(errCode.illegal_state);
		}
		// 激活码不足
		if (user.getDataValue('active_golds') < 1) {

			return ctx.json(errCode.illegal_less_active);
		}

		// 设置状态为1且激活码数量减1
		await userModel.activation(user.get({
			plain: true
		})).then(() => {

			// 激活日志
			userLogModel.createActivationLog(user.getDataValue('id'));

			return ctx.json({
				code: 0,
				msg: '激活成功'
			});

		}).catch(() => {

			return ctx.json(errCode.err_active);
		});

	}


	/**
	 * 修改信息页面获取用户信息
	 * @param {*} ctx 
	 */
	static async getEditInfo(ctx) {

		let requestUser = ctx.state.user;

		// 获取用户信息
		let user = await userModel.getEditInfo(requestUser.id);

		if (user === null) {

			return ctx.json(errCode.err_user_info);
		}

		return ctx.json({
			data: user.get({
				plain: true
			})
		});
	}

	/**
	 * 修改个人资料
	 * @param {*} ctx 
	 * 用户头像		银行卡号	开户行	支付宝二维码	微信二维码	
	 */
	static async postEeditInfo(ctx) {

		let request = ctx.request.body,
			data = {},
			requestUser = ctx.state.user;

		// 银行卡号和开户行必须
		if (!request.card_nums || !request.card_name) {

			return ctx.json(errCode.less_params);
		}

		let user = await userModel.findOne({
			attributes: ['id'],
			where: {
				id: requestUser.id
			}
		});

		if (!user) {

			return ctx.json(errCode.illegal_user);
		}

		for (let name in request) {

			if (request.hasOwnProperty(name) && request[name] != '') {

				data[name] = request[name];
			}

		}

		// 保存信息
		await userModel.update(data, {
			where: {
				id: requestUser.id
			}
		}).then(() => {

			return ctx.json({
				code: 0,
				msg: '修改信息成功'
			});
		}).catch(() => {
			return ctx.json(errCode.err_edit_info);
		});

	}

	/**
	 * 修改密码
	 * @param {*} ctx 
	 */
	static async editPwd(ctx) {

		let request = ctx.request.body,
			requestUser = ctx.state.user;

		if (!request.password) {

			return ctx.json(errCode.less_params);
		}

		let user = await userModel.findOne({
			attributes: ['id'],
			where: {
				id: requestUser.id
			}
		});

		if (user === null) {

			return ctx.json(errCode.illegal_user);
		}

		// 获取加密的密码
		request.password = await userModel.setPasswordValue(request.password);

		await userModel.update({
			password: request.password
		}, {
			where: {
				id: requestUser.id
			}
		}).then(() => {

			return ctx.json({
				code: 0,
				msg: '修改密码成功'
			});

		}).catch(() => {

			return ctx.json(errCode.err_pwd);
		});

	}

	/**
	 * 修改交易密码
	 * @param {*} ctx 
	 */
	static async editPayword(ctx) {

		let request = ctx.request.body,
			requestUser = ctx.state.user;

		if (!request.payword) {

			return ctx.json(errCode.less_params);
		}

		let user = await userModel.findOne({
			attributes: ['id'],
			where: {
				id: requestUser.id
			}
		});

		if (!user) {

			return ctx.json(errCode.illegal_user);
		}

		// 修改支付密码
		await userModel.update({
			payword: request.payword
		}, {
			where: {
				id: requestUser.id
			}
		}).then(() => {

			return ctx.json({
				code: 0,
				msg: '修改支付密码成功'
			});

		}).catch(() => {

			return ctx.json(errCode.err_payword);
		});
	}


	/**
	 * 赠送激活码页面
	 * @param {*} ctx 
	 */
	static async getGiveActivation(ctx) {

		let requestUser = ctx.state.user;

		let user = await userModel.findOne({
			attributes: ['id', 'active_golds'],
			where: {
				id: requestUser.id
			}
		});

		if (!user) {

			return ctx.json(errCode.illegal_user);
		}

		return ctx.json({
			data: user.get({
				plain: true
			})
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
	static async postGiveActivation(ctx) {

		let request = ctx.request.body,
			requestUser = ctx.state.user;

		if (!requestUser.id || !request.to_username || !request.payword) {

			return ctx.json(errCode.less_params);
		}

		if (!/^\+?[1-9][0-9]*$/.test(request.to_nums)) {

			return ctx.json(errCode.less_activation);
		}


		let [user, toUser] = await Promise.all([userModel.findOne({
			attributes: ['id', 'username', 'payword', 'active_golds'],
			where: {
				id: requestUser.id
			}
		}), userModel.findOne({
			attributes: ['id', 'username', 'password', 'active_golds', 'previous_all'],
			where: {
				username: request.to_username
			}
		})]);

		if (!user) {

			return ctx.json(errCode.illegal_user);
		}

		if (!toUser) {

			return ctx.json(errCode.illegal_to_user);
		}

		// 校验支付密码
		if (user.getDataValue('payword') !== request.payword) {

			return ctx.json(errCode.illegal_payword);
		}

		// 校验激活码数量
		if (user.getDataValue('active_golds') < request.to_nums) {

			return ctx.json(errCode.illegal_less_active);
		}

		// 检测必须是直系才能赠送
		if (toUser.getDataValue('previous_all').split(',').indexOf(user.getDataValue('id').toString()) == -1) {

			return ctx.json(errCode.illegal_zhixi);
		}

		// 赠送激活码
		let result = await userModel.giveActivation(user, toUser, request.to_nums);

		if (!result) {

			return ctx.json(errCode.err_give_active);
		}

		// 赠送激活码日志添加
		userLogModel.createGiveActivationLog(user.getDataValue('id'), '赠送用户' + toUser.getDataValue('username') + '激活码' + request.to_nums + '个');
		userLogModel.createReceiveActivationLog(toUser.getDataValue('id'), '接收用户' + user.getDataValue('username') + '激活码' + request.to_nums + '个');

		return ctx.json({
			msg: '赠送成功'
		});

	}

	/**
	 * 用户退出登录
	 * @param {*} ctx 
	 */
	static async logout(ctx) {
		// 直接返回 token 为空字符串
		return ctx.json({});
	}
}

module.exports = UserController;