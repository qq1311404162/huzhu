const moment = require('moment');

module.exports = function (sequelize, DataTypes) {

	return sequelize.define('bangzhu', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		ident: {
			type: DataTypes.STRING,
			comment: '帮助编号'
		},
		// user_id: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	comment: '用户id',
		// },
		amount: {
			type: DataTypes.DECIMAL(12, 2),
			defaultValue: '0.00',
			comment: '帮助金额'
		},
		type: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 1,
			comment: '帮助类型。1:用户额度; 2:用户机会'
		},
		state: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 3,
			comment: '状态'
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
		comment: '帮助表',
	});
};