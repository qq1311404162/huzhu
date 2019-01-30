<template>
	<view :class="setCollapseCellClass" :hover-class="disabled === true || disabled === 'true' ? '' : 'uni-collapse-cell--hover'">
		<view class="uni-collapse-cell__title" @click="onClick">
			<view class="uni-collapse-cell__title-one">
				<view class="uni-collapse-cell__title-one-extra" v-if="thumb">
					<image class="uni-collapse-cell__title--oneimg" :src="thumb"></image>
				</view>
				<view class="uni-collapse-cell__title-one-inner">
					<view class="uni-collapse-cell__title-one-text">编号:{{identDesc}}</view>
				</view>
				<view class="uni-collapse-cell__title-one-arrow" :class="setActive">
					<uni-icon color="#bbb" size="20" type="arrowdown"></uni-icon>
				</view>
			</view>
			<view class="uni-collapse-cell__title-two">
				<view class="uni-collapse-cell__title-two-amount">
					金额：￥{{amountDesc}}
				</view>
				<view class="uni-collapse-cell__title-two-state">
					{{stateDesc}}
				</view>
			</view>
			<view class="uni-collapse-cell__title-three">
				<view class="uni-collapse-cell__title-two-type">
					类型：{{typeValue}}
				</view>
				<view class="uni-collapse-cell__title-two-time">
					时间：{{infoData.created_at}}
				</view>
			</view>
			
		</view>
		<view class="uni-collapse-cell__content" :class="animation==='outer' ? 'uni-collapse-cell--animation' : ''" :style="{height:isOpen==='true' || isOpen=== true ? '' : '0px'}">
			<view :class="setContClass" :id="elId">
				<view class="uni-collapse-cell__content-list" v-for="(item2, index2) in (type == 'bangzhu' ? infoData.bangzhu_infos : infoData.qiuzhu_infos)" :key="index2">
					
					<uni-card :note="item2.created_at" :info="item2" :state="state" @click="onItemClick(item2)">
					</uni-card>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcon from '../uni-icon/uni-icon.vue';
import uniCard from '../uni-card/uni-card.vue';
export default {
    name: 'uni-collapse-item-own',
    components: {
        uniIcon,
		uniCard
    },
    data() {
        const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`;
        return {
            isOpen: this.open,
            height: 0,
            elId: elId
        };
    },
    watch: {
        open(val) {
            this.isOpen = val;
        }
    },
    computed: {
        index() {
            return this.$parent.$children.indexOf(this);
        },
        nameSync() {
            return this.name === 0 ? this.index : this.name;
        },
        setCollapseCellClass() {
            let classList = ['uni-collapse-cell'];
            if (this.disabled === true || this.disabled === 'true') {
                classList.push('uni-collapse-cell--disabled');
            }
            if (this.isOpen === true || this.isOpen === 'true') {
                classList.push('uni-collapse-cell--open');
            }
            return classList;
        },
        setActive() {
            let classList = [];
            if (this.isOpen === true || this.isOpen === 'true') {
                classList.push('uni-active');
            }
            return classList;
        },
        setContClass() {
            let classList = [];
            if (this.isOpen === true || this.isOpen === 'true') {
                classList.push('uni-active');
            }
            if (this.animation === 'inner') {
                classList.push('uni-collapse-cell__inner');
            }
            return classList;
        },
		identDesc(){
			
			return this.infoData.ident || '';
		},
		amountDesc(){
			
			return this.infoData.amount || '0.00';
		},
		stateDesc(){
			
			return (this.state[this.infoData.state]) || '等待匹配';
		}
    },
    props: {
        animation: {
            //动画效果:inner内容动；outer容器动
            type: String,
            default: 'outer'
        },
        name: {
            //唯一标识符
            type: [Number, String],
            default: 0
        },
        disabled: {
            //是否禁用
            type: [Boolean, String],
            default: false
        },
        open: {
            //是否展开
            type: [Boolean, String],
            default: false
        },
		infoData: {
			type: Object,
			default: function() {
				
				return {};
			}
		},
		type: String,
		typeValue: String,	// 类型
		// 状态
		state: {
			type: Object,
			default: function () {
				
				return {}
			}
			
		},
    },
    created() {

        let parent = this.$parent || this.$root;
        let name = parent.$options.name;

        while (parent && name !== 'uni-collapse') {
            parent = parent.$parent;
            if (parent) {
                name = parent.$options.name;
            }
        }
        this.parent = parent;
    },
    methods: {
        onClick() {
            if (this.disabled) {
                return;
            }
            let accordion = this.parent.accordion ? this.parent.accordion : false;
            if (accordion === true || accordion === 'true') {
                this.$parent.$children.forEach(vm => {
                    if (vm === this) {
                        return;
                    }
                    vm.isOpen = false;
                });
            }
            this.isOpen = !this.isOpen;
            this.parent.onChange && this.parent.onChange(this);
        },
		onItemClick(item) {

			let url = '';
			if (this.type == 'bangzhu') {
				
				url = '/pages/bangzhu/info';
			}else {
				
				url = '/pages/qiuzhu/info';
			}
			
			if (item.bang_qiu !== null) {
				// 跳转到详情页
				uni.navigateTo({
					url: url + '?id=' + item.bang_qiu.id
				})
			}else {
				uni.showToast({
				    icon: 'none',
				    title: '等待匹配',
				});
			}
			
		}
    }
};
</script>

<style lang="scss">
@import '../../common/css/variables.scss';

@mixin collapse-hover {
    background-color: $uni-bg-color-hover;
}

@mixin collapse-disabled {
    opacity: 0.3;
}

$collapse-title-pd: $uni-spacing-col-lg $uni-spacing-row-lg;

.uni-collapse-cell {
    position: relative;

    &--hover {
        @include collapse-hover;
    }

    &--open {
        @include collapse-hover;
    }

    &--disabled {
        @include collapse-disabled;
    }

    &--animation {
        transition: all 0.3s;
    }

    &:after {
        position: absolute;
        z-index: 3;
        right: 0;
        bottom: 0;
        left: 0px;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        background-color: $uni-border-color;
    }

    &__title {
        padding: $collapse-title-pd;
        width: 100%;
		box-sizing: border-box;
		flex: 1;

        &-one {
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			
            &-extra {
                margin-right: 18upx;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }

            &-img {
                height: $uni-img-size-base;
                width: $uni-img-size-base;
            }

            &-arrow {
                width: 20upx;
                height: 20upx;
                transform: rotate(0deg);
                transform-origin: center center;
                transition: transform 0.3s;

                display: flex;
                justify-content: center;
                align-items: center;

                &.uni-active {
                    transform: rotate(-180deg);
                }
            }

            &-inner {
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            &-text {
                font-size: $uni-font-size-lg;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: inherit;
                line-height: 1.5;
                overflow: hidden;
            }
        }
		
		&-two {
			
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			
			font-size: $uni-font-size-base;
			padding-top: 10upx;
			
			&-amount {
				
			}
			
			&-state {
				
				color: red;
			}
		}
		
		&-three {
			
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			
			font-size: $uni-font-size-base;
			padding-top: 10upx;
			
			&-type {
				
			}
			
			&-time {
				
				color: red;
			}
		}
	}

    &__content {
        position: relative;
        width: 100%;
        overflow: hidden;
        background: $uni-bg-color;

        view {
            font-size: $uni-font-size-base;
        }
		
		&-list {
			
			padding-top: 10upx;
			
			&:last-child {
				
				padding-bottom: 10upx;
			}
		}
    }

    &__inner {
        opacity: 0;
        transform: translateY(-50%);
        transition: all 0.3s;
        transform-origin: center center;

        &.uni-active {
            opacity: 1;
            transform: translateY(0px);
        }
    }
}
</style>
