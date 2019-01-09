<template>
	<view class="content">
		<view class="flex-column user-info">
			<image :src="avatar" mode=""></image>
			<text class="name">{{realname}}</text>
			<text v-if="state == 0">未激活</text>
			<text v-if="state == 1">{{team}}</text>
		</view>
		<uni-list>
			<uni-list-item title="激活账户" @click="activation()" v-if="state == 0"></uni-list-item>
			<uni-list-item title="个人资料" @click="goto('edit-info')"></uni-list-item>
			<uni-list-item title="我的推广"></uni-list-item>
			<uni-list-item title="修改密码" @click="goto('edit-pwd')"></uni-list-item>
			<uni-list-item title="修改交易密码" @click="goto('edit-payword')"></uni-list-item>
		</uni-list>
		
		<view class="btn-row">
			<button type="primary" class="primary">退出登录</button>
		</view>
	</view>
</template>
<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import ajax from '@/utils/ajax';

export default {
    components: {
        uniList,
        uniListItem
    },
    data() {
        return {
            avatar: '../../static/dynamic.png',
            realname: '',
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
            ajax({
                url: '/api/user-info',
                data: {},
                success: res => {
                    this.realname = res.data.realname;
                    this.avatar =
                        res.data.avatar == '' ? '../../static/dynamic.png' : res.data.avatar;
                    this.state = res.data.state;
                    this.team = res.data.team_id;
                },
                fail: function(err) {
                    console.log('fail', err);
                }
            });
        },
        // 跳转到指定页面
        goto(url) {
            uni.navigateTo({
                url: '../my/' + url
            });
        },
        // 激活账户
        activation() {
            ajax({
                url: '/api/activation',
                data: {},
                success: res => {
                    
					uni.showToast({
						icon: 'none',
						title: res.msg,
						success: () => {
							// 重新获取个人信息
							this.getInfo();
						}
					});
                },
                fail: function(err) {
                    console.log('fail', err);
                }
            });
        }
    }
};
</script>
<style>
@import '../../common/css/common.css';

.user-info {
    align-items: center;
    justify-content: center;
    padding-top: 30upx;
    padding-bottom: 20upx;
    /* border-bottom: 4upx solid #f5f5f5; */
}

.user-info image {
    display: inline-block;
    width: 130upx;
    height: 130upx;
    padding-bottom: 20upx;
}

.user-info text {
    font-size: 32upx;
}

.user-info .name {
    font-size: 40upx;
    font-weight: bold;
}
</style>
