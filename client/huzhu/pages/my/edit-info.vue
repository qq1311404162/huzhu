<template>
	<view class="content">
		
		<uni-cell title="头像">
			<view class="" slot="content">
				<input type="text" v-model="mobile" placeholder="请输入手机号码"/>
			</view>
		</uni-cell>
		
		<uni-cell title="手机号码">
			<view class="" slot="content">
				<input type="text" v-model="mobile" placeholder="请输入手机号码"/>
			</view>
		</uni-cell>
		
		<uni-cell title="真实姓名">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入真实姓名"/>
			</view>
		</uni-cell>
		
		<uni-cell title="银行名称">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入银行名称"/>
			</view>
		</uni-cell>
		
		<uni-cell title="银行卡号">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入银行卡号"/>
			</view>
		</uni-cell>
		
		<uni-cell title="微信收款码">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入银行卡号"/>
			</view>
		</uni-cell>
		
		<uni-cell title="支付宝收款码">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入银行卡号"/>
			</view>
		</uni-cell>
		
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="edit">修改</button>
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
				avatar: '',
				mobile: '',
				realname: '',
				card_name: '',
				card_nums: '',
				wechat_qrcode: '',
				alipay_qrcode: ''
			};
		}
	}
</script>
<style>
	
	@import '../../common/css/common.css';
	
	.input-row input {
		text-align: right;
	}
	
	.img {
		
		line-height: 200upx;
		height: 200upx;
	}
	
	
</style>