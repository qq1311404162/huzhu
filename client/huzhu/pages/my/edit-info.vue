<template>
	<view class="content">
		
		
		<view class="group">
			<uni-cell title="头像">
				<view slot="content">
					<view class="flex-row input-row">
						<sunsin-upimg v-if="infoState" type="avatar" :source="avatar" @getPic="getAvatar" />
					</view>
				</view>
			</uni-cell>
			
			<uni-cell title="手机号码">
				<view slot="content">
					<view class="flex-row input-row disable">
						<text>{{mobile}}</text>
					</view>
					
				</view>
			</uni-cell>
			
			<uni-cell title="真实姓名">
				<view slot="content">
					<view class="flex-row input-row disable">
						{{realname}}
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
						<sunsin-upimg v-if="infoState" type="wechat" :source="wechat_qrcode" @getPic="getWechat" />
					</view>
					
				</view>
			</uni-cell>
			
			<uni-cell title="支付宝收款码">
				<view slot="content">
					<view class="flex-row input-row">
						<sunsin-upimg v-if="infoState" type="alipay" :source="alipay_qrcode" @getPic="getAlipay" />
					</view>
					
				</view>
			</uni-cell>
			
		</view>
		
		<view class="btns">
			<button type="primary" class="primary" @tap="edit">修改</button>
		</view>
	</view>
</template>
<script>
import uniCell from '@/components/uni-cell/uni-cell.vue';
import sunsinUpimg from '@/components/sunsin-upimg/sunsin-upimg.vue';
import ajax from '@/utils/ajax';
import {getEditInfo} from '@/utils/api';

export default {
    components: {
        uniCell,
        sunsinUpimg
    },

    data() {
        return {
			infoState: false,
            avatar: '',
            mobile: '',
            realname: '',
            card_name: '',
            card_nums: '',
            wechat_qrcode: '',
            alipay_qrcode: ''
        };
    },
	created(){
		
		this.getEditInfo();
	},
	// #ifdef MP-WEIXIN
	onLoad() {
		this.getEditInfo();
	},
	// #endif
    methods: {
		getEditInfo(){
			
			getEditInfo().then((res) => {
				
				if (!res) return;
				
				this.infoState = true;
				
				this.avatar = res.avatar;
				this.mobile = res.mobile;
				this.realname = res.realname;
				this.card_name = res.card_name;
				this.card_nums = res.card_nums;
				this.wechat_qrcode = res.wechat_qrcode;
				this.alipay_qrcode = res.alipay_qrcode;
			});
		},
        getAvatar(pic) {
			console.log(JSON.stringify(pic));
            this.avatar = pic[0].path_server;
        },
        getWechat(pic) {
            this.wechat_qrcode = pic[0].path_server;
        },
        getAlipay(pic) {
            this.alipay_qrcode = pic[0].path_server;
        },
        edit() {
			
			if (this.card_name == '') {
				uni.showToast({
					icon: 'none',
					title: '银行名称不能为空'
				});
				return;
			}
			if (this.card_nums == '') {
				uni.showToast({
					icon: 'none',
					title: '银行卡号不能为空'
				});
				return;
			}
			
// 			ajax({
// 				url: '/api/edit-info',
// 				method: 'POST',
// 				data: {
// 					avatar: this.avatar,
// 					card_name: this.card_name,
// 					card_nums: this.card_nums,
// 					wechat_qrcode: this.wechat_qrcode,
// 					alipay_qrcode: this.alipay_qrcode
// 				},
// 				success: res => {
// 					
// 					uni.showToast({
// 						icon: 'none',
// 						title: res.msg
// 					});
// 					
// 					setTimeout(() => {
// 						
// 						if (res.code == 0) {
// 							
// 							uni.switchTab({
// 								url: '../index/my'
// 							});
// 							
// 						}
// 						
// 					}, 1000);
// 					
// 					
// 				},
// 				fail: function(err) {
// 					
// 					uni.showToast({
// 						icon: 'none',
// 						title: '修改用户信息失败'
// 					});
// 				}
// 			});
		}
    }
};
</script>
<style lang="scss">
@import '../../common/css/variables.scss';


.group {
	background: $uni-text-color-inverse;
	margin: 35upx 0;
}

.group .uni-cell:last-child .uni-cell__container::after {
	height: 0;
}

.vcode {
    line-height: 60upx;
    border-radius: $uni-border-radius-lg;
    padding: 0 25upx;
    border: 1upx solid $uni-border-color;
    margin-right: 10upx;
    font-size: $uni-font-size-sm;
}

.vcode:active {
    background: $uni-border-color;
	color: $uni-bg-color;
}

.flex-row {
	display: flex;
	flex-flow: row nowrap;
	
}

.input-row {
    justify-content: flex-end;
}

.input-row input {
    text-align: right;
	font-size: $uni-font-size-base;
	padding-right: 20upx;
}

.btns {
	margin: 50upx 10%;
}
</style>
