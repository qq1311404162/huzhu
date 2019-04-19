<template>
	<view class="content">
		
		<scroll-view class="scroll-content" scroll-y scroll-top="0" @scrolltolower="loadMore" :style="[{height: scrollHeight}]" lower-threshold="70">
			
			
			<uni-collapse accordion="true">
				
				<view class="" v-for="(item, index1) in lists" :key="index1">
					
					<uni-collapse-item-own :info-data="item" :open="index1 === 0 ? true : false" :type="type" :typeValue="typeObj[item.type]" :state="state">
						
					</uni-collapse-item-own>
				</view>
				
			</uni-collapse>

			<uni-load-more :status="loadMoreStatus"></uni-load-more>
		</scroll-view>
		<!-- #ifdef MP-WEIXIN -->
		<my-add @click="gotoAdd"></my-add>
		<!-- #endif -->
	</view>
</template>
<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';

import uniCollapseItemOwn from '@/components/uni-collapse-item-own/uni-collapse-item-own.vue';
import myAdd from '@/components/my-add/my-add.vue';

import {getBangzhuLists} from '@/utils/api.js';

export default {
    components: {
        uniLoadMore,
        uniCollapse,
		uniCollapseItemOwn,
		myAdd
    },
    onLoad() {
		this.lists = [];
		this.currentPage = 1;
		// 获取第一页列表
		this.getLists(this.currentPage);
		// 设置scroll-view高度
		let system = uni.getSystemInfoSync();
		this.setScrollHeight(system);
		
    },
	onShow(){
// 		this.lists = [];
// 		this.currentPage = 1;
// 		// 获取第一页列表
// 		this.getLists(this.currentPage);
// 		// 设置scroll-view高度
// 		let system = uni.getSystemInfoSync();
// 		this.setScrollHeight(system);
	},
    data() {
        return {
            lists: [],
			type: 'bangzhu',
			typeObj: {},
			state: {},
			infoState: {},
			bangQiuState: {},
            scrollHeight: '500px',
			pageLength: 10,
			currentPage: 1,
			currentLength: 0,
			
        };
    },
	computed:{
	
		loadMoreStatus(){
			
			return this.currentLength < this.pageLength ? 'noMore' : 'loading';
		}
	},
    methods: {
		getLists(page){
			
			getBangzhuLists(page, this.pageLength).then(res => {
				
				if (!res) return;
				
				for (let item of res.lists) {
					
					this.lists.push(item);
				}
				
				this.typeObj = res.type;	// 类型
				this.state = res.state;	// 状态
				
				this.currentLength = res.lists.length || 0;
			});
		},
        loadMore() {
            
			if (this.currentLength == this.pageLength) {
				// 上次请求大小和分页大小相等，可以再次请求
				this.currentPage ++;
				this.getLists(this.currentPage)
			}
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
<style lang="scss">

@import '../../common/css/variables.scss';

.uni-collapse-cell__title {
	background: $uni-bg-color;
	position: relative;
	
	&:after {
		position: absolute;
		z-index: 3;
		right: 30upx;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: $uni-border-color;
	}
}

</style>
