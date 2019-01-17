const fs = require('fs');
const path = require('path');
const moment = require('moment');

const errCode = require('../../config/error-code');

class UploadController {


	static async upload(ctx) {

		let file = ctx.request.files.file,
			request = ctx.request.body;


		let picPath = await UploadController.save(file, request.type);

		if (!picPath) {
			return ctx.json(errCode.err_upload);
		}

		return ctx.json({
			data: {
				file: picPath
			}
		});
		// await UploadController.save(file, request.type).then((url) => {
		// 	// 返回上传地址
		// 	return ctx.json({
		// 		data: {
		// 			file: url
		// 		}
		// 	});

		// }).catch(() => {

		// 	return ctx.json(errCode.err_upload);
		// });

	}

	static async save(file, type = 'avatar') {
		// 默认上传类型为头像
		let dirpath = path.join(__dirname, '../../static/upload/', type, '/'),
			fileSavePath = '/upload/' + type + '/',
			reader = fs.createReadStream(file.path),
			fileName = moment().format('YYYYMMDDHHmmss') + Math.floor((Math.random() * 1000)) + '.' + file.name.split('.').pop();

		// 文件夹不存在则新建
		if (!fs.existsSync(dirpath)) {

			fs.mkdirSync(dirpath);
		}

		let upStream = fs.createWriteStream(dirpath + fileName);

		reader.pipe(upStream);
		// console.log(reader.pipe(upStream));

		return fileSavePath + fileName;

		// return new Promise(function (resolve, reject) {

		// 	reader.on('finish', () => {

		// 		resolve(fileSavePath + fileName);
		// 	});

		// 	reader.on('error', () => {
		// 		reject(new Error('save fail'));
		// 	});
		// });
	}

}

module.exports = UploadController;