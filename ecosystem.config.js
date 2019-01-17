module.exports = {
	apps: [{
		name: 'huzhu', // 项目名
		script: 'app.js', // 执行文件
		args: '-i max', // 传递给脚本的参数
		instances: 1, // 应用启动实例个数，仅在cluster模式有效 默认为fork；或者 max
		autorestart: true, // 默认为true, 发生异常的情况下自动重启
		watch: true, // 是否监听文件变动然后重启
		ignore_watch: ['node_modules', 'static'], // 不用监听的文件
		max_memory_restart: '2G', // 最大内存限制数，超出自动重启
		error_file: './logs/pm2-err.log', // 错误日志文件
		env: {
			NODE_ENV: 'development'
		},
		env_production: {
			NODE_ENV: 'production'
		}
	}],
};