const fs = require('fs');

let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter((f) => {
	return f.endsWith('.js');
}, files);


for (let f of js_files) {
	// console.log(`import model from file ${f}...`);
	// let name = f.substring(0, f.length - 3);

	let model = require(__dirname + '/models/' + f);
	// 初始化表
	model.sync({
		force: true
	});
	// model.sync();

	switch (f) {

	case 'Setting.js':
		// 添加设置信息
		model.bulkCreate([{
			name: 'site_name',
			value: '互助系统',
			display: '网站名称'
		},
		{
			name: 'unit',
			value: '900',
			display: '额度基数'
		},
		{
			name: 'max_available',
			value: '20',
			display: '最大排单额度倍数'
		},
		{
			name: 'pai_wait',
			value: '7',
			display: '排单匹配进场时间(天)'
		},
		{
			name: 'reward_trans_time',
			value: '2',
			display: '打款奖励时间(时)'
		},
		{
			name: 'timeout_trans_time',
			value: '5',
			display: '超时打款时间(时)'
		},
		{
			name: 'reward_trans_rate',
			value: '5',
			display: '奖励时间内利息(百分比)'
		},
		{
			name: 'static_wallet_base',
			value: '100',
			display: '静态钱包提现基数'
		},
		{
			name: 'static_wallet_mul',
			value: '10',
			display: '静态钱包提现倍数基数'
		},
		{
			name: 'dynamic_wallet_base',
			value: '500',
			display: '动态钱包提现基数'
		},
		{
			name: 'dynamic_wallet_mul',
			value: '100',
			display: '动态钱包提现倍数基数'
		},
		{
			name: 'rate_mode',
			value: '1',
			display: '利息方式'
		}

		]);
	}
}