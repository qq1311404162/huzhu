<template>
    <view class="content">
        <view class="input-group mt20">
			<view class="input-row border">
			</view>
            <view class="input-row border">
                <text class="title">手机号：</text>
                <input type="text" v-model="mobile" placeholder="请输入手机号">
            </view>
            <view class="input-row border">
                <text class="title">密码：</text>
                <input type="text" password="true" v-model="password" placeholder="请输入密码">
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="bindLogin">登录</button>
        </view>
        <view class="action-row">
            <navigator url="../register/index">注册账号</navigator>
            <text>|</text>
            <navigator url="../pwd/pwd">忘记密码</navigator>
        </view>
        
    </view>
</template>

<script>
import { userLogin } from '@/utils/api';

export default {
    data() {
        return {
            mobile: '',
            password: ''
        };
    },
    methods: {
        initPosition() {
            /**
             * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
             * 反向使用 top 进行定位，可以避免此问题。
             */
            this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
        },
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
	create() {
		this.initPosition();
	},
};
</script>

<style>
@import '../../common/css/form.css';
@import '../../common/css/common.css';

.action-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 25upx;
}

.action-row navigator {
    color: #007aff;
    padding: 0 20px;
}

.oauth-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.oauth-image {
    width: 100px;
    height: 100px;
    border: 1px solid #dddddd;
    border-radius: 100px;
    margin: 0 40px;
    background-color: #ffffff;
}

.oauth-image image {
    width: 60px;
    height: 60px;
    margin: 20px;
}
</style>
