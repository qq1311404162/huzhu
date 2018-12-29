const Router = require('koa-router')();

const LoginController = require('../controllers/api/LoginController');
const PaiController = require('../controllers/api/PaiController');


// 登录
Router.post('/login', LoginController.login);
// 注册
Router.post('/register', LoginController.register);
// 修改密码
Router.post('/edit-pwd', LoginController.editPwd);
// 用户激活
Router.post('/activation', LoginController.activation);
// 赠送激活码
Router.post('/give-activation', LoginController.giveActivation);
// 修改个人资料
Router.post('/edit-info', LoginController.editInfo);
// 修改支付密码
Router.post('/edit-payword', LoginController.editPayword);

// 开始排单
Router.post('/add-pai', PaiController.addPai);


module.exports = Router;