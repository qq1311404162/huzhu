const Router = require('koa-router')();

const LoginController = require('../controllers/api/LoginController');


// 登录
Router.post('/login', LoginController.login);
// 注册
Router.post('/register', LoginController.register);
// 完善信息
// 修改密码
Router.post('/edit-pwd', LoginController.editPwd);
// 



module.exports = Router;