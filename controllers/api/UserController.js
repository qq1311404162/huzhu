const Setting = require('../../models/Setting');
const errCode = require('../../config/error-code');

const userModel = require('../../models/UserModel');


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
				attributes: ['id', 'previous_two', 'previous_id', 'previous_all'],
				where: {
					username: request.prename
				}
			});

			if (!preUser)
				return ctx.json(errCode.illegal_prevoius);

			let preArr = preUser.previous_two === '' ? [] : preUser.previous_two.split(',');
			preArr.push(preUser.id);

			let realnameStatus = await userModel.uniqueRealname(request.realname, preArr);

			if (!realnameStatus)
				return ctx.json(errCode.illegal_realname);
			// 添加用户

			data.previous_id = preUser.id || '';
			data.previous_two = !preUser.previous_id ? preUser.id : (preUser.previous_id + ',' + preUser.id);
			data.previous_all = !preUser.previous_all ? preUser.id : (preUser.previous_all + ',' + preUser.id);

		}

		// 密码设置
		data.password = await userModel.setPassword(request.password);
		// 数据设置
		data.username = request.username;
		data.realname = request.realname;
		data.mobile = request.mobile;
		data.team_id = 1;

		// 注册用户
		await userModel.create(data).then(() => {

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

		let token = await userModel.setToken(result.dataValues);

		return ctx.json({
			code: 0,
			msg: '登录成功',
			data: {
				user: result,
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
			data: user
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
		if (user.state != 0) {

			return ctx.json(errCode.illegal_state);
		}
		// 激活码不足
		if (user.active_golds < 1) {

			return ctx.json(errCode.illegal_less_active);
		}

		// 设置状态为1且激活码数量减1
		await userModel.update({
			state: 1,
			active_golds: user.active_golds - 1
		}, {
			where: {
				id: requestUser.id
			}
		}).then(() => {

			// 这里要添加激活日志

			return ctx.json({
				code: 0,
				msg: '激活成功'
			});

		}).catch(() => {

			return ctx.json(errCode.err_active);
		});

	}

	/**
	 * 修改个人资料
	 * @param {*} ctx 
	 * 用户头像		银行卡号	开户行	支付宝二维码	微信二维码	
	 */
	static async editInfo(ctx) {

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

			return ctx.json({
				code: 10030,
				msg: '修改密码失败'
			});
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
	 * 用户退出登录
	 * @param {*} ctx 
	 */
	static async logout(ctx) {
		// 直接返回 token 为空字符串
		return ctx.json({});
	}
}

module.exports = UserController;