<template>
	<view class="content">
		<uni-cell title="旧支付密码">
			<view slot="content">
				<view class="flex-row input-row">
					<input type="text" v-model="old_payword" placeholder="请输入旧支付密码"/>
				</view>
				
			</view>
		</uni-cell>
		
		<uni-cell title="新支付密码">
			<view slot="content">
				<view class="flex-row input-row">
					<input type="text" v-model="new_payword" placeholder="请输入新支付密码"/>
				</view>
				
			</view>
		</uni-cell>
		
		<uni-cell title="登录密码">
			<view slot="content">
				<view class="flex-row input-row">
					<input type="text" v-model="password" placeholder="请输入登录密码"/>
				</view>
				
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
	
	.input-row {
		
		justify-content: flex-end;
	}
	
	.input-row input {
		text-align: right;
	}
	
	
</style>