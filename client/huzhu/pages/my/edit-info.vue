<template>
	<view class="content">
		
		<uni-cell title="头像">
			<view slot="content">
				<view class="flex-row input-row">
					<sunsin-upimg type="avatar" :source="avatar" @getPic="getAvatar" />
				</view>
			</view>
		</uni-cell>
		
		<uni-cell title="手机号码">
			<view slot="content">
				<view class="flex-row input-row">
					<text>{{mpbile}}</text>
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
					<sunsin-upimg type="wechat" :source="wechat_qrcode" @getPic="getWechat" />
				</view>
				
			</view>
		</uni-cell>
		
		<uni-cell title="支付宝收款码">
			<view slot="content">
				<view class="flex-row input-row">
					<sunsin-upimg type="alipay" :source="alipay_qrcode" @getPic="getAlipay" />
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
					
					this.avatar = res.data.avatar;
					this.mobile = res.data.mobile;
					this.realname = res.data.realname;
					this.card_name = res.data.team.card_name;
					this.card_num = res.data.team.card_num;
					this.wechat_qrcode = res.data.team.wechat_qrcode;
					this.alipay_qrcode = res.data.team.alipay_qrcode;
				},
				fail: function(err) {
					console.log('fail', err);
				}
			});
		},
        getAvatar(pic) {
            this.avatar = pic.path_server;
        },
        getWechat(pic) {
            this.wechat_qrcode = pic.path_server;
        },
        getAlipay(pic) {
            this.alipay_qrcode = pic.path_server;
        },
        edit() {
			
			if (this.username.length < 6) {
				uni.showToast({
					icon: 'none',
					title: '用户名不得低于6个字符'
				});
				return;
			}
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
