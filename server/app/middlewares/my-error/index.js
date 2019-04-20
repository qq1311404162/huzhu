// 自定义错误中间件

module.exports = () => {

	return async (ctx, next) => {

		try {

			await next();
			// 中间件返回，如果还是 404，转换为 json 并返回 200 状态码

			if (ctx.response.status === 404) return ctx.json({
				msg: '页面不存在',
				code: 404
			});

		} catch (err) {
			// 日志记录
			ctx.log.error(err.stack);
			// 设置状态码
			ctx.status = err.status || 500;

			// 仅仅做接口服务器，所有返回值均为 json 类型

			return ctx.json({
				msg: ctx.status === 401 ? '用户权限不足' : err.message,
				code: ctx.status === 401 ? 401 : 500
			});
		}
	};
};