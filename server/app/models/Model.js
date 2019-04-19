class Model {

	constructor(model) {

		this.model = model;
	}


	/**
	 * 按id查找
	 * @param {*} id 
	 * @param {*} opts 
	 */
	async findById(id, opts = {}) {

		return await this.model.findById(id, opts);
	}

	/**
	 * 查询单条记录
	 * @param {*} opts 
	 */
	async findOne(opts) {

		return await this.model.findOne(opts);
	}

	/**
	 * 查询多条记录并返回总数
	 * @param {*} opts 
	 */
	async findAndCountAll(opts) {

		return await this.model.findAndCountAll(opts);
	}

	/**
	 * 查询多条记录
	 * @param {*} opts 
	 */
	async findAll(opts) {

		return await this.model.findAll(opts);
	}


	/**
	 * 添加记录
	 * @param {*} data 
	 */
	async create(data, opts = {}) {

		return await this.model.create(data, opts);
	}

	/**
	 * 批量添加记录
	 * @param {*} data 
	 */
	async bulkCreate(data) {

		return await this.model.bulkCreate(data);
	}

	/**
	 * 修改记录
	 * @param {*} data 
	 * @param {*} opts 
	 */
	async update(data, opts) {

		return await this.model.update(data, opts);
	}

	/**
	 * 返回条数
	 * @param {*} opts 
	 */
	async count(opts) {

		return await this.model.count(opts);
	}

	/**
	 * 删除数据
	 * @param {*} opts 
	 */
	async destroy(opts) {

		return await this.model.destroy(opts);
	}
}

module.exports = Model;