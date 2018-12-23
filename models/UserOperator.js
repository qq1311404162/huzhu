const Sequelize = require('sequelize');
const db = require('../db');

const UserOperator = db.define('user_operator', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		comment: '用户id'
    },
    content: {
        type: Sequelize.STRING,
        comment: '操作描述'
    }
}, {
	paranoid: true,
	comment: '用户操作表'
});

module.exports = UserOperator;