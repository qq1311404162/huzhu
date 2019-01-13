const Sequelize = require('sequelize');
const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

class UserLogModel extends Model {

	constructor(){
		
        super(db.UserLog);
        
        this.staticValue = {
            state: {
                0: '等待打款',
                1: '等待确认',
                2: '已完成',
                9: '作废'
            }
        };
    }
    
}

module.exports = new UserLogModel();