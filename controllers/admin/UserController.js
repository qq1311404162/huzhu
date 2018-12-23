const User = require('../../models/User');

class UserController {

    // 用户管理首页
    static async index (ctx) {
        
        // User.sync({force: true});
        // User.create({
        //     username: 'aa',
        //     password: 'bb',
        //     mobile: '1243',
        //     realname: 'ccc',

        // }).catch(function(errors){

        // console.log(errors.errors[0].message);
        // // console.log(errors.errors);
        // });

        // User.createUser({});

        ctx.body = await ctx.render('admin/user/index');
    }

    // 用户数据
    static async list (ctx) {
        
        let query = ctx.request.query,
            result = {'code': 0, 'msg': '', 'count': 0, 'data': []};


            result.data = await User.findAll();

        ctx.body = result;
    }

    static async form (ctx) {
        
        ctx.body = await ctx.render('admin/form');
    }
}

module.exports = UserController;