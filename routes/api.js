const Router = require('koa-router')();

const LoginController = require('../controllers/api/LoginController');
const UserController = require('../controllers/api/UserController');
const BangzhuController = require('../controllers/api/BangzhuController');
const QiuzhuController = require('../controllers/api/QiuzhuController');
const UploadController = require('../controllers/api/UploadController');


// // 登录
// Router.post('/login', LoginController.login);
// // 注册
// Router.post('/register', LoginController.register);
// 修改密码
// Router.post('/edit-pwd', LoginController.editPwd);
// 用户激活
// Router.post('/activation', LoginController.activation);
// 赠送激活码
Router.post('/give-activation', LoginController.giveActivation);
// 修改个人资料
// Router.post('/edit-info', LoginController.editInfo);
// 修改支付密码
// Router.post('/edit-payword', LoginController.editPayword);



/*----- 我的页面 -----*/
// 用户注册
Router.post('/register', UserController.register);
// 用户登录
Router.post('/login', UserController.login);
// 我的页面获取信息
Router.get('/user-info', UserController.userInfo);
// 用户激活
Router.get('/activation', UserController.activation);
// 修改个人资料
Router.get('/edit-info', UserController.getEditInfo);
Router.post('/edit-info', UserController.postEeditInfo);
// 显示我的推广二维码

// 修改密码
Router.post('/edit-pwd', UserController.editPwd);
// 修改交易密码
Router.post('/edit-payword', UserController.editPayword);
// 退出登录
Router.post('/logout', UserController.logout);

/*----- 首页页面 -----*/
// 静态收益 -- 排单记录
// 动态收益 -- 提现记录
// 我的团队 -- 直推列表和团队列表
// 代注册 -- 注册页面 ？？？
// 排单币 -- 显示排单币个数和赠送
// 激活码 -- 显示激活码个数和赠送

/*----- 排单页面 -----*/
// 获取用户排单信息
Router.get('/bangzhu/index', BangzhuController.index);
// 开始帮助页面
Router.get('/bangzhu/add', BangzhuController.getAdd);
// 开始排单
Router.post('/bangzhu/add', BangzhuController.postAdd);
// 获取未完成的排单记录
Router.get('/bangzhu/not-done-lists', BangzhuController.notDoneLists);
// 获取全部排单记录
Router.get('/bangzhu/lists', BangzhuController.lists);
// 排单表拆分
Router.post('/bangzhu/chai', BangzhuController.bangzhuChai);
// 打款提交信息
Router.post('/bangzhu/dakuan', BangzhuController.dakuan);
// 倍数 类型


/*----- 提现页面 -----*/
// 获取用户提现信息
Router.get('/qiuzhu/index', QiuzhuController.index);
// 开始提现
Router.post('/qiuzhu/add', QiuzhuController.add);
// 匹配
Router.post('/qiuzhu/pipei', QiuzhuController.pipei);
// 确认匹配订单
Router.post('/qiuzhu/confirm', QiuzhuController.confirm);
// 提现类型 提现金额


/* --------------上传------------ */
Router.post('/upload', UploadController.upload);

module.exports = Router;