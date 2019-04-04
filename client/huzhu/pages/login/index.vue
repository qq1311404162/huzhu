<template>
    <view class="content">
		
		<view class="group mt20">
			<view class="row row-border">
				<input type="text" v-model="mobile" placeholder="请输入手机号">
			</view>
			<view class="row">
				<input type="text" password="true" v-model="password" placeholder="请输入密码">
			</view>
		</view>
		
		<view class="group">
			<view class="row">
				<button type="primary" class="login-btn" @tap="bindLogin">登录</button>
			</view>
			<view class="row navigate">
				<navigator url="../register/index">注册账号</navigator>
				<navigator url="../pwd/pwd">忘记密码</navigator>
			</view>
		</view>
        
    </view>
</template>

<script>
import { userLogin } from '@/utils/api';
import { getStorage, gotoIndex } from '@/utils/unis';

export default {
    data() {
        return {
            mobile: '',
            password: ''
        };
    },
    methods: {
        
        bindLogin() {
            if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
                uni.showToast({
                    icon: 'none',
                    title: '手机号格式不正确'
                });
                return;
            }

            if (this.password.length < 6) {
                uni.showToast({
                    icon: 'none',
                    title: '密码最短为 6 个字符'
                });
                return;
            }
			
			userLogin({
				mobile: this.mobile,
				password: this.password
			});

        },
        toMain(userName) {
            this.login(userName);
            /**
             * 强制登录时使用reLaunch方式跳转过来
             * 返回首页也使用reLaunch方式
             */
            if (this.forcedLogin) {
                uni.reLaunch({
                    url: '../index/index'
                });
            } else {
                uni.navigateBack();
            }
        }
    },
	beforeCreate() {
		let token = getStorage();

		if (token) gotoIndex();
	},
	created() {
		
	},
};
</script>

<style lang="scss">

@import '../../common/css/variables.scss';


.group {
	background: $uni-text-color-inverse;
	margin: 35upx 20upx 0;
}
.mt20 {
	margin-top: 20%;
}
.row {
	padding: 20upx;
}
.row-border {
	border-bottom: 2upx solid $uni-bg-color-grey;
}

.row input {
	height: 40upx;
	line-height: 70upx;
	padding-left: 10upx;
	padding: 15upx 10upx;
	font-size: $uni-font-size-base;
}
.login-btn {
	width: 80%;
	margin: auto;
	border-radius: $uni-border-radius-base;
}
.navigate {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	margin: 0 10%;
	font-size: $uni-font-size-sm;
}
</style>
