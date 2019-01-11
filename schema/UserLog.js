const moment = require('moment');

module.exports = function (sequelize, DataTypes) {

	return sequelize.define('user_log', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		// user_id: {
		// 	type: DataTypes.INTEGER,
		// 	comment: '用户id',
		// },
		type: {
			type: DataTypes.TINYINT,
			defaltVslue: 1,
			comment: '操作类型',
		},
		content: {
			type: DataTypes.STRING,
			comment: '操作描述'
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
		comment: '用户操作表',
	});
};