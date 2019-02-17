const Koa = require('koa');

const router = require('./app/routes');
const middleware = require('./app/middlewares');

const config = require('./config/config');

const app = new Koa();


// 注册通用中间件
middleware(app);

// 注册路由
router(app);

// 监听
app.listen(config.port, () => {
	// console.log(ctx);
	// ctx.log.info('server is running');
});