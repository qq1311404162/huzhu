<template>
	<view class="content">
		<!-- <button @click="bindLogin">登录</button> -->
		<!-- <button @click="bindRegister">注册</button> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	
	
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad() {
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					* 如果需要强制登录，不显示取消按钮
					*/
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							* 如果需要强制登录，使用reLaunch方式
							*/
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/index'
								});
							} else {
								uni.navigateTo({
									url: '../login/index'
								});
							}
						}
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 36px;
		color: #8f8f94;
	}
</style>
