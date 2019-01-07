const Xtpl = require('xtpl/lib/koa2');
const Static = require('koa-static');
const Path = require('path');
const Json = require('koa-json');
const Bodyparser = require('koa-bodyparser');
const Jwt = require('koa-jwt');

const myLog = require('./my-log');
const myJsonRender = require('./my-json-render');
const myError = require('./my-error');

const STATICPATH = '../static';
const VIEAPATH = './views';

const config = require('../config/config');


module.exports = (app) => {

	// 日志操作
	app.use(myLog());

	// 模板设置
	Xtpl(app, {
		views: VIEAPATH
	});

	// 自定义 json 返回
	app.use(myJsonRender());

	// json 美化
	app.use(Json());
	// post 数据美化
	app.use(Bodyparser());
	// 静态资源，需要在认证前面，否则会没有权限
	app.use(Static(Path.join(__dirname, STATICPATH)));

	app.use(myError());

	// 认证
	app.use(Jwt({
		secret: config.jwt.token
	}).unless({
		path: [/^\/admin\/*/, /^\/api\/login/, /^\/api\/register/]
	}));

	// 错误捕获

};