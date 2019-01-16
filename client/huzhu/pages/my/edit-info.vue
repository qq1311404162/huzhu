<template>
	<view class="content">
		
		<uni-cell title="头像">
			<view slot="content">
				<view class="flex-row input-row" @click="uploadImg()">
					<image :src="image" mode=""></image>
					<text>aaaaa</text>
				</view>
			</view>
		</uni-cell>
		
		<uni-cell title="手机号码">
			<view slot="content">
				<view class="flex-row input-row">
					<input type="text" v-model="mobile" placeholder="请输入手机号码"/>
				</view>
				
			</view>
		</uni-cell>
		
		<uni-cell title="真实姓名">
			<view slot="content">
				<view class="flex-row input-row">
					<input type="text" v-model="realname" placeholder="请输入真实姓名"/>
				</view>
				
			</view>
		</uni-cell>
		
		<uni-cell title="银行名称">
			<view slot="content">
				<view class="flex-row input-row">
					<input type="text" v-model="card_name" placeholder="请输入银行名称"/>
				</view>
				
			</view>
		</uni-cell>
		
		<uni-cell title="银行卡号">
			<view slot="content">
				<view class="flex-row input-row">
					<input type="text" v-model="card_nums" placeholder="请输入银行卡号"/>
				</view>
				
			</view>
		</uni-cell>
		
		<uni-cell title="微信收款码">
			<view slot="content">
				<view class="flex-row input-row">
					<sunsin-upimg :count="1" :autoup="false" />
				</view>
				
			</view>
		</uni-cell>
		
		<uni-cell title="支付宝收款码">
			<view slot="content">
				<view class="flex-row input-row">
					<sunsin-upimg :count="1" :autoup="false" />
				</view>
				
			</view>
		</uni-cell>
		
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="edit">修改</button>
		</view>
	</view>
</template>
<script>
	
	import uniCell from '@/components/uni-cell/uni-cell.vue';
	import sunsinUpimg from '@/components/sunsin-upimg/sunsin-upimg.vue'
	
	
	export default {
		components: {
			uniCell,
			sunsinUpimg
		},
		
		data() {
			
			return {
				avatar: '',
				mobile: '',
				realname: '',
				card_name: '',
				card_nums: '',
				wechat_qrcode: '',
				alipay_qrcode: '',
				image: '',
			};
		},
		methods:{
			uploadImg(){
				let _this = this;
				let token = uni.getStorageSync('token') || '';
				
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: ['album', 'camera'],
					success(res) {
						
						console.log(res);
						
						uni.uploadFile({
							
							url: 'http://hz.menguang.vip/api/upload',
							filePath: res.tempFiles[0].path,
							name: 'file',
							header: {
								'Authorization': token
							},
							formData: {
								'type': 'avatar'
							},
							success(res) {
								
								let data = JSON.parse(res.data);

								_this.image = 'http://hz.menguang.vip' + data.data.file
							}
					});
					}
				});
				
				
			}
		}
	}
</script>
<style>
	
	@import '../../common/css/common.css';
	
	.input-row {
		
		justify-content: flex-end;
	}
	
	.input-row input {
		text-align: right;
	}
	
	
	
</style>