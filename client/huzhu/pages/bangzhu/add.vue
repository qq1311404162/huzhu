<template>
	<view class="content">
		<view class="form">
			<view class="segment">
				<uni-segmented-control :current="type" :values="items" @clickItem="selectType" style-type="button"></uni-segmented-control>
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
			
			<view class="btns">
				<button type="primary" class="primary" @tap="submit">确定帮助</button>
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
	
	import {getBangzhuAvailable, bangzhuAdd} from '@/utils/api';
	
	export default {
		components: {
			uniSegmentedControl,
			mpvuePicker,
			uniCell
		},
		data(){
			
			return {
				items: [{type: 1, name: '自身额度'}, {type: 2, name: '用户赠送'}],
				pickerValueDefault: [0],
				pickerValueArray:[],
				amount: 0,
				payword: '',
				type: 1,
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
				
				getBangzhuAvailable().then((res) => {
					
					if (!res) return;
					
					for (let i = 1; i <= (res.user.available || 1); i++) {
						this.pickerValueArray.push({
							label: parseInt(res.setting.value) * i,
							value: i
						});
					}
				});
				
			},
			selectType(item) {
				if (this.type !== item.type) {
					this.type = item.type;
				}
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
					
					bangzhuAdd({
							available: this.available,
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