<template>
	<view class="content">
		
		<uni-cell title="用户名">
			<view class="" slot="content">
				<input type="text" v-model="username" placeholder="请输入用户名"/>
			</view>
		</uni-cell>
		
		<uni-cell title="上级推荐人">
			<view class="" slot="content">
				<input type="text" v-model="prename" placeholder="请输入上级推荐人"/>
			</view>
		</uni-cell>
		
		<uni-cell title="登录密码">
			<view class="" slot="content">
				<input type="text" password v-model="password" placeholder="请输入登录密码"/>
			</view>
		</uni-cell>
		
		<uni-cell title="确认密码">
			<view class="" slot="content">
				<input type="text" password v-model="repassword" placeholder="请输入确认密码"/>
			</view>
		</uni-cell>
		
		<uni-cell title="真实姓名">
			<view class="" slot="content">
				<input type="text" v-model="realname" placeholder="请输入真实姓名"/>
			</view>
		</uni-cell>
		
		<uni-cell title="手机号">
			<view class="" slot="content">
				<input type="text" v-model="mobile" placeholder="请输入手机号"/>
			</view>
		</uni-cell>
		
		<uni-cell is-right="true">
			<view class="" slot="content">
				<input type="text" v-model="vcode" placeholder="请输入验证码"/>
			</view>
			<view class="" slot="other">
				<text class="vcode">获取验证码</text>
			</view>
		</uni-cell>
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
import ajax from '../../utils/ajax.js';
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
            vcode: ''
        };
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


            ajax({
                url: '/api/register',
                method: 'POST',
                data: {
					username: this.username,
					password: this.password,
					repassword: this.repassword,
					mobile: this.mobile,
					realname: this.realname
				},
                success: res => {
					
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
					
					if (res.code === 0) {
						
						uni.redirectTo({
							url: '../login/index'
						});
					}
                },
                fail: function(err) {
					
                    uni.showToast({
                    	icon: 'none',
                    	title: '用户登录失败'
                    });
                }
            });
 
        }
    }
};
</script>

<style>
@import '../../common/css/common.css';

.vcode {
    line-height: 60upx;
    border-radius: 25upx;
    padding: 0 25upx;
    border: 1upx solid #999;
    margin-right: 10upx;
    font-size: 25upx;
}

.vcode:active {
    background: #adadad;
}
</style>
