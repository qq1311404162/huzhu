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
		<my-add @click="gotoAdd"></my-add>

	</view>
</template>
<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';

import uniCollapseItemOwn from '@/components/uni-collapse-item-own/uni-collapse-item-own.vue';
import myAdd from '@/components/my-add/my-add.vue';

import ajax from '@/utils/ajax';

export default {
    components: {
        uniLoadMore,
        uniCollapse,
		uniCollapseItemOwn,
		myAdd
    },
    onLoad() {
        // 获取帮助列表
        this.getLists();

		// 设置scroll-view高度
        let system = uni.getSystemInfoSync();
        this.setScrollHeight(system);
    },
    data() {
        return {
            lists: [],
			typeList: {},
			bangzhuState: {},
			bangQiustate: {},
            loadMoreStatus: 'loading',
            scrollHeight: '500px'
        };
    },
    methods: {
		getLists(){
			ajax({
					url: '/api/bangzhu/index',
					success: res => {
						
						this.lists = res.data.lists;
						this.typeList = res.data.type;
						this.bangQiustate = res.data.bangQiustate;
					},
					fail: function(err) {
						console.log('fail', err);
					}
				});
		},
        aaa() {
            this.loadMore = true;
            console.log(111);
        },
        // 设置滚动区域高度
        setScrollHeight(system) {
            this.scrollHeight = system.windowHeight + 'px';
        },
        gotoAdd() {
            uni.navigateTo({
                url: 'add'
            });
        }
    }
};
</script>
<style>
@import '../../common/css/common.css';


</style>
