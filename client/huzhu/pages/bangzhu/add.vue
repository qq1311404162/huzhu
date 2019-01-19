<template>
	<view class="content">
		<view class="form">
			<view class="flex-row select">
				<view :class="type == 1 ? 'checked' : 'type'" @click="select(1)">
					<view class="title">
						额度帮助
					</view>
					<view class="context">
						当前可帮助
					</view>
				</view>
				<view :class="type == 2 ? 'checked' : 'type'" @click="select(2)">
					<view class="title">
						用户帮助
					</view>
					<view class="context">
						9/11
					</view>
				</view>
			</view>
			<uni-cell title="求助金额">
				<view slot="content">
					<view class="flex-row input-row" @click="openPicker">
						{{bangzhuAmount}}
					</view>
					
				</view>
			</uni-cell>
			
			<uni-cell title="交易密码">
				<view slot="content">
					<view class="flex-row input-row">
						<input type="text" v-model="payword" placeholder="请输入交易密码"/>
					</view>
					
				</view>
			</uni-cell>
			
			<view class="btn-row">
				<button type="primary" class="primary" @tap="submit">确定帮助</button>
			</view>
			
		</view>
		<mpvue-picker ref="mpvuePicker" mode="selector" deepLength="1" :pickerValueDefault="pickerValueDefault"
		@onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import uniCell from '@/components/uni-cell/uni-cell.vue';
	
	import ajax from '@/utils/ajax';
	
	export default {
		components: {
			mpvuePicker,
			uniCell
		},
		data(){
			
			return {
				pickerValueDefault: [0],
				pickerValueArray:[],
				amount: 0,
				payword: '',
				type: 0,
				available: 0,
				status: 1,
			};
		},
		onLoad() {
			// 获取帮助金额
			this.userAvailable();
		},
		computed: {
			bangzhuAmount(){
				
				return this.amount == 0 ? '请选择帮助金额' : this.amount;
			},
		},
		methods:{
			userAvailable(){
				ajax({
					url: '/api/bangzhu/index',
					success: res => {
						
						for (let i = 1; i <= (res.data.user.available || 1); i++) {
							
							this.pickerValueArray.push({
								label: parseInt(res.data.setting.value) * i,
								value: i
							});
						}
					},
					fail: function(err) {
						console.log('fail', err);
					}
				});
			},
			select(value) {
				this.type = value;
			},
			openPicker(){
				this.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
				this.amount = e.label;
				this.available = e.value[0];

			},
			onCancel(e) {
				console.log(e)
			},
			submit(){
				
				if (this.type == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择帮助类型'
					});
					return;
				}
				
				if (this.available == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择帮助金额'
					});
					return;
				}
				
				if (this.payword == '') {
					uni.showToast({
						icon: 'none',
						title: '请选择填写支付密码'
					});
					return;
				}
				
				if (this.status) {
					this.status = 0;
					
					ajax({
						url: '/api/bangzhu/add',
						method: 'POST',
						data: {
							available: this.available,
							payword: this.payword,
							type: this.type
						},
						success: res => {
							
							this.status = 1;
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
							
							if (res.code === 0) {
								
								uni.redirectTo({
									url: '/pages/bangzhu/index'
								});
							}
						},
						fail: function(err) {
							this.status = 1;
							console.log('fail', err);
						}
					});
				}
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
	.form {
		
		padding-top: 50upx;
	}
	
	.select {
		margin-bottom: 50upx;
		padding: 0 30upx;
		
		justify-content: space-between;
		align-items:center;
	}
	
	.select .type {
		
		width: 48%;
		border: 1px solid $uni-border-color;
	}
	
	.select .checked {
		
		width: 48%;
		border: 1px solid #00C5CD;
		background: #00C5CD;
		color: #FFFFFF;
	}
	
	.title {
		text-align: center;
		padding-top: 20upx;
		font-size: $uni-font-size-lg;
		font-weight: bold;
	}
	
	.context {
		padding: 20upx 0;
		font-size: $uni-font-size-sm;
		text-align: center;
		color: red;
	}
	
	.input-row {
		
		justify-content: flex-end;
	}
	
	.input-row input {
		text-align: right;
	}
	
</style>