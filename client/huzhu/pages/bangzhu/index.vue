<template>
	<view class="content">
		
		<scroll-view class="scroll-content" scroll-y scroll-top="0" @scrolltolower="aaa" :style="[{height: scrollHeight}]" lower-threshold="70">
			
			
			<uni-collapse accordion="true">
				
				<view class="" v-for="(item, index1) in lists" :key="index1">
					
					<uni-collapse-item-own :info-data="item" :open="index1 === 0 ? true : false" type="bangzhu" :typeObj="typeObj" :state="state" :infoState="infoState" :bangQiuState="bangQiuState">
						
					</uni-collapse-item-own>
				</view>
				
			</uni-collapse>

			<uni-load-more :status="loadMoreStatus" v-if="loadMore"></uni-load-more>
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

		
    },
	onShow(){
		// 获取帮助列表
		this.getLists();
		// 设置scroll-view高度
		let system = uni.getSystemInfoSync();
		this.setScrollHeight(system);
	},
    data() {
        return {
            lists: [],
			typeObj: {},
			state: {},
			infoState: {},
			bangQiuState: {},
            loadMoreStatus: 'loading',
            scrollHeight: '500px',
			loadMore: false
			
        };
    },
    methods: {
		getLists(){
			ajax({
					url: '/api/bangzhu/index',
					success: res => {
						
						this.lists = res.data.lists;
						this.typeObj = res.data.type;
						this.infoState = res.data.infoState;
						this.bangQiuState = res.data.bangQiuState;
						this.state = res.data.bangzhuState;
						
						this.loadMore = (this.lists.length < 10 && this.lists.length > 0) ? false : true;
						
						this.loadMoreStatus = this.lists.length == 0 ? 'noMore' : 'loading';
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
			console.log(1);
            uni.navigateTo({
                url: '/pages/bangzhu/add'
            });
        }
    }
};
</script>
<style>
@import '../../common/css/common.css';


</style>
