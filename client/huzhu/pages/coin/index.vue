<template>
	<view class="content">

		<view class="coin">
			当前剩余排单币个数：999
		</view>
		
		<uni-cell title="接收人">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入接受者用户名"/>
			</view>
		</uni-cell>
		
		<uni-cell title="排单币个数">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入排单币个数"/>
			</view>
		</uni-cell>
		<uni-cell title="支付密码">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入支付密码"/>
			</view>
		</uni-cell>
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="edit">赠送</button>
		</view>
		
		<view class="record">
			<text>使用记录</text>
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
				
			}
		},
		methods: {
			
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
		font-size: $uni-font-size-base;
	}
	
	.record {
		padding-top: 80upx;
		padding-right: 10upx;
		text-align: right;
		font-size: 28upx;
	}
</style>
