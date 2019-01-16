const fs = require('fs');
const path = require('path');

class UploadController {


	static async upload(ctx) {

		let file = ctx.request.files.file;

		let reader = fs.createReadStream(file.path),
			filePath = path.join(__dirname, '../../static/upload/') + file.name;

		let upStream = fs.createWriteStream(filePath);
		reader.pipe(upStream);



		return ctx.json({
			data: {
				file: JSON.stringify(filePath),
				body: ctx.request.body
			}
		});
	}

}

module.exports = UploadController;