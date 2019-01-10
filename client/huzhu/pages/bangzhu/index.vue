<template>
	<view class="content">
		<view class="segment">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button"></uni-segmented-control>
		</view>
		<view class="form">
			<view v-show="current === 0">
				<text>您今日已帮助过别人</text>
			</view>
			
			<view v-show="current === 1">
				<text>您本月剩余可用次数为：11</text>
			</view>
			
			<uni-cell title="帮助金额">
				<view slot="content">
					<view class="flex-row input-row" @click="openPick()">
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
			
			<view class="record">
				<text>帮助记录</text>
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
	import ajax from '@/utils/ajax';

	export default {
		components: {
			uniSegmentedControl,
			mpvuePicker,
			uniCell
		},
		onLoad() {
			// 获取帮助金额
			this.userAvailable();
		},
		data() {
			return {
				items: ['额度帮助', '赠送帮助'],
				current: 0,
				amount: 0,
				available: 0,
				payword: '',
				pickerValueDefault: [0],
				pickerValueArray:[]
			}
		},
		computed: {
			bangzhuAmount(){
				
				return this.amount == 0 ? '请选择帮助金额' : this.amount;
			},
		},
		methods: {
			userAvailable(){
				ajax({
					url: '/api/user-available',
					success: res => {
						
						for (let i = 1; i <= (res.data.available || 1); i++) {
							
							this.pickerValueArray.push({
								label: parseInt(res.data.unit) * i,
								value: i
							});
						}
					},
					fail: function(err) {
						console.log('fail', err);
					}
				});
			},
			openPick(){
				this.$refs.mpvuePicker.show();
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			onConfirm(e) {
				
				this.amount = e.label;
				this.available = e.value[0];
			},
			onCancel(e) {
				console.log(e)
			},
		}
	}
</script>
<style>
	
	@import '../../common/css/common.css';
	
	.content {
		
		padding: 0 30upx;
	}
	
	.segment {
		padding: 50upx 0;
	}
	
	.form {
		
		padding-top: 50upx;
	}
	
	.record {
		padding-top: 80upx;
		padding-right: 10upx;
		text-align: right;
		font-size: 28upx;
	}
	
	.input-row {
		
		justify-content: flex-end;
	}
	
	.input-row input {
		text-align: right;
	}
</style>
