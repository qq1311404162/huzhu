
<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">旧密码：</text>
				<input type="text" v-model="password" placeholder="请输入旧密码">
			</view>
			<view class="input-row border">
				<text class="title">新密码：</text>
				<input type="text" v-model="new_password" placeholder="请输入新密码">
			</view>
			<view class="input-row border">
				<text class="title">确认新密码：</text>
				<input type="text" v-model="repassword" disabled="true" placeholder="请输入确认密码">
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="edit">修改密码</button>
		</view>
	</view>
</template>
<script>
	
	export default {
		
		data() {
			
			return {
				password: '',
				new_password: '',
				repassword: ''
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