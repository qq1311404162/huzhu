<template>
	<view class="content">
		<uni-cell title="旧支付密码">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入旧支付密码"/>
			</view>
		</uni-cell>
		
		<uni-cell title="新支付密码">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入新支付密码"/>
			</view>
		</uni-cell>
		
		<uni-cell title="登录密码">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入登录密码"/>
			</view>
		</uni-cell>
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="edit">修改支付密码</button>
		</view>
	</view>
</template>
<script>
	
	import uniCell from '@/components/uni-cell/uni-cell.vue';
	
	export default {
		components: {
			uniCell
		},
		
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
	@import '../../common/css/common.css';
	
	
</style>