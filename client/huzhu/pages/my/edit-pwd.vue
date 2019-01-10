
<template>
	<view class="content">
		
		<uni-cell title="旧密码">
			<view slot="content">
				<view class="flex-row input-row">
					<input type="text" v-model="old_password" placeholder="请输入旧密码"/>
				</view>
				
			</view>
		</uni-cell>
		
		<uni-cell title="新密码">
			<view slot="content">
				<view class="flex-row input-row">
					<input type="text" v-model="new_password" placeholder="请输入新密码"/>
				</view>
				
			</view>
		</uni-cell>
		
		<uni-cell title="确认新密码">
			<view slot="content">
				<view class="flex-row input-row">
					<input type="text" v-model="repassword" placeholder="请输入确认密码"/>
				</view>
				
			</view>
		</uni-cell>
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="edit">修改密码</button>
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
				new_password: '',
				repassword: ''
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