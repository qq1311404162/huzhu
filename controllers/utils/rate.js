const bangzhuInfoModel = require('../../models/BangzhuInfoModel');

class Rate {

	constructor() {

	}

	/**
	 * 计算个人利息
	 * @param {*} bangzhuInfo 
	 */
	static async rateBangzhu(bangzhuInfo) {

		// 获取全部的拆分订单
		let infos = await bangzhuInfoModel.findAllInfos(bangzhuInfo),
			rate = 0;

		// 循环订单，计算每一个利息
		for (const info of infos) {

			rate += await doRate(info);
		}
	}
}

module.exports = new Rate();