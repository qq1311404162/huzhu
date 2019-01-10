const fs = require('fs');

let files = fs.readdirSync(__dirname + '/models'),
	modelObj = {};

for (let f of files) {

	if (f.endsWith('.js')) {

		modelObj[f.split('.')[0]] = f;
	}
}

async function sync(model) {

	return await model.sync({
		force: true
	});
	// return model.sync();
}

async function createData(model, data) {

	model.bulkCreate(data);
}

const settingData = [{
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
];
const teamData = [{
	name: '初级',
	zhitui_num: 0,
	tem_num: 0,
	reward_one: 0,
	reward_two: 0,
	reward_three: 0,
	reward_other: 0,
},
{
	name: '一级',
	zhitui_num: 2,
	tem_num: 2,
	reward_one: 30,
	reward_two: 0,
	reward_three: 0,
	reward_other: 0,
},
{
	name: '二级',
	zhitui_num: 5,
	tem_num: 5,
	reward_one: 30,
	reward_two: 20,
	reward_three: 0,
	reward_other: 0,
},
{
	name: '三级',
	zhitui_num: 10,
	tem_num: 50,
	reward_one: 30,
	reward_two: 20,
	reward_three: 10,
	reward_other: 0,
},
{
	name: '四级',
	zhitui_num: 20,
	tem_num: 100,
	reward_one: 30,
	reward_two: 20,
	reward_three: 10,
	reward_other: 1,
}
];


let setting = require(__dirname + '/models/' + modelObj.Setting),
	team = require(__dirname + '/models/' + modelObj.Team);
// 1.setting表 和 team表，初始化和添加数据
Promise.all([sync(setting), sync(team)]).then(() => {

	// 初始化setting表和team表数据
	createData(setting, settingData);
	createData(team, teamData);

	// 2.user表，admin表
	Promise.all([sync(require(__dirname + '/models/' + modelObj.User)), sync(require(__dirname + '/models/' + modelObj.Admin))]).then(() => {
		// UserLog表，AdminLog表 初始化
		Promise.all([sync(require(__dirname + '/models/' + modelObj.UserLog)), sync(require(__dirname + '/models/' + modelObj.AdminLog))]);

		// 3.bangzhu表，qiuzhu表
		Promise.all([sync(require(__dirname + '/models/' + modelObj.Bangzhu)), sync(require(__dirname + '/models/' + modelObj.Qiuzhu))]).then(() => {
			// bangzhu_info表，qiuzhu_info表
			Promise.all([sync(require(__dirname + '/models/' + modelObj.BangzhuInfo)), sync(require(__dirname + '/models/' + modelObj.QiuzhuInfo))]).then(() => {
				// bang_qiu表
				sync(require(__dirname + '/models/' + modelObj.BangQiu));
			});
		});
	});

});