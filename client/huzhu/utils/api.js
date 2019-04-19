import { getAjax, postAjax } from './ajax';
import { showToast, setStorage, naviBackWithTime, gotoLogin } from './unis';

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
	
	if (res.code !== 0) {
		showToast(res.msg);
		return;
	}
	
	return res.data;
	
}

// 获取我的页面信息接口
export const getUserInfo = async () => {
	
	let res = await getAjax('/api/user-info');
	
	if (!res) return;
	
	if (res.code !== 0) {
		showToast(res.msg);
		return;
	}
	
	return res.data;
}

// 用户注册接口
export const registerInfo = async (data) => {
	
	let res = await postAjax('/api/register', data);

	if (!res) return;
	
	showToast(res.msg);
	
	if (res.code === 0) naviBackWithTime();
	
}

// 获取要修改的用户信息接口
export const getEditInfo = async () => {
	
	let res = await getAjax('/api/edit-info');
	
	if (!res) return;
	
	if (res.code !== 0) {
		showToast(res.msg);
		return;
	}
	
	return res.data;
}

export const setEditInfo = async (data) => {
	
	let res = await postAjax('/api/edit-info', data);
	
	if (!res) return;
	
	showToast(res.msg);
	
	if (res.code === 0) naviBackWithTime();
}

// 激活账户.
export const Activation = async () => {
	
	let res = await getAjax('/api/activation');
	
	if (!res) return;
	
	if (res.code !== 0) {
		showToast(res.msg);
		return;
	}

	return res;
}

// 退出登录
export const doLogout = async () => {
	
	// 清空 token
	setStorage();
	
	gotoLogin();
}

// 修改密码
export const editPwd = async (data) => {
	
	let res = await postAjax('', data);
	
	if (!res) return;
	
}

// 获取用户帮助额度
export const getBangzhuAvailable = async () => {
	
	let res = await getAjax('/api/bangzhu/add');
	
	if (!res) return;
	
	if (res.code !== 0) {
		showToast(res.msg);
		return;
	}
	
	return res.data;
}

// 提交帮助信息
export const bangzhuAdd = async (data) => {
	
	let res = await postAjax('/api/bangzhu/add', data);
	
	if (!res) return;
	
	showToast(res.msg);
	
	if (res.code === 0) naviBackWithTime();
}

// 获取用户求助额度
export const getQiuzhuAvailable = async () => {
	
	let res = await getAjax('/api/qiuzhu/add');
	
	if (!res) return;
	
	if (res.code !== 0) {
		showToast(res.msg);
		return;
	}
	
	return res.data;
}

// 提交求助信息
export const qiuzhuAdd = async (data) => {
	
	let res = await postAjax('/api/qiuzhu/add', data);
	
	if (!res) return;
	
	showToast(res.msg);
	
	if (res.code === 0) naviBackWithTime();
}

// 获取用户激活码个数
export const getUserActiveCount = async type => {
	
	let res = await getAjax('/api/give?type=' + type);
	
	if (!res) return;
	
	if (res.code !== 0) {
		showToast(res.msg);
		return;
	}
	
	return res.data;
}

// 赠送激活码
export const giveActive = async data => {
	
	let res = await postAjax('/api/give', data);
	
	if (!res) return;
	
	showToast(res.msg);
	
	if (res.code === 0) naviBackWithTime();
}

// 获取用户排单币数量
export const getCoinCount = async type => {
	
	let res = await getAjax('/api/give?type=' + type);
	
	if (!res) return;
	
	if (res.code !== 0) {
		showToast(res.msg);
		return;
	}
	
	return res.data;
}

// 赠送排单币
export const giveCoin = async data => {
	
	let res = await getAjax('/api/give?type=' + type);
	
	if (!res) return;
	
	showToast(res.msg);
	
	if (res.code === 0) naviBackWithTime();
}

// 获取帮助列表
export const getBangzhuLists = async (page, pageLength) => {
	
	let res = await getAjax('/api/bangzhu/index?page=' + page + '&length=' + pageLength);
	
	if (!res) return;
	
	if (res.code !== 0) {
		showToast(res.msg);
		return;
	}
	
	return res.data;
}