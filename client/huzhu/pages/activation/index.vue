<template>
	<view class="content">

		<view class="form">
			<view class="coin">
				当前剩余激活码个数：{{activation}}
			</view>
			
			<uni-cell title="接收人">
				<view slot="content">
					<view class="flex-row input-row" slot="content">
						<input type="text" v-model="to_username" placeholder="请输入接受者用户名"/>
					</view>
				</view>
				
			</uni-cell>
			
			<uni-cell title="激活码个数">
				<view slot="content">
					<view class="flex-row input-row" slot="content">
						<input type="text" v-model="to_nums" placeholder="请输入激活码个数"/>
					</view>
					
				</view>
				
			</uni-cell>
			<uni-cell title="支付密码">
				<view slot="content">
					<view class="flex-row input-row" slot="content">
						<input type="text" v-model="payword" placeholder="请输入支付密码"/>
					</view>
					
				</view>
				
			</uni-cell>
			
			<view class="btns">
				<button type="primary" class="primary" @tap="give">赠送</button>
			</view>
		</view>
		
	</view>
</template>
<script>
	import uniCell from '@/components/uni-cell/uni-cell.vue';
	
	import {getUserActiveCount, giveActive} from '@/utils/api';

	export default {
		components: {
			uniCell
		},
		data() {
			return {
				activation: 0,
				to_nums: '',
				payword: '',
				to_username: '',
				type: 'active_golds'
			}
		},
		onLoad() {
			
			this.getActivation();
		},
		methods: {
			getActivation(){
				
				getUserActiveCount(this.type).then(res => {
					
					if (!res) return;
					
					this.activation = res.count || 0;
				});

			},
			give(){
				if (!this.to_username) {
					uni.showToast({
						icon: 'none',
						title: '请输入赠送用户名'
					});
					return;
				}
				if (this.to_nums == '' || this.to_nums == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入激活码'
					});
					return;
				}
				if (!/^\+?[1-9][0-9]*$/.test(this.to_nums)) {
					uni.showToast({
						icon: 'none',
						title: '激活码数量不正确'
					});
					return;
				}
				
				
				if (!this.payword) {
					uni.showToast({
						icon: 'none',
						title: '请输入支付密码'
					});
					return;
				}
				
				giveActive({
						to_nums: this.to_nums,
						to_username: this.to_username,
						payword: this.payword,
						type: this.type
					});
			}
			
		}
	}
</script>
<style lang="scss">
	
	@import '../../common/css/variables.scss';
	
	.content {
		
		padding: 10% 30upx;
	}
	
	.form {
		padding-top: 50upx;
		background: $uni-bg-color;
	}
	
	.coin {
		
		padding: 80upx 0;
		text-align: center;
		font-size: $uni-font-size-lg;
		color: $uni-color-error;
	}
	
	.input-row {
	    justify-content: flex-end;
	}
	
	.input-row input {
	    text-align: right;
	}
	
	.btns {
		width: 80%;
		margin: 10% auto 0 auto;
		padding-bottom: 50upx;
	}
</style>
