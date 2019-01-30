<template>
	<view class="content">

		<view class="coin">
			当前剩余排单币个数：{{coin}}
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
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="give">赠送</button>
		</view>
		
	</view>
</template>
<script>
	import uniCell from '@/components/uni-cell/uni-cell.vue';
	
	import ajax from '@/utils/ajax';

	export default {
		components: {
			uniCell
		},
		data() {
			return {
				coin: 0,
				to_nums: '',
				payword: '',
				to_username: '',
				type: 'bangzhu_golds'
			}
		},
		onLoad() {
			
			this.getCoin();
		},
		methods: {
			getCoin(){
				ajax({
						url: '/api/give?type=' + this.type,
						success: res => {
							
							this.coin = res.data.count || 0;
						},
						fail: function(err) {
							console.log('fail', err);
						}
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
						title: '激活码格式不正确'
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
				
				ajax({
					url: '/api/give',
					method: 'POST',
					data: {
						to_nums: this.to_nums,
						to_username: this.to_username,
						payword: this.payword,
						type: this.type
					},
					success: res => {
						
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
						
						
					},
					fail: function(err) {
						
						uni.showToast({
							icon: 'none',
							title: '激活码赠送失败'
						});
					}
				});
			}
			
		}
	}
</script>
<style lang="scss">
	
	@import '../../common/css/common.css';
	@import '../../common/css/variables.scss';
	
	.content {
		
		padding: 0 30upx;
	}
	
	.coin {
		
		padding: 80upx 0;
		text-align: center;
		font-size: $uni-font-size-lg;
	}
	
	.input-row {
	    justify-content: flex-end;
	}
	
	.input-row input {
	    text-align: right;
	}
	
	.btn-row {
		padding-bottom: 30upx;
	}
</style>
