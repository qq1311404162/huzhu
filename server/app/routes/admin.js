const Router = require('koa-router')();

const userController = require('../controllers/admin/UserController'),
	userLogController = require('../controllers/admin/UserLogController'),
	teamController = require('../controllers/admin/TeamController'),
	bangController = require('../controllers/admin/BangController'),
	qiuController = require('../controllers/admin/QiuController'),
	adminController = require('../controllers/admin/AdminController'),
	adminLogController = require('../controllers/admin/AdminLogController');


// 用户管理
Router.get('/users/list', userController.list);
// 团队管理
Router.get('/teams/list', teamController.list);
// 用户操作日志
Router.get('/user-logs/list', userLogController.list);
// 帮助管理
Router.get('/bangs/list', bangController.list);
// 求助管理
Router.get('/qius/list', qiuController.list);
// 管理员管理
Router.get('/admins/list', adminController.list).
	// 后台登录
	post('/login', adminController.login).
	post('/admin-create', adminController.adminCreate);
// 管理员操作日志
Router.get('/admin-logs/list', adminLogController.list);

module.exports = Router;