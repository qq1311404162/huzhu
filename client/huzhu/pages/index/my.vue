<template>
	<view class="content">
		<view class="flex-column user-info">
			<image src="../../static/dynamic.png" mode=""></image>
			<text>闲庭梦若</text>
			<text>黄金</text>
		</view>
		<view class="lists">
			<view class="item">
				<text>我的推广</text>
			</view>
			<view class="item">
				<text>个人资料</text>
			</view>
			<view class="item">
				<text>推广链接</text>
			</view>
			<view class="item">
				<text>修改密码</text>
			</view>
			<view class="item">
				<text>修改交易密码</text>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary">退出登录</button>
		</view>
	</view>
</template>
<style>
	@import '../../common/css/common.css';
	@import '../../common/css/form.css';

	.user-info {
		align-items: center;
		justify-content: center;
		padding-top: 40upx;
		padding-bottom: 20upx;
		border-bottom: 4upx solid #f5f5f5;
	}

	.user-info image {

		display: inline-block;
		width: 200upx;
		height: 200upx;
		padding-bottom: 20upx;
	}

	.user-info text {

		font-size: 36upx;
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
	
</style>
