const Koa = require('koa');
const Xtpl = require('xtpl/lib/koa2');
const Static = require('koa-static');
const Path = require('path');
const Router = require('./routes');
const Jwt = require('koa-jwt');
const Json = require('koa-json');
const Bodyparser = require('koa-bodyparser');

const app = new Koa(),
      STATICPATH = './static',
      errorHandle = require('./middlewares/errorHandle'),
      sendHandle = require('./middlewares/sendHandle');

// 模板
Xtpl(app, {
  views: './views'
});

// 美化 json？？？
app.use(Json());

app.use(Bodyparser());

app.use(sendHandle());
// app.use(errorHandle);

// 静态资源，需要在认证前面，否则会没有权限
app.use(Static(Path.join(__dirname, STATICPATH)));
// 认证
// app.use(Jwt({
//   secret: 'user_token'
// }).unless({
//   path: [/\/admin\/*/]
// }));


// 路由
app.use(Router.routes()).use(Router.allowedMethods());

// 监听
app.listen(9090);