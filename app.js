const Koa = require('koa');

const router = require('./routes');
const middleware = require('./middlewares');

const app = new Koa();


// 注册通用中间件
middleware(app);

// 注册路由
router(app);

// 监听
app.listen(3000, () => {
	// console.log(ctx);
	// ctx.log.info('server is running');
});