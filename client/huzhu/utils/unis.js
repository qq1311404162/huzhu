

// 设置缓存中的 token
export const setStorage = (token = '') => {
	
	uni.setStorageSync('token', token);
}
// 获取缓存中的 token
export const getStorage = () => {
	
	return uni.getStorageSync('token') || '';
}

// 清除缓存中的 token
export const clearStorage = () => {
	
	uni.setStorageSync('token', '');
}

export const showToast = (title = '') => {
	
	uni.showToast({
		title: title,
		icon: 'none'
	});
}

// 提示网络错误
export const netErr = (err) => {

	console.log(err.errMsg);
	showToast('无法连接到服务器');
}

// 跳转登录页面
export const gotoLogin = () => {
	
	uni.reLaunch({
		url: '../login/index'
	});
	
}
// 跳转到首页
export const gotoIndex = () => {
	
	uni.showLoading({
		title: '自动登录中',
		mask: true,
		success: () => {
			
			setTimeout(() => {
				
				uni.hideLoading();
				
				uni.reLaunch({
					url: '../index/my'
				});
			}, 1500);
		}
		
	});
	
	
	
	
}


export const clearStorageAndReLogin = () => {
	// 清除本地token
	clearStorage();
	// 跳转到登录
	gotoLogin();
}

// 权限不足，并且跳转到登录页
export const noAuth = () => {
	
	uni.showModal({
		title: '权限不足',
		content: '您需要重新登录',
		showCancel: false,
		success: (res) => {
			if (res.confirm) {
				clearStorageAndReLogin();
			}
		}
	});

}