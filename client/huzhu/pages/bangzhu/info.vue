<template>
	<view class="content">
		<view>
			<uni-cell title="匹配金额">
				<view slot="content">
					<view class="flex-row input-row disable"> <text>￥{{amountDesc}}</text> </view>
				</view>
			</uni-cell>
			<uni-cell title="用户手机号">
				<view slot="content">
					<view class="flex-row input-row disable"> <text>{{mobile}}</text> </view>
				</view>
			</uni-cell>
			<uni-cell title="用户银行名称">
				<view slot="content">
					<view class="flex-row input-row disable"> <text>{{card_name}}</text> </view>
				</view>
			</uni-cell>
			<uni-cell title="银行卡号">
				<view slot="content">
					<view class="flex-row input-row disable"> <text>{{card_nums}}</text> </view>
				</view>
			</uni-cell>
			<uni-cell title="支付宝付款码" v-if="alipay_qrcode">
				<view slot="content">
					<view class="flex-row input-row disable">
						<image
							class="img"
							:src="alipay_qrcode"
							mode="aspectFill"
							@click="showPic(alipay_qrcode)"
						></image>
					</view>
				</view>
			</uni-cell>
			<uni-cell title="微信付款码" v-if="wechat_qrcode">
				<view slot="content">
					<view class="flex-row input-row disable">
						<image
							class="img"
							:src="wechat_qrcode"
							mode="aspectFill"
							@click="showPic(wechat_qrcode)"
						></image>
					</view>
				</view>
			</uni-cell>
			<uni-cell title="打款截图">
				<view slot="content">
					<view class="flex-row input-row">
						<sunsin-upimg v-if="state == 1" type="pay" @getPic="getPay" />
						<image v-if="state > 1 && state != 9" class="img" :src="pic" mode="aspectFill" @click="showPic(pic)"></image>
					</view>
				</view>
			</uni-cell>
			
			<view class="btn-row" v-if="state == 1">
				<button type="primary" class="primary" @tap="submit">上传</button>
			</view>
		</view>

		<view class="flex-row show-pic" v-if="showPicStatus" @click="closePic">
			<image :src="showPicSrc"></image>
		</view>
	</view>
</template>
<script>
import uniCell from '@/components/uni-cell/uni-cell.vue';
import sunsinUpimg from '@/components/sunsin-upimg/sunsin-upimg.vue';
import ajax from '@/utils/ajax';

export default {
	components: {
		uniCell,
		sunsinUpimg
	},
	data() {
		return {
			id: 0,
			showPicStatus: false,
			showPicSrc: '',
			pic: '',
			amount: '',
			mobile: '',
			card_name: '',
			card_nums: '',
			alipay_qrcode: '',
			wechat_qrcode: '',
			state: 0,
		};
	},
	computed: {
		amountDesc(){
			
			return this.amount || '0.00';
		}
	},
	onLoad(option) {
		this.id = option.id;
		
		this.getInfo(this.id);
	},
	methods: {
		getInfo(id) {
			ajax({
				url: '/api/bangzhu/info',
				data: {
					id: id
				},
				success: res => {
					
					console.log(res);
					this.amount = res.data.qiuzhu_info.amount || '';
					this.mobile = res.data.qiuzhu_info.qiuzhu.user.mobile || '';
					this.card_name = res.data.qiuzhu_info.qiuzhu.user.card_name || '';
					this.card_nums = res.data.qiuzhu_info.qiuzhu.user.card_nums || '';
					this.alipay_qrcode = res.data.qiuzhu_info.qiuzhu.user.alipay_qrcode || '';
					this.wechat_qrcode = res.data.qiuzhu_info.qiuzhu.user.wechat_qrcode || '';
					this.state = res.data.qiuzhu_info.state;
					this.pic = res.data.pic || '';
					

				},
				fail: function(err) {
					console.log('fail', err);
				}
			});
		},
		showPic(value) {
			this.showPicStatus = true;
			this.showPicSrc = value;
		},
		closePic() {
			this.showPicStatus = false;
			this.showPicSrc = '';
		},
		getPay(pic){
			this.pic = pic[0].path_server;
		},
		submit(){
			
			if (this.pic == '') {
				uni.showToast({
					icon: 'none',
					title: '请先上传打款截图'
				});
				return;
			}
			if (this.id == 0) {
				uni.showToast({
					icon: 'none',
					title: '匹配信息获取失败'
				});
				return;
			}
			
			ajax({
				url: '/api/bangzhu/info',
				method: 'POST',
				data: {
					bang_qiu_id: this.id,
					pic: this.pic,
				},
				success: res => {
					
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
					
					setTimeout(() => {
						
						if (res.code == 0) {
							
							uni.navigateBack();
							
						}
						
					}, 1000);
					
					
				},
				fail: function(err) {
					
					uni.showToast({
						icon: 'none',
						title: '修改信息失败'
					});
				}
			});
		}
	}
};
</script>
<style>
@import '../../common/css/common.css';

.content {
	padding: 0 30upx;
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

.img {
	margin-top: 2%;
	margin-left: 2%;
	width: 150upx;
	height: 150upx;
	line-height: 95%;
	text-align: center;
	cursor: pointer;
	border-radius: 10upx;
}

.show-pic {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: #000000;
	/* opacity: 0.65; */
	z-index: 10;

	align-items: center;
}

.show-pic image {
	width: 100%;
}
</style>
