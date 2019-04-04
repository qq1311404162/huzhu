import { getAjax, postAjax } from './ajax';
import { showToast, setStorage } from './unis';

// 用户登录
export const userLogin = async (data = {}) => {
	
	
	let res = await postAjax('/api/login', data);
	
	if (!res) return;
	
	if (res.code !== 0) {
	    uni.showToast({
	        icon: 'none',
	        title: res.msg
	    });
	} else {
		// 保存token
		setStorage(res.data.token);
		// 跳转到首页
	    uni.showToast({
	        icon: 'none',
	        title: '登录成功',
	        success() {
	            uni.reLaunch({
	                url: '../index/index'
	            });
	        }
	    });
	}
	
}

// 获取用户信息接口
export const getUserIndex = async () => {
	
	let res = await getAjax('/api/user-index');

	if (!res) return;
	
	return res.data;
	
}

// 获取我的页面信息接口
export const getUserInfo = async () => {
	
	let res = await getAjax('/api/user-info');
	
	if (!res) return;
	
	return res.data;
}

// 用户注册接口
export const registerInfo = async (data) => {
	
	let res = await postAjax('/api/register', data);

	if (!res) return;
	
	showToast(res.msg);
	
	if (res.code === 0) {
		// 1s 后返回
		setTimeout(() => {
			uni.navigateBack();
		}, 1000);
		
	}
	
}

// 获取要修改的用户信息接口
export const getEditInfo = async () => {
	
	let res = await getAjax('/api/edit-info');
	
	if (!res) return;
	
	return res.data;
}

