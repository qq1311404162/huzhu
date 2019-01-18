<template>
	<view class="content">
		
		<scroll-view class="scroll-content" scroll-y scroll-top="0" @scrolltolower="aaa" :style="[{height: scrollHeight}]" lower-threshold="70">
			
			
			<uni-collapse accordion="true">
				
				<view class="" v-for="(item, index1) in lists" :key="index1">
					
					<uni-collapse-item-own :info-data="item" :open="index1 === 0 ? true : false">
						
					</uni-collapse-item-own>
				</view>
				
			</uni-collapse>

			<uni-load-more :status="loadMoreStatus"></uni-load-more>
		</scroll-view>
		<view class="add" @click="addBangzhu">+</view>

	</view>
</template>
<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';

import uniCollapseItemOwn from '@/components/uni-collapse-item-own/uni-collapse-item-own.vue';

import ajax from '@/utils/ajax';

export default {
    components: {
        uniLoadMore,
        uniCollapse,
		uniCollapseItemOwn
    },
    onLoad() {
        // 获取帮助金额
        // this.userAvailable();

		// 设置scroll-view高度
        let system = uni.getSystemInfoSync();
        this.setScrollHeight(system);

        this.lists = [
            {
                type: '额度排单',
                state: '等待匹配',
                created_at: '2018-11-12 12:12:12',
                ident: 'p2018121231231',
                amount: '900',
				info: [
					{
						type: '额度排单',
						state: '等待匹配',
						created_at: '2018-11-12 12:12:12',
						ident: 'p2018121231231',
						amount: '900',
					},
					{
						type: '额度排单',
						state: '等待匹配',
						created_at: '2018-11-12 12:12:12',
						ident: 'p2018121231231',
						amount: '900',
					}
				]
            },
            {
                type: '额度排单',
                state: '等待匹配',
                created_at: '2018-11-12 12:12:12',
                ident: 'p2018121231231',
                amount: '900',
				info: [{
					type: '额度排单',
					state: '等待匹配',
					created_at: '2018-11-12 12:12:12',
					ident: 'p2018121231231',
					amount: '900',
				}]
            },
            {
                type: '额度排单',
                state: '等待匹配',
                created_at: '2018-11-12 12:12:12',
                ident: 'p2018121231231',
                amount: '900',
				info: [
					{
						type: '额度排单',
						state: '等待匹配',
						created_at: '2018-11-12 12:12:12',
						ident: 'p2018121231231',
						amount: '900',
					}
				]
            }
        ];
    },
    data() {
        return {
            lists: [],
            loadMoreStatus: 'loading',
            scrollHeight: '500px'
        };
    },
    methods: {
        aaa() {
            this.loadMore = true;
            console.log(111);
        },
        // 设置滚动区域高度
        setScrollHeight(system) {
            this.scrollHeight = system.windowHeight + 'px';
        },
        addBangzhu() {
            uni.navigateTo({
                url: 'add'
            });
        }
    }
};
</script>
<style>
@import '../../common/css/common.css';

.add {
    /*悬浮的加号*/
    /*基础*/
    position: fixed; /*相对于手机屏幕布局*/
    z-index: 99; /*叠层设置*/
    /*设置内部加号居中*/
    text-align: center;
    vertical-align: text-top;
    /*宽高*/
    width: 100upx;
    height: 100upx;
    /*位于屏幕的位置（可根据需求改）*/
    bottom: 90upx;
    right: 60upx;
    /*圆形（若需要正方形的加号可以去掉此样式）*/
    border-radius: 50%;
    /*四边阴影（让加号看起来有立体感）*/
    -webkit-box-shadow: #808080 0px 0px 5upx;
    -moz-box-shadow: #808080 0px 0px 5upx;
    box-shadow: #808080 0px 0px 5upx;
    /*加号大小*/
    font-size: 64upx;
    color: #1296db;
    background: #ffffff;
}

.add:active {
    background: #1296db;
    color: #ffffff;
}
</style>
