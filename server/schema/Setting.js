const moment = require('moment');

module.exports = function (sequelize, DataTypes) {

	return sequelize.define('setting', {
		name: {
			type: DataTypes.STRING,
			primaryKey: true,
			comment: '属性名称'
		},
		value: {
			type: DataTypes.STRING,
			comment: '属性值'
		},
		display: {
			type: DataTypes.STRING,
			comment: '属性别名'
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
		comment: '设置表',
	});
};