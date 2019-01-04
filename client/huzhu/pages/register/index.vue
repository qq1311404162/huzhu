<template>
	<view class="content">
		
		<uni-cell title="用户名">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入用户名"/>
			</view>
		</uni-cell>
		
		<uni-cell title="上级推荐人">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入上级推荐人"/>
			</view>
		</uni-cell>
		
		<uni-cell title="登录密码">
			<view class="" slot="content">
				<input type="text" password v-model="realname" placeholder="请输入登录密码"/>
			</view>
		</uni-cell>
		
		<uni-cell title="确认密码">
			<view class="" slot="content">
				<input type="text" password v-model="realname" placeholder="请输入确认密码"/>
			</view>
		</uni-cell>
		
		<uni-cell title="真实姓名">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入真实姓名"/>
			</view>
		</uni-cell>
		
		<uni-cell title="手机号">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入手机号"/>
			</view>
		</uni-cell>
		
		<uni-cell is-right="true">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入验证码"/>
			</view>
			<view class="" slot="other">
				<text class="vcode">获取验证码</text>
			</view>
		</uni-cell>
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	import config from '../../config.js';
	import ajax from '../../utils/ajax.js';
	import uniCell from '@/components/uni-cell/uni-cell.vue';

	export default {
		components: {
			uniCell
		},
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
				
				ajax({
					url: config.server_url + '/api/register',
					method: 'POST',
					data: data,
					success: res => {
						console.log(res);
					},
					fail: function(err) {
						console.log('err', JSON.stringify(err));
					}
					
				});
// 				uni.request({
// 					url: config.server_url + '/api/register',
// 					data: data,
// 					success: res => {
// 						console.log(res);
// 					},
// 					fail: function(err) {
// 						console.log('err', JSON.stringify(err));
// 					}
// 				})
// 				// 				uni.setStorageSync('user', JSON.stringify(data));
// 				//                 uni.showToast({
// 				//                     title: '注册成功'
// 				//                 });
// 				//                 uni.navigateBack({
// 				//                     delta: 1
// 				//                 });
			}
		}
	}
</script>

<style>
	@import '../../common/css/common.css';
	
	.vcode {
	
		line-height: 60upx;
		border-radius: 25upx;
		padding: 0 25upx;
		border: 1upx solid #999;
		margin-right: 10upx;
		font-size: 25upx;
	}
	
	.vcode:active {
	
		background: #ADADAD;
	}
	
</style>
