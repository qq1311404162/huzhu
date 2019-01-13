const Sequelize = require('sequelize');

const Model = require('./Model');
const db = require('../models/index');

let teamData = [{
	name: '初级',
	zhitui_num: 0,
	tem_num: 0,
	reward_one: 0,
	reward_two: 0,
	reward_three: 0,
	reward_other: 0,
},
{
	name: '一级',
	zhitui_num: 2,
	tem_num: 2,
	reward_one: 30,
	reward_two: 0,
	reward_three: 0,
	reward_other: 0,
},
{
	name: '二级',
	zhitui_num: 5,
	tem_num: 5,
	reward_one: 30,
	reward_two: 20,
	reward_three: 0,
	reward_other: 0,
},
{
	name: '三级',
	zhitui_num: 10,
	tem_num: 50,
	reward_one: 30,
	reward_two: 20,
	reward_three: 10,
	reward_other: 0,
},
{
	name: '四级',
	zhitui_num: 20,
	tem_num: 100,
	reward_one: 30,
	reward_two: 20,
	reward_three: 10,
	reward_other: 1,
}
];

class TeamModel extends Model {

	constructor(){
		
		super(db.Team);
	}

	/**
	 * 设置表初始化
	 */
	async init () {

        let count = this.count();
        
        if (count == 0) {
            // 批量写入数据
		    return await this.bulkCreate(teamData);
        }

	}
}

module.exports = new TeamModel();