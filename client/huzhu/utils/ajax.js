const ajax = (options = {}) => {
	
	uni.request({
		
		url: options.url || '', 
		
		method: options.method || 'GET',
		
		dataType: options.type || 'json',
		
		data: options.data || {},
		
		header: {
			
			'custom-header': 'hello' //自定义请求头信息
		},
		success: (res) => {
			
			options.success(res);
		},
		fail: (err) => {
			
			options.fail(err);
		}
		
	});
}

export default ajax;
