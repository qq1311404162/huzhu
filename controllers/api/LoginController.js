const User = require('../../models/User');

class LoginController {

    /**
     * 通用注册方法
     * @param {*} ctx 
     */
    static async register (ctx) {

        let request = ctx.request.body;

        if (!request.mobile || !request.username || !request.password || !request.realname) {

            return ctx.sendError(400, '参数不足');
        }

        try {
            
            // 设置密码
            let password = await User.setPasswordValue(request.password);
            
            request.password = password;
            
            // 注册用户
            await User.create(request).then(res => {
    
                return ctx.send({}, '注册成功');
    
            }).catch(err => {
    
                return ctx.sendError(500, err.errors[0].message || '注册失败');
            });

        }catch (err) {
            return ctx.sendError(500, '设置密码失败');
        }

    }

    /**
     * 通用登录方法
     * @param {} ctx 
     */
    static async login (ctx) {

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
            

        }catch (err) {

            return ctx.sendError(400, '密码错误');
        }
    }

    /**
     * 修改密码
     * @param {*} ctx 
     */
    static async editPwd (ctx) {

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

        let result = await User.update({
            password: request.password
        }, {
            where: {
                id: request.user_id
            }
        });

        return ctx.send({}, '修改密码成功');
        
    }
}

module.exports = LoginController;