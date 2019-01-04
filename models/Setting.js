const Sequelize = require('sequelize');
const db = require('../db');

const Setting = db.define('setting', {
	name: {
		type: Sequelize.STRING,
		primaryKey: true,
		comment: '属性名称'
	},
	value: {
		type: Sequelize.STRING,
		comment: '属性值'
	},
	display: {
		type: Sequelize.STRING,
		comment: '属性别名'
	},
}, {
	// paranoid: true,
	comment: '设置表'
});

module.exports = Setting;

/**
 * 属性名称列表
 * 
 *  网站名称
 *  额度基数
 *  最大排单额度倍数
 *  排单匹配进场时间(天)
 *  打款奖励时间(时)
 *  超时打款时间(时)
 *  奖励时间内利息(百分比)
 *  静态钱包提现基数
 *  静态钱包提现倍数基数
 *  动态钱包提现基数
 *  动态钱包提现倍数基数
 *  利息方式(1固定；2百分比)
 *  根据利息方式不同，设定不同的属性名称
 */