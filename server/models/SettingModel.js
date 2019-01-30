const Sequelize = require('sequelize');

const Model = require('./Model');
const db = require('../models/index');

let settingData = [{
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
	name: 'bz_wait',
	value: '7',
	display: '帮助匹配进场时间(天)'
},
{
	name: 'qz_wait',
	value: '7',
	display: '求助匹配进场时间(天)'
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
},
{
	name: 'rate_fixed_value',
	value: '15',
	display: '固定利息值(百分比)'
},
{
	name: 'rate_time_line_value',
	value: '0.5',
	display: '排队期每天利息(百分比)'
},
{
	name: 'rate_time_finish_value',
	value: '1',
	display: '完成后每天利息(百分比)'
},
{
	name: 'rate_time_finish_day',
	value: '10',
	display: '完成后奖励天数'
},
{
	name: 'active_gold_all',
	value: '0',
	display: '平台激活码总数'
},
{
	name: 'bangzhu_gold_all',
	value: '0',
	display: '平台排单币总数'
},
];

class SettingModel extends Model {

	constructor() {

		super(db.Setting);
	}

	/**
	 * 设置表初始化
	 */
	async init() {

		// 清空表内容
		await this.destroy({
			truncate: true
		});
		// 批量写入数据
		return await this.bulkCreate(settingData);


	}

	async findMul(data) {

		let settings = await this.findAll({
				attributes: ['name', 'value'],
				where: {
					name: {
						[Sequelize.Op.in]: data
					}
				}
			}),
			result = {};

		for (let iterator of settings) {
			if (iterator !== null) {
				result[iterator.getDataValue('name')] = iterator.getDataValue('value');
			}
		}

		return result;


	}
}

module.exports = new SettingModel();