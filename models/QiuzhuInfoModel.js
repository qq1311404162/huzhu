const Sequelize = require('sequelize');
const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

class QiuzhuInfoModel extends Model {

	constructor(){
		
        super(db.QiuzhuInfo);
        
        this.staticValue = {
            state: {
                0: '等待匹配',
                1: '等待确认',
                2: '已完成'
            },
            type: {
                1: '静态钱包',
                2: '动态钱包'
            }
        };
    }
    
}

module.exports = new QiuzhuInfoModel();