module.exports = {

	// 验证返回
	illegal_user: {
		code: 10002,
		msg: '用户不存在'
	},
	less_params: {
		code: 10001,
		msg: '参数不足'
	},
	illegal_mobile: {
		code: 10003,
		msg: '该手机号已注册'
	},
	illegal_username: {
		code: 10004,
		msg: '该用户名已注册'
	},
	illegal_realname: {
		code: 10005,
		msg: '真实姓名不能同名'
	},
	illegal_pwd: {
		code: 10006,
		msg: '密码不正确'
	},
	illegal_repwd: {
		code: 10007,
		msg: '两次密码不一致'
	},
	illegal_prevoius: {
		code: 10008,
		msg: '上级推荐人不存在'
	},
	illegal_state: {
		code: 10009,
		msg: '用户状态不正确'
	},
	illegal_less_active: {
		code: 10010,
		msg: '激活码数量不足'
	},
	illegal_zhixi: {
		code: 10011,
		msg: '激活码必须赠送给直系'
	},
	illegal_bangzhu_state: {
		code: 10012,
		msg: '当前状态不可排单'
	},
	illegal_bangzhu_amount: {
		code: 10013,
		msg: '当前排单额度不可用'
	},
	illegal_payword: {
		code: 10014,
		msg: '支付密码不正确'
	},
	illegal_bangzhu_count: {
		code: 10015,
		msg: '您当前正在排单中，无法再次排单'
	},
	illegal_less_bangzhu_count: {
		code: 10016,
		msg: '您还没有赠送排单次数'
	},
	illegal_more_bangzhu_count: {
		code: 10017,
		msg: '赠送排单次数超过本月上限'
	},
	illegal_bangzhu_day_count: {
		code: 10018,
		msg: '每天只能帮助一次'
	},




	// 失败返回
	err_register: {
		code: 11001,
		msg: '注册失败'
	},
	err_user: {
		code: 11002,
		msg: '用户名或密码错误'
	},
	err_pwd: {
		code: 11003,
		msg: '修改密码失败'
	},
	err_active: {
		code: 11004,
		msg: '用户激活失败'
	},
	err_edit_info: {
		code: 11005,
		msg: '修改个人资料失败'
	},
	err_payword: {
		code: 11006,
		msg: '修改个人支付密码失败'
	},
	err_give_active: {
		code: 11007,
		msg: '激活码赠送失败'
	},
	err_bangzhu: {
		code: 11008,
		msg: '排单失败'
	},
	err_user_info: {
		code: 11009,
		msg: '获取用户信息失败'
	}
};