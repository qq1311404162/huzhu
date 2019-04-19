<template>
	<view class="uni-cell">
		<view class="uni-cell__container">
			<view class="uni-cell__title" v-if="title">
				<text>{{title}}</text>
			</view>
			<view class="uni-cell__content">
				<slot name="content"></slot>
			</view>
			<view class="uni-cell__right" v-if="isRight">
				<slot name="other"></slot>
			</view>
		</view>
	</view>
</template>
<script>
export default {
    name: 'uni-cell',
    props: {
		title: String,
		isRight: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="scss">
@import '../../common/css/variables.scss';

.uni-cell {
    font-size: $uni-font-size-lg;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &__container {
        padding: $uni-spacing-col-lg $uni-spacing-row-lg;
        width: 100%;
        box-sizing: border-box;
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &::after {
            position: absolute;
            z-index: 3;
            right: 10upx;
            bottom: 0;
            left: 30upx;
            height: 1upx;
            content: '';
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            background-color: $uni-border-color;
        }
    }

    &__content {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    &__right {
        width: 30%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
    &__title {
        width: 30%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
		font-size: $uni-font-size-base;
    }
}
.uni-cell:last-child .uni-cell__container::after {
	height: 0;
}
</style>
