// 中间件 自定义json返回
const jsonRender = require('./json-render');

module.exports = () => {

	return (ctx, next) => {

		const myJsonRender = jsonRender();

		return myJsonRender(ctx, next);
	};
};