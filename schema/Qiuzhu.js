const moment = require('moment');

module.exports = function (sequelize, DataTypes) {

	return sequelize.define('qiuzhu', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		ident: {
			type: DataTypes.STRING,
			comment: '求助编号'
		},
		// user_id: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	comment: '用户id',
		// },
		amount: {
			type: DataTypes.DECIMAL(12, 2),
			defaultValue: '0.00',
			comment: '求助金额'
		},
		type: {
			type: DataTypes.TINYINT,
			allowNull: false,
			comment: '求助类型。静态钱包求助 or 动态钱包求助'
		},
		state: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 0,
			comment: '状态。0：初始化成功，待匹配；1：匹配成功，待确认订单；2：订单完成'
		},
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
		comment: '求助表',
	});
};