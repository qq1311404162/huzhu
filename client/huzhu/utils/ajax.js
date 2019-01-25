import config from '@/config';

const ajax = (options = {}) => {

	let token = uni.getStorageSync('token') || '';


	uni.request({

		url: config.server_url + (options.url || ''),

		method: options.method || 'GET',

		dataType: options.type || 'json',

		data: options.data || {},

		header: {

			'Accept': 'application/json',
			'Authorization': token
		},
		success: (res) => {

			if (res.statusCode === 401) {
				// 401 跳转到登录页面
				uni.showModal({
					title: '权限不足',
					content: '您需要重新登录',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: false,
					success: (res1) => {
						if (res1.confirm) {
							// 清除本地token
							clearStorage();
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							gotoLogin();
						}
					}
				});

			} else if (res.statusCode !== 200) {
			
				options.fail(res.data);

				
			} else {
				
				// 用户信息不存在，跳转到登录页面
				if (res.data.code === 11009) {
					// 清除本地token
					clearStorage();
					
					gotoLogin();
				}else {
					options.success(res.data);
				}
				
			}


		},
		fail: (err) => {

			options.fail(err);
		}

	});
}

function gotoLogin() {
	uni.reLaunch({
		url: '../login/index'
	});
}

function clearStorage(){
	
	uni.setStorageSync('token', '');
}

export default ajax;
