<template>
	<view class="content">
		<view class="segment">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button"></uni-segmented-control>
		</view>
		<view class="form">
			<view v-show="current === 0">
				<text>静态钱包余额</text>
			</view>
			
			<view v-show="current === 1">
				<text>动态钱包余额</text>
			</view>
			
			<uni-cell title="求助金额">
				<view class="" slot="content">
					<input type="text" v-model="realname" placeholder="请输入旧密码"/>
				</view>
			</uni-cell>
			
			<uni-cell title="交易密码">
				<view class="" slot="content">
					<input type="text" v-model="realname" placeholder="请输入交易密码"/>
				</view>
			</uni-cell>
			
			<view class="btn-row">
				<button type="primary" class="primary" @tap="edit">修改</button>
			</view>
			
			<view class="record">
				<text>求助记录</text>
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

	export default {
		components: {
			uniSegmentedControl,
			mpvuePicker,
			uniCell
		},
		onShow() {
			// this.$refs.mpvuePicker.show();
		},
		data() {
			return {
				items: ['静态钱包', '动态钱包'],
				current: 0,
				pickerValueDefault: [0],
				pickerValueArray:[{
						label: '中国',
						value: 1
					},
					{
						label: '俄罗斯',
						value: 2
					},
					{
						label: '美国',
						value: 3
					},
					{
						label: '日本',
						value: 4
					}]
			}
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			onConfirm(e) {
				console.log(e);
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
</style>
