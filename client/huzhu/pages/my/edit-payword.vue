<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">旧支付密码：</text>
				<input type="text" v-model="payword" placeholder="请输入旧支付密码">
			</view>
			<view class="input-row border">
				<text class="title">新支付密码：</text>
				<input type="text" v-model="new_payword" placeholder="请输入新支付密码">
			</view>
			<view class="input-row border">
				<text class="title">登录密码：</text>
				<input type="password" v-model="password" disabled="true" placeholder="请输入登录密码">
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="edit">修改支付密码</button>
		</view>
	</view>
</template>
<script>
	
	export default {
		
		data() {
			
			return {
				password: '',
				payword: '',
				new_payword: ''
			};
		}
	}
</script>
<style>
	@import '../../common/css/form.css';
	
	.input-row input {
		text-align: right;
	}
	
</style>