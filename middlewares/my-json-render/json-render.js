module.exports = () => {

	const jsonRender = (ctx) => {

		return (options) => {

			ctx.set('Content-Type', 'application/json');

			ctx.response.body = {
				code: options.code || 0,
				msg: options.msg || '',
				data: options.data || null
			};
		};
	};

	const jsonRenderPage = (ctx) => {

		return (options) => {

			ctx.set('Content-Type', 'application/json');

			ctx.response.body = {
				code: 0,
				msg: options.msg || '',
				count: options.count || 0,
				data: options.data || []
			};
		};

	};

	return async (ctx, next) => {

		ctx.json = jsonRender(ctx);
		ctx.jsonPage = jsonRenderPage(ctx);

		await next();
	};
};