<template>
	<view class="content">
		<view class="flex-column user-info">
			<image src="../../static/dynamic.png" mode=""></image>
			<text class="name">闲庭梦若</text>
			<text>未激活</text>
		</view>
		<view class="lists">
			<view class="item" @click="goto('edit-info')">
				<text>个人资料</text>
			</view>
			<view class="item">
				<text>我的推广</text>
			</view>
			<view class="item">
				<text>推广链接</text>
			</view>
			<view class="item" @click="goto('edit-pwd')">
				<text>修改密码</text>
			</view>
			<view class="item" @click="goto('edit-payword')">
				<text>修改交易密码</text>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary">退出登录</button>
		</view>
	</view>
</template>
<script>
	export default {
		methods: {

			// 跳转到指定页面
			goto(url) {
				uni.navigateTo({
					url: '../my/' + url
				});
			}
		}
	}
</script>
<style>
	@import '../../common/css/common.css';
	@import '../../common/css/form.css';

	.user-info {
		align-items: center;
		justify-content: center;
		padding-top: 30upx;
		padding-bottom: 20upx;
		border-bottom: 4upx solid #f5f5f5;
	}

	.user-info image {

		display: inline-block;
		width: 180upx;
		height: 180upx;
		padding-bottom: 20upx;
	}

	.user-info text {

		font-size: 32upx;
	}

	.user-info .name {

		font-size: 40upx;
		font-weight: bold;
	}


	.item {
		line-height: 100upx;
		padding: 0 30upx;
		font-size: 40upx;
		flex: 1;
		position: relative;
		border-bottom: 4upx solid #f5f5f5;
	}

	.item:after {
		content: " ";
		display: inline-block;
		height: 12upx;
		width: 12upx;
		border-width: 4upx 4upx 0 0;
		border-color: #c8c8cd;
		border-style: solid;
		-webkit-transform: matrix(.71, .71, -.71, .71, 0, 0);
		transform: matrix(.71, .71, -.71, .71, 0, 0);
		position: relative;
		top: -4upx;
		position: absolute;
		top: 50%;
		right: 30upx;
		margin-top: -8upx;
	}
	
	.item:active {
		background: #DDDDDD;
	}
</style>
