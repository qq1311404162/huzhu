class UploadController {


	static async upload(ctx) {

		return ctx.json({
			data: JSON.stringify(ctx.request.files)
		});
	}

}

module.exports = UploadController;