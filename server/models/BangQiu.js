const Sequelize = require('sequelize');
const db = require('../db');

const BangzhuInfo = require('./BangzhuInfo');
const QiuzhuInfo = require('./QiuzhuInfo');

const BangQiu = db.define('bang_qiu', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	bangzhu_info_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '帮助拆分id',
		references: {
			model: BangzhuInfo,
			key: 'id'
		}
	},
	qiuzhu_info_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '求助拆分id',
		references: {
			model: QiuzhuInfo,
			key: 'id'
		}
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
	// paranoid: true,
	comment: '帮助求助打款表',
	underscored: true
});

BangQiu.belongsTo(BangzhuInfo);
BangQiu.belongsTo(QiuzhuInfo);

module.exports = BangQiu;