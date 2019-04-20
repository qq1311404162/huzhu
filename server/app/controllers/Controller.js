class Controller {

	constructor() {
		this.limit = 15;
	}

	listRender(code = 0, msg = '', count = 0, data = []) {

		return {
			'code': code,
			'msg': msg,
			'count': count,
			'data': data
		};
	}

}

module.exports = Controller;