<template>
	<view class="content">
		<view class="flex-row wallets">
			<view>
				<image class="icon" src="../../static/dynamic.png" mode=""></image>
				<text class="title">动态钱包</text>
				<text class="value"><text>{{dynamic_wallet}}</text>MYB</text>
			</view>
			<view>
				<image class="icon" src="../../static/static.png" mode=""></image>
				<text class="title">静态钱包</text>
				<text class="value"><text>{{static_wallet}}</text>MYB</text>
			</view>
			<view>
				<image class="icon" src="../../static/team.png" mode=""></image>
				<text class="title">我的团队</text>
				<text class="value"><text>{{count}}</text>人</text>
			</view>
		</view>
		
		<view class="flex-row pai">
			<button type="primary" @click="gotoBangzhu()">
				<image src="../../static/folder_in.png" class="btn-icon" mode=""></image>
				<text>帮助</text>
			</button>
			<button type="primary" @click="gotoQizhu()">
				<image src="../../static/folder_out.png" class="btn-icon" mode=""></image>
				<text>求助</text>
			</button>
		</view>
		
		<!-- <view class="flex-row list">
			<view>
				<image class="list-icon" src="../../static/pai_gold.png" mode=""></image>
				<text class="title">排单币</text>
			</view>
			<view>
				<image class="list-icon" src="../../static/active_code.png" mode=""></image>
				<text class="title">激活码</text>
			</view>
			<view>
				<image class="list-icon" src="../../static/my_rate.png" mode=""></image>
				<text class="title">我的收益</text>
			</view>
		</view> -->
		<view class="flex-row list">
			<view>
				<image class="list-icon" src="../../static/static_rate.png" mode=""></image>
				<text class="title">静态收益</text>
			</view>
			<view>
				<image class="list-icon" src="../../static/dynamic_rate.png" mode=""></image>
				<text class="title">动态收益</text>
			</view>
			<view>
				<image class="list-icon" src="../../static/my_tg.png" mode=""></image>
				<text class="title">我的团队</text>
			</view>
		</view>
		<view class="flex-row list">
			<view @click="gotoRegister()">
				<image class="list-icon" src="../../static/register.png" mode=""></image>
				<text class="title">代注册</text>
			</view>
			<view @click="gotoCoin()">
				<image class="list-icon" src="../../static/pai_gold.png" mode=""></image>
				<text class="title">排单币</text>
			</view>
			<view @click="gotoActivation()">
				<image class="list-icon" src="../../static/active_code.png" mode=""></image>
				<text class="title">激活码</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getUserIndex} from '@/utils/api';
	
	
	export default {

		data(){
			
			return {
				username: '',
				static_wallet: '0.00',
				dynamic_wallet: '0.00',
				count: 0
			};
		},
// 		onLoad() {
// 
// 			this.getInfo();
// 		},
		onShow() {
			this.getInfo();
			
		},
		methods:{
			getInfo(){
				
				getUserIndex().then(res => {

					if (res) {
						this.username = res.username || '';
						this.static_wallet = res.static_wallet || '0.00';
						this.dynamic_wallet = res.dynamic_wallet || '0.00';
						this.count = res.count || 0;
					}
					
				});

			},
			gotoRegister(){
				this.goto('../register/index?prename=' + this.username);
			},
			gotoBangzhu() {
				
				this.goto('../bangzhu/index')
			},
			gotoQizhu() {
				
				this.goto('../qiuzhu/index')
			},
			gotoCoin(){
				this.goto('../coin/index')
			},
			gotoActivation(){
				this.goto('../activation/index');
			},
			goto(url) {
				
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style>
	
	@import '../../common/css/common.css';
	
	.wallets {
		
		justify-content: space-between;
		padding-top: 45px;
	}
	
	.wallets view, .list view {
		
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
	}
	
	.wallets view .value {
		
		font-size: 26upx;

		
	}
	
	.wallets view .value text {

		color: red;
		margin-right: 10upx;
		
	}
	
	.wallets view .title {
		
		font-size: 30upx;
		padding-top: 25upx;
		font-weight: bold;
	}
	
	.icon {
		
		display: inline-block;
		width: 100upx;
		height: 100upx;
	}
	
	.pai {
		
		justify-content: space-between;
		padding-top: 45px;
		padding-bottom: 15upx;
	}
	
	.pai button {
		width: 38%;
		font-size: 35upx;
	}
	
	.btn-icon {
		display: inline-block;
		height: 35upx;
		width: 35upx;
		margin-right: 20upx;
	}
	
	.list {
		
		border-bottom: 4upx solid #f5f5f5;
		padding: 45upx 0;
		justify-content: space-between;
		
	}
	
	.list:last-child {
		border: none;
	}
	
	.list-icon {
		display: inline-block;
		width: 70upx;
		height: 70upx;
		padding-bottom: 15upx;
	}
	
	.list view text {
		font-size: 30upx;
		letter-spacing: 5upx;
		/* padding-left: 10upx; */
	}
	
</style>
