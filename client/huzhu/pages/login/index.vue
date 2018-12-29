<template>
    <view class="content">
        <view class="input-group mt20">
			<view class="input-row border">
			</view>
            <view class="input-row border">
                <text class="title">账号：</text>
                <input type="text" v-model="username" placeholder="请输入账号">
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
    
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
                providerList: [],
                hasProvider: false,
                username: '',
                password: '',
                positionTop: 0
            }
        },
        computed: mapState(['forcedLogin']),
        methods: {
            ...mapMutations(['login']),
            
            initPosition() {
                /**
                 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
                 * 反向使用 top 进行定位，可以避免此问题。
                 */
                this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
            },
            bindLogin() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (this.username.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
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
                /**
                 * 下面简单模拟下服务端的处理
                 * 检测用户账号密码是否在已注册的用户列表中
                 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
                 */
                const data = {
                    username: this.username,
                    password: this.password
                };
				let user = JSON.parse(uni.getStorageSync('user'));
				
                const validUser = (function (user) {
                    return data.username === user.username && data.password === user.password;
                });
                if (validUser) {
                    this.toMain(this.username);
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '用户账号或密码不正确',
                    });
                }
            },
            toMain(userName) {
                this.login(userName);
                /**
                 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../index/index',
                    });
                } else {
                    uni.navigateBack();
                }

            }
        },
        onLoad() {
            this.initPosition();
            // this.initProvider();
        }
    }
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
