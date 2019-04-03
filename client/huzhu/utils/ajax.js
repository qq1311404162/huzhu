import config from '@/config';
import {getStorage, clearStorageAndReLogin, netErr, noAuth, showToast} from './unis';


const validateRequestInfo = (res) => {

	let statusCode = res.data.code || 500,
		resData = res.data || {};
		
	// 权限不足提示
	if (statusCode === 401) {
		
		noAuth();
		return;
	}
	// 没有返回信息时，跳转到登录页面
	if (!resData || resData.code === 11009) {
		
		clearStorageAndReLogin();
		return;
	}
// 	// 错误信息提示
// 	if (resData.data == null) {
// 		
// 		showToast(resData.msg);
// 		return;
// 	}
	// 返回信息
	return resData;
}

// 通用请求封装
const request = async (options = {}) => {

	let [error, res] = await uni.request({
		url: config.server_url + (options.url || ''),
		
		method: options.method || 'GET',
		
		dataType: options.type || 'json',
		
		data: options.data || {},
		
		header: {
		
			'Accept': 'application/json',
			'Authorization': getStorage()
		},
	});
	
	// log
	console.log('error', JSON.stringify(error));
	console.log('success', JSON.stringify(res));

	if (error) {
		netErr(error);
		return;
	}
	
	
	return validateRequestInfo(res);
}


export const getAjax = async (url = '') => {
	
	
	return await request({
		url: url,
		method: 'GET'
	});
	
}

export const postAjax = async (url = '', data = {}) => {
	
	return await request({
		url: url,
		method: 'POST',
		data: data
	});
	
}