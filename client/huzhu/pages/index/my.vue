<template>
	<view class="content">
		<view class="flex-column user-info">
			<image src="../../static/dynamic.png" mode=""></image>
			<text class="name">闲庭梦若</text>
			<text>未激活</text>
		</view>
		<uni-list>
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


export default {
    components: {
        uniList,
        uniListItem
    },
    methods: {
        // 跳转到指定页面
        goto(url) {
            uni.navigateTo({
                url: '../my/' + url
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
