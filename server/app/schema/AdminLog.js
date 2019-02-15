const moment = require('moment');

module.exports = function (sequelize, DataTypes) {

	return sequelize.define('admin_log', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		// admin_id: {
		//     type: DataTypes.INTEGER,
		//     allowNull: false,
		//     comment: '管理员id',
		// },
		type: {
			type: DataTypes.TINYINT,
			defaltVslue: 1,
			comment: '操作类型'
		},
		content: {
			type: DataTypes.STRING,
			comment: '操作内容'
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
		comment: '管理员操作表',
	});
};