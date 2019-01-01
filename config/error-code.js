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
    }
};