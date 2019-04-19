const Router = require('koa-router')();

const UserController = require('../controllers/admin/UserController'),
	ActiveCodeController = require('../controllers/admin/ActiveCodeController');


// 用户管理
Router.get('/users/list', UserController.list);
// 团队管理
// Router.get('/teams/list', TeamController.list);

// // 管理员首页
// Router.get('/', (async ctx => {

// 	ctx.body = await ctx.render('admin/index');
// }));

// Router.get('/ttt', (async ctx => {
// 	ctx.body = await ctx.render('admin/upload-test');
// }));


// // 用户管理
// Router.get('/users', UserController.index)
// 	.get('/users/list', UserController.list);

// // 激活码管理
// Router.get('/active_codes', ActiveCodeController.index)
// 	.get('/active_codes/list', ActiveCodeController.list)
// 	.get('/active_codes/create', ActiveCodeController.create);


module.exports = Router;