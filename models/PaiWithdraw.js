const Sequelize = require('sequelize');
const db = require('../db');

const PaiWithdraw = db.define('pai_withdraw', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	pai_info_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '排单拆分id'
    },
    withdraw_info_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '提现拆分id'
    },
    amount: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: '0.00',
        comment: '匹配金额'
    },
    pic: {
        type: Sequelize.STRING,
        comment: '打款截图'
    },
    make_time: {
        type: Sequelize.DATE,
        comment: '打款时间'
    },
    comfirm_time: {
        type: Sequelize.DATE,
        comment: '确认时间'
    },
	state: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0,
		comment: '状态。0：待打款；1：待确认；2：成功；9：作废'
	}
}, {
	paranoid: true,
	comment: '排单提现打款表'
});

module.exports = PaiWithdraw;