<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">用户名：</text>
				<input type="text" v-model="username" placeholder="请输入用户名">
			</view>
			<view class="input-row border">
				<text class="title">上级推荐人：</text>
				<input type="text" v-model="username" placeholder="请输入上级账号">
			</view>
			<view class="input-row border">
				<text class="title">登录密码：</text>
				<input type="text" password="true" v-model="password" placeholder="请输入登录密码">
			</view>
			<view class="input-row border">
				<text class="title">确认密码：</text>
				<input type="text" password="true" v-model="repassword" placeholder="请输入确认密码">
			</view>
			<view class="input-row border">
				<text class="title">真实姓名：</text>
				<input type="text" v-model="realname" placeholder="请输入真实姓名">
			</view>
			<view class="input-row border">
				<text class="title">手机号：</text>
				<input type="text" v-model="mobile" placeholder="请输入手机号">
			</view>
			<view class="input-row border">
				<input type="text" v-model="vcode" placeholder="请输入验证码">
				<text class="vcode">获取验证码</text>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	import config from '../../config.js';

	export default {
		data() {
			return {
				mobile: '',
				username: '',
				password: '',
				realname: ''
			}
		},
		methods: {
			register() {

				// 				if (this.mobile.length != 11) {
				// 					uni.showToast({
				// 						icon:'none',
				// 						title: '手机号格式不正确'
				// 					});
				// 					return;
				// 				}
				//                 if (this.username.length < 5) {
				//                     uni.showToast({
				//                         icon: 'none',
				//                         title: '账号最短为 5 个字符'
				//                     });
				//                     return;
				//                 }
				//                 if (this.password.length < 6) {
				//                     uni.showToast({
				//                         icon: 'none',
				//                         title: '密码最短为 6 个字符'
				//                     });
				//                     return;
				//                 }
				//                 if (this.realname.length == '') {
				//                     uni.showToast({
				//                         icon: 'none',
				//                         title: '真实姓名不合法'
				//                     });
				//                     return;
				//                 }

				const data = {
					mobile: this.mobile,
					username: this.username,
					password: this.password,
					realname: this.realname
				}
				uni.request({
					url: config.server_url + '/api/register',
					data: data,
					success: res => {
						console.log(res);
					},
					fail: function(err) {
						console.log('err', JSON.stringify(err));
					}
				})
				// 				uni.setStorageSync('user', JSON.stringify(data));
				//                 uni.showToast({
				//                     title: '注册成功'
				//                 });
				//                 uni.navigateBack({
				//                     delta: 1
				//                 });
			}
		}
	}
</script>

<style>
	@import '../../common/css/form.css';
	
</style>
