const log4js = require('log4js');

const access = require('./access');

const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];

module.exports = () => {
	const contextLog = {};
	const appenders = {};

	appenders.cheese = {
		type: 'dateFile',
		filename: 'logs/task',
		pattern: '-yyyy-MM-dd.log',
		alwaysIncludePattern: true
	};

	let config = {
		appenders,
		categories: {
			default: {
				appenders: Object.keys(appenders),
				level: 'debug'
			}
		}
	};

	const logger = log4js.getLogger();

	return async (ctx, next) => {

		log4js.configure(config);
		methods.forEach((method) => {
			contextLog[method] = (message) => {
				logger[method](access(ctx, message));
			};
		});
		ctx.log = contextLog;

		await next();
	};
};