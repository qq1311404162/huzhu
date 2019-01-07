const ajax = (options = {}) => {
	
	let token = uni.getStorageSync('token') || '';
	
	
	uni.request({
		
		url: options.url || '', 
		
		method: options.method || 'GET',
		
		dataType: options.type || 'json',
		
		data: options.data || {},
		
		header: {
			
			// 'Accept': 'application/json',
			'Authorization': token
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
