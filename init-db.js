const db = require('./models/index');
const settingModel = require('./models/SettingModel');
const teamModel = require('./models/TeamModel');

let data = {};
// let data = {force: true};

db.sequelize.sync(data).then(() => {

    // 数据初始化
    settingModel.init().then(() => {
        console.log('setting表初始化成功');
    });
    teamModel.init().then(() => {
        console.log('team表初始化成功');
    }).catch(err => {
        console.log(err);
    });

});

