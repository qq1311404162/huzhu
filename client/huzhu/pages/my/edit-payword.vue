<template>
	<view class="content">
		
		<view class="group">
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
			
		</view>
		
		<view class="btns">
			<button type="primary" class="register" @tap="edit">修改支付密码</button>
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
<style lang="scss">
@import '../../common/css/variables.scss';


.group {
	background: $uni-text-color-inverse;
	margin: 35upx 0;
}

.vcode {
    line-height: 60upx;
    border-radius: $uni-border-radius-lg;
    padding: 0 25upx;
    border: 1upx solid $uni-border-color;
    margin-right: 10upx;
    font-size: $uni-font-size-sm;
}

.vcode:active {
    background: $uni-border-color;
	color: $uni-bg-color;
}

.input-row {
    justify-content: flex-end;
}

.input-row input {
    text-align: right;
	font-size: $uni-font-size-base;
	padding-right: 20upx;
}

.btns {
	margin: 50upx 10%;
}
</style>