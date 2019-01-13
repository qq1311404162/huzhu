const Sequelize = require('sequelize');
const moment = require('moment');

const Model = require('./Model');
const db = require('../models/index');

const Bangzhu = db.Bangzhu;

class BangzhuModel extends Model {

	constructor(){
		
        super(db.Bangzhu);
        
        this.staticValue = {
            state: {
                0: '等待匹配',
                1: '等待确认',
                2: '已完成'
            },
            type: {
                1: '自身额度',
                2: '用户赠送'
            }
        };
    }


    /**
     * 获取当天帮助的条数
     * @param {*} user_id 
     */
    async getDayCount(user_id) {

        return await this.count({
            where: {
                user_id: user_id,
                created_at: {
                    [Sequelize.Op.gte]: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                    [Sequelize.Op.lte]: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
                }
            }
        });
    }

    /**
     * 获取用户当前自身帮助中未完成的条数
     * @param {*} user_id 
     */
    async getMainDoingCount (user_id) {
        
        return await this.count({
            where: {
                user_id: user_id,
                type: 1,
                state: {
                    [Sequelize.Op.in]: [0, 1]
                }
            }
        });
    }

    /**
     * 获取用户赠送机会本月帮助的条数
     * @param {*} user_id 
     */
    async getGiftDoingCount (user_id) {

        return await this.count({
            where: {
                user_id: user_id,
                type: 2,
                created_at: {
                    [Sequelize.Op.gte]: moment().startOf('month'),
                    [Sequelize.Op.lte]: moment().endOf('month')
                }
            }
        });
    }

    /**
     * 写入数据表中
     * @param {*} data 
     */
    async bangzhu (data) {
        // 订单编号
        data.ident = 'p' + moment().format('YYYYMMDDHHmmss') + Math.floor(Math.random() * 1000).toString();
        // 关联数据写入
        data.bangzhu_infos = Object.assign({}, data);

        return await this.create(data, {
            include:[db.BangzhuInfo]
        });
    }


    /**
     * 获取未完成的帮助记录
     * @param {*} user_id 
     */
    async getNotDoneLists (user_id) {

        return await this.findAll({
                where: {
                user_id: user_id,
                state: {
                    [Sequelize.Op.in]: [0, 1]
                }
            }
        });
    }


    /**
     * 获取全部帮助记录
     * @param {*} user_id 
     */
    async getLists (user_id) {
        return await this.findAll({
            where: {
            user_id: user_id,
        }
    });
    }
    
}

module.exports = new BangzhuModel();