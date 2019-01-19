<template>
	<view class="my-add" @click="myClick">+</view>
</template>
<script>
export default {
    name: 'my-add',
	methods:{
		myClick(){
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss">
@import '../../common/css/variables.scss';

.my-add {
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
    -webkit-box-shadow: $uni-text-color-placeholder 0px 0px 5px;
    -moz-box-shadow: $uni-text-color-placeholder 0px 0px 5px;
    box-shadow: $uni-text-color-placeholder 0px 0px 5px;
    /*加号大小*/
    font-size: 64upx;
    color: #1296db;
    background: $uni-bg-color-grey;
}

.my-add:active {
    background: #1296db;
    color: #ffffff;
}
</style>
