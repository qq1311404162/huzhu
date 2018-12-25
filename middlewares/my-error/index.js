// 自定义错误中间件

module.exports = () => {

	return async (ctx, next) => {

		try {

			await next();

		} catch (err) {

			// 日志记录
			ctx.log.error(err.stack);

			ctx.status = ctx.response.status;
			if (ctx.request.headers.accept.split(',').indexOf('application/json') !== -1) {
				// json 请求，返回json
				return ctx.json({
					msg: err.message,
				});

			} else {

				ctx.response.body = err.message;

			}


		}
	};
};