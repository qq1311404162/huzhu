const Sequelize = require('sequelize');
const fs = require('fs');

const config = require('../../config/db');

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

let opts = {
	onUpdate: 'NO ACTION'
};

// admin_log表关联
db.AdminLog.belongsTo(db.Admin, opts);
db.Admin.hasMany(db.AdminLog, opts);

// user表团队关联
db.User.belongsTo(db.Team, opts);
db.previous = db.User.hasOne(db.User, {
	onUpdate: 'NO ACTION',
	foreignKey: 'previous_id',
	as: 'Previous'
}); // 上级推荐人
db.previousTwo = db.User.hasOne(db.User, {
	onUpdate: 'NO ACTION',
	foreignKey: 'previous_two_id',
	as: 'PreviousTwo'
}); // 上上级推荐人
db.previousThr = db.User.hasOne(db.User, {
	onUpdate: 'NO ACTION',
	foreignKey: 'previous_thr_id',
	as: 'PreviousThr'
}); //上上上级推荐人

// user_log表关联
db.UserLog.belongsTo(db.User, opts);
db.User.hasMany(db.UserLog, opts);

// bangzhu表关联
db.Bangzhu.belongsTo(db.User, opts);
db.User.hasMany(db.Bangzhu, opts);

// bangzhu_info表关联
db.BangzhuInfo.belongsTo(db.Bangzhu, opts);
// db.BangzhuInfo.belongsTo(db.User, opts);
db.Bangzhu.hasMany(db.BangzhuInfo, opts);
// db.User.hasMany(db.BangzhuInfo, opts);

// qiuzhu表关联
db.Qiuzhu.belongsTo(db.User, opts);
db.User.hasMany(db.Qiuzhu, opts);

// qiuzhu_info表关联
db.QiuzhuInfo.belongsTo(db.Qiuzhu, opts);
// db.QiuzhuInfo.belongsTo(db.User, opts);
db.Qiuzhu.hasMany(db.QiuzhuInfo, opts);
// db.User.hasMany(db.QiuzhuInfo, opts);

// bang_qiu表关联
db.BangQiu.belongsTo(db.BangzhuInfo, opts);
db.BangzhuInfo.hasOne(db.BangQiu, opts);
db.BangQiu.belongsTo(db.QiuzhuInfo, opts);
db.QiuzhuInfo.hasOne(db.BangQiu, opts);

module.exports = db;