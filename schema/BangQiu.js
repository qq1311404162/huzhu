const moment = require('moment');

module.exports = function (sequelize, DataTypes) {

	return sequelize.define('bang_qiu', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		// bangzhu_info_id: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	comment: '帮助拆分id',
		// },
		// qiuzhu_info_id: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	comment: '求助拆分id',
		// },
		// amount: {
		// 	type: DataTypes.DECIMAL(12, 2),
		// 	defaultValue: '0.00',
		// 	comment: '匹配金额'
		// },
		pic: {
			type: DataTypes.STRING,
			comment: '打款截图'
		},
		make_time: {
			type: DataTypes.DATE,
			comment: '打款时间'
		},
		comfirm_time: {
			type: DataTypes.DATE,
			comment: '确认时间'
		},
		// state: {
		// 	type: DataTypes.TINYINT,
		// 	allowNull: false,
		// 	defaultValue: 0,
		// 	comment: '状态。0：待打款；1：待确认；2：成功；9：作废'
		// },
		created_at: {
			type: DataTypes.DATE,
			get() {
				return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
			}
		},
		updated_at: {
			type: DataTypes.DATE,
			get() {
				return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
			}
		},
	}, {
		comment: '帮助求助打款表',
	});
};