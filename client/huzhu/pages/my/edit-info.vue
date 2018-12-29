<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border img">
				<text class="title">头像：</text>
				<input type="text" v-model="avatar" placeholder="请输入账号">
			</view>
			<view class="input-row border">
				<text class="title">手机号码：</text>
				<input type="text" v-model="mobile" disabled="true" placeholder="请输入账号" value="12312312">
			</view>
			<view class="input-row border">
				<text class="title">真实姓名：</text>
				<input type="text" v-model="realname" disabled="true" placeholder="请输入账号">
			</view>
			<view class="input-row border">
				<text class="title">银行名称：</text>
				<input type="text" v-model="card_name" placeholder="请输入账号">
			</view>
			<view class="input-row border">
				<text class="title">银行卡号：</text>
				<input type="text" v-model="card_nums" placeholder="请输入账号">
			</view>
			<view class="input-row border img">
				<text class="title">微信收款码：</text>
				<input type="text" v-model="wechat_qrcode" placeholder="请输入账号">
			</view>
			<view class="input-row border img">
				<text class="title">支付宝收款码：</text>
				<input type="text" v-model="alipay_qrcode" placeholder="请输入账号">
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="edit">修改</button>
		</view>
	</view>
</template>
<script>
	
	export default {
		
		data() {
			
			return {
				avatar: '',
				mobile: '',
				realname: '',
				card_name: '',
				card_nums: '',
				wechat_qrcode: '',
				alipay_qrcode: ''
			};
		}
	}
</script>
<style>
	@import '../../common/css/form.css';
	
	.input-row input {
		text-align: right;
	}
	
	.img {
		
		line-height: 200upx;
		height: 200upx;
	}
	
</style>