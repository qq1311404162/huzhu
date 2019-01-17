<template>
	<view class="content">
		
		<uni-cell title="头像">
			<view slot="content">
				<view class="flex-row input-row">
					<sunsin-upimg v-if="infoState" type="avatar" :source="avatar" @getPic="getAvatar" />
				</view>
			</view>
		</uni-cell>
		
		<uni-cell title="手机号码">
			<view slot="content">
				<view class="flex-row input-row">
					<text>{{mobile}}</text>
				</view>
				
			</view>
		</uni-cell>
		
		<uni-cell title="真实姓名">
			<view slot="content">
				<view class="flex-row input-row">
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
		
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="edit">修改</button>
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
	onLoad(){
		
		this.getUserInfo();
	},
    methods: {
		getUserInfo(){
			
			ajax({
				url: '/api/edit-info',
				data: {},
				success: res => {
					
					this.infoState = true;
					
					this.avatar = res.data.avatar;
					this.mobile = res.data.mobile;
					this.realname = res.data.realname;
					this.card_name = res.data.card_name;
					this.card_nums = res.data.card_nums;
					this.wechat_qrcode = res.data.wechat_qrcode;
					this.alipay_qrcode = res.data.alipay_qrcode;
				},
				fail: function(err) {
					console.log('fail', err);
				}
			});
		},
        getAvatar(pic) {
			console.log(pic);
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
			
			ajax({
				url: '/api/edit-info',
				method: 'POST',
				data: {
					avatar: this.avatar,
					card_name: this.card_name,
					card_nums: this.card_nums,
					wechat_qrcode: this.wechat_qrcode,
					alipay_qrcode: this.alipay_qrcode
				},
				success: res => {
					
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
					
					setTimeout(() => {
						
						if (res.code == 0) {
							
							uni.switchTab({
								url: '../index/my'
							});
							
						}
						
					}, 1000);
					
					
				},
				fail: function(err) {
					
					uni.showToast({
						icon: 'none',
						title: '修改用户信息失败'
					});
				}
			});
		}
    }
};
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
