// 自定义错误中间件

module.exports = () => {

	return async (ctx, next) => {

		try {

			await next();

		} catch (err) {
			console.log(err);
			// 日志记录
			ctx.log.error(err.stack);

			ctx.status = err.status === 401 ? err.status : ctx.response.status;

			if (ctx.request.headers.accept.split(',').indexOf('application/json') !== -1) {
				// json 请求，返回json
				return ctx.json({
					code: 401,
					msg: err.status === 401 ? '用户权限不足' : err.message,
				});

			} else {

				ctx.response.body = err.status === 401 ? '用户权限不足' : err.message;

			}


		}
	};
};