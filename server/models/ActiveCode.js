const Sequelize = require('sequelize');
const db = require('../db');
const moment = require('moment');
/**
 * 激活码初始化，然后可分配给任何人
 * 		初始化成功，不分配给任何人 or 初始化成功时就分配给管理用户？
 * 		管理用户和各个会员直接可以转移，但是只能转移给本线路的会员
 * 		会员最后使用激活码
 */
const ActiveCode = db.define('active_code', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	code: {
		type: Sequelize.STRING,
		allowNull: false,
		comment: '激活码'
	},
	user_id: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		comment: '所属会员id'
	},
	state: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0,
		comment: '状态。0：未使用；1：已分配；2：已使用'
	},
	createdAt: {
		type: Sequelize.DATE,
		get() {
			return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
		}
	},
	updatedAt: {
		type: Sequelize.DATE,
		get() {
			return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
		}
	},
}, {
	// paranoid: true,
	comment: '激活码表',
	underscored: true
});


function setCode() {

	return parseInt(100 + '' + new Date().valueOf().toString().substring(3, 13)).toString(36).toUpperCase();
}

ActiveCode.setCode = async () => {

	return setCode();
};

module.exports = ActiveCode;