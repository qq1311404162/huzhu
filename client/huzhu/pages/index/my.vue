<template>
	<view class="content">
		<view class="top1 user-info" @click="activation()">
			<view class="user-left">
				<image :src="avatar" mode="aspectFill"></image>
				<text class="name">{{realname}}</text>
			</view>
			<view class="user-right">
				<text v-if="state == 0">未激活</text>
				<text v-else>{{team}}</text>
				<uni-icon v-if="state == 0" color="#bbb" size="20" type="arrowright"></uni-icon>
			</view>
			
		</view>
		
		<uni-list>			
			<uni-list-item title="个人资料" @click="goto('edit-info')"></uni-list-item>
			<uni-list-item title="修改密码" @click="goto('edit-pwd')"></uni-list-item>
			<uni-list-item title="修改交易密码" @click="goto('edit-payword')"></uni-list-item>
		</uni-list>
		
		<uni-list>
			<uni-list-item title="帮助记录" @click="goto('index', 'bangzhu')"></uni-list-item>
			<uni-list-item title="求助记录" @click="goto('index', 'qiuzhu')"></uni-list-item>
		</uni-list>
		
		<uni-list>
			<uni-list-item title="代注册" @click="toRegister"></uni-list-item>
			<uni-list-item title="我的推广"></uni-list-item>
			<uni-list-item title="我的团队"></uni-list-item>
		</uni-list>
		
		<view class="btns">
			<button type="primary" class="submit" @click="logout()">退出登录</button>
		</view>
	</view>
</template>
<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import {getUserInfo, Activation, doLogout} from '@/utils/api';

export default {
    components: {
        uniList,
        uniListItem,
		uniIcon
    },
    data() {
        return {
            avatar: '',
            realname: '',
			username: '',
            team: '',
            state: 0
        };
    },
    onLoad() {
		
        this.getInfo();
		
    },
    methods: {
        // 获取个人信息
        getInfo() {
			
			getUserInfo().then(res => {
				console.log(JSON.stringify(res));
				if (!res) return;
				
				this.realname = res.realname;
				this.username = res.username;
				this.avatar =
				    res.avatar == '' ? '../../static/my-0.png' : res.avatar;
				this.state = res.state;
				this.team = res.team.name;
				
			});
        },
        // 跳转到指定页面
        goto(url, preurl = 'my') {
            uni.navigateTo({
                url: '../' + preurl + '/' + url
            });
        },
		// 代注册跳转
		toRegister(){
			this.goto('index?prename=' + this.username, 'register');
		},
        // 激活账户
        activation() {
			
			if (this.state === 0) {
				Activation().then((res) => {
					
					if (!res) return;
					
					if (res.code === 0)
						this.state = 1;
				})
			}

        },
		logout(){
			
			doLogout();
			
		}
    }
};
</script>
<style lang="scss">
@import '../../common/css/variables.scss';

.top1 {
	margin-top: 1upx;
}

.user-info {
	display: flex;
	flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
	background: $uni-text-color-inverse;
	padding: 30upx;
	margin-bottom: 30upx;
	
	&:active {
		background: $uni-bg-color-grey;
	}
}

.user-left {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	
}
.user-left image {
    width: 80upx;
    height: 80upx;
	border-radius: 50%;
	margin-right: 20upx;
}

.user-left text {
    font-size: $uni-font-size-lg;
}

.user-right text {
	font-size: $uni-font-size-base;
	margin-right: 10upx;
	color: $uni-color-error;
}
.uni-list {
	
	margin-bottom: 30upx;
	
	&::after {
		height: 0;
	}
	
	&::before {
		height: 0;
	}
}
.btns {
	margin: 30upx 10%;
}
</style>
