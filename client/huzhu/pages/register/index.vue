<template>
	<view class="content">
		
		<view class="group">
			<uni-cell title="用户名">
				<view slot="content">
					<view class="flex-row input-row">
						<input type="text" v-model="username" placeholder="请输入用户名"/>
					</view>
				</view>
			</uni-cell>
			
			<uni-cell title="上级推荐人">
				<view slot="content">
					<view v-if="!preState" class="flex-row input-row">
						<input type="text" v-model="prename" placeholder="请输入上级推荐人"/>
					</view>
					<view class="flex-row input-row" v-if="preState">
						<text>{{prename}}</text>
					</view>
				</view>
			</uni-cell>
			
			<uni-cell title="登录密码">
				<view slot="content">
					<view class="flex-row input-row">
						<input type="text" password v-model="password" placeholder="请输入登录密码"/>
					</view>
				</view>
			</uni-cell>
			
			<uni-cell title="确认密码">
				<view slot="content">
					<view class="flex-row input-row">
						<input type="text" password v-model="repassword" placeholder="请输入确认密码"/>
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
			
			<uni-cell title="手机号">
				<view slot="content">
					<view class="flex-row input-row">
						<input type="text" v-model="mobile" placeholder="请输入手机号"/>
					</view>
				</view>
			</uni-cell>
			
			<uni-cell title="验证码" is-right="true">
				<view slot="content">
					<input type="text" v-model="vcode" placeholder="请输入验证码"/>
				</view>
				<view slot="other">
					<text class="vcode">获取验证码</text>
				</view>
			</uni-cell>
		</view>
		
		<view class="btns">
			<button type="primary" class="register" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
import {registerInfo} from '@/utils/api';
import uniCell from '@/components/uni-cell/uni-cell.vue';

export default {
    components: {
        uniCell
    },
    data() {
        return {
            mobile: '',
            username: '',
            password: '',
            repassword: '',
            realname: '',
            prename: '',
            vcode: '',
			preState: false
        };
    },
	onLoad(options) {
		
		this.prename = options.prename || '';
		
		this.preState = (options.prename || '') ? true : false;
	},
    methods: {
        register() {
            if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
                uni.showToast({
                    icon: 'none',
                    title: '手机号格式不正确'
                });
                return;
            }
            if (!/[a-z0-9]/.test(this.username)) {
                uni.showToast({
                    icon: 'none',
                    title: '用户名只能使用小写字母和数字'
                });
                return;
            }
			if (this.username.length < 6) {
				uni.showToast({
					icon: 'none',
					title: '用户名不得低于6个字符'
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
			if (this.password !== this.repassword) {
				uni.showToast({
					icon: 'none',
					title: '确认密码不正确'
				});
				return;
			}
            if (!/^[\u4e00-\u9fa5]+$/.test(this.realname)) {
                uni.showToast({
                    icon: 'none',
                    title: '真实姓名不合法'
                });
                return;
            }


			registerInfo({
				username: this.username,
				password: this.password,
				repassword: this.repassword,
				mobile: this.mobile,
				realname: this.realname,
				prename: this.prename,
			});
 
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

.input-row {
    justify-content: flex-end;
}

.input-row input {
    text-align: right;
	font-size: $uni-font-size-base;
	padding-right: 20upx;
}

.btns {
	margin: 0 10%;
}
</style>
