const Sequelize = require('sequelize');
const fs = require('fs');

const config = require('../config/db');

const db = {
	sequelize: new Sequelize(config.database, config.username, config.password, {
		host: config.host,
		dialect: config.dialect,
		pool: {
			max: config.maxPool,
			min: config.minPool,
			idle: config.idlePool
		},
		timezone: '+08:00',
		define: {
			underscored: true
		}

	}),
};


let files = fs.readdirSync(__dirname + '/../schema');

for (let f of files) {

	if (f.endsWith('.js')) {

		db[f.split('.')[0]] = db.sequelize.import(__dirname + '/../schema/' + f.split('.')[0]);
	}
}

// admin_log表关联
db.AdminLog.belongsTo(db.Admin);
db.Admin.hasMany(db.AdminLog);

// user表团队关联
db.User.belongsTo(db.Team);

// user_log表关联
db.UserLog.belongsTo(db.User);
db.User.hasMany(db.UserLog);

// bangzhu表关联
db.Bangzhu.belongsTo(db.User);
db.User.hasMany(db.Bangzhu);

// bangzhu_info表关联
db.BangzhuInfo.belongsTo(db.Bangzhu);
db.BangzhuInfo.belongsTo(db.User);
db.Bangzhu.hasMany(db.BangzhuInfo);
db.User.hasMany(db.BangzhuInfo);

// qiuzhu表关联
db.Qiuzhu.belongsTo(db.User);
db.User.hasMany(db.Qiuzhu);

// qiuzhu_info表关联
db.QiuzhuInfo.belongsTo(db.Bangzhu);
db.QiuzhuInfo.belongsTo(db.User);
db.Bangzhu.hasMany(db.QiuzhuInfo);
db.User.hasMany(db.QiuzhuInfo);

// bang_qiu表关联
db.BangQiu.belongsTo(db.BangzhuInfo);
db.BangzhuInfo.hasMany(db.BangQiu);
db.BangQiu.belongsTo(db.QiuzhuInfo);
db.QiuzhuInfo.hasMany(db.BangQiu);

module.exports = db;