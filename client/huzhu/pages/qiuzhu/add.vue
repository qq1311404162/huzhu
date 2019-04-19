<template>
	<view class="content">
		<view class="form">
			<view class="segment">
				<uni-segmented-control :current="type" :values="items" @clickItem="selectType" style-type="button"></uni-segmented-control>
			</view>
			<view class="desc-group">
				<view class="flex-row desc">
					<text>钱包金额：</text>
					<text>￥{{walletValue}}</text>
				</view>
				<view class="flex-row desc">
					<text>最低提现金额：</text>
					<text>￥{{minValue}}</text>
				</view>
				<view class="flex-row desc">
					<text>提现金额基数：</text>
					<text>￥{{mulValue}}</text>
				</view>
				
			</view>
			<uni-cell title="提现金额">
				<view slot="content">
					<view class="flex-row input-row">
						<input type="text" v-model="amount" placeholder="请输入提现金额"/>
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
			
			<view class="btns">
				<button type="primary" class="primary" @tap="submit">开始求助</button>
			</view>
			
		</view>
		<mpvue-picker ref="mpvuePicker" mode="selector" deepLength="1" :pickerValueDefault="pickerValueDefault"
		@onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import uniCell from '@/components/uni-cell/uni-cell.vue';
	
	import {getQiuzhuAvailable, qiuzhuAdd} from '@/utils/api';
	
	export default {
		components: {
			uniSegmentedControl,
			mpvuePicker,
			uniCell
		},
		data(){
			
			return {
				items: [{type: 1, name: '静态钱包'}, {type: 2, name: '动态钱包'}],
				amount: '',
				payword: '',
				type: 1,
				setting: {},
				static_wallet: '0.00',
				dynamic_wallet: '0.00',
				status: 1,
			};
		},
		onLoad() {
			// 获取帮助金额
			this.userAvailable();
		},
		computed: {
			walletValue(){
				
				return this.type === 1 ? this.static_wallet : this.dynamic_wallet;
			},
			minValue(){
				
				return this.type === 1 ? (this.setting.static_wallet_base || 0) : (this.setting.dynamic_wallet_base || 0);
			},
			mulValue(){
				
				return this.type === 1 ? (this.setting.static_wallet_mul || 0) : (this.setting.dynamic_wallet_mul || 0);
			}
		},
		methods:{
			userAvailable(){
				
				getQiuzhuAvailable().then(res => {
					
					if (!res) return;
					
					this.setting = res.setting;
					this.static_wallet = res.user.static_wallet;
					this.dynamic_wallet = res.user.dynamic_wallet;
				});
			},
			selectType(item) {
				if (this.type !== item.type) {
					this.type = item.type;
				}
			},
			
			submit(){
				
				if (this.type == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择帮助类型'
					});
					return;
				}
				
				if (!/^\+?[1-9][0-9]*$/.test(this.amount)) {
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
					
					qiuzhuAdd({
							amount: this.amount,
							payword: this.payword,
							type: this.type
						}).then(() => {
						
						this.status = 1;
					});
				}
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
	
	.segment {
		margin-bottom: 50upx;
	}
	
	.desc-group {
		
		padding: 0 25%;
		margin-bottom: 30upx;
	}
	.desc {
		justify-content: space-between;
		font-size: $uni-font-size-sm;
		line-height: 1.6;
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
	
	.btns {
		width: 80%;
		margin: 10% auto 0 auto;
		padding-bottom: 50upx;
	}
	
</style>