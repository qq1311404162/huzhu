const Koa = require('koa');
const Xtpl = require('xtpl/lib/koa2');
const Static = require('koa-static');
const Path = require('path');
const Router = require('./routes');

const app = new Koa();
const STATICPATH = './static';

// 模板
Xtpl(app, {
  views: './views'
});

// 静态资源
app.use(Static(Path.join(__dirname, STATICPATH)));

// 路由
app.use(Router.routes()).use(Router.allowedMethods());

// 监听
app.listen(8080);

// const User = require('./models/User');




//   User.sync({force: true});
