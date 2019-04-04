
<template>
	<view class="content">
		
		<view class="group">
			<uni-cell title="旧密码">
				<view slot="content">
					<view class="flex-row input-row">
						<input type="text" v-model="old_password" placeholder="请输入旧密码"/>
					</view>
				</view>
			</uni-cell>
			
			<uni-cell title="新密码">
				<view slot="content">
					<view class="flex-row input-row">
						<input type="text" v-model="new_password" placeholder="请输入新密码"/>
					</view>
				</view>
			</uni-cell>
			
			<uni-cell title="确认新密码">
				<view slot="content">
					<view class="flex-row input-row">
						<input type="text" v-model="repassword" placeholder="请输入确认密码"/>
					</view>
				</view>
			</uni-cell>
			
		</view>
		
		<view class="btns">
			<button type="primary" class="register" @tap="edit">修改密码</button>
		</view>
	</view>
</template>
<script>
	
	import uniCell from '@/components/uni-cell/uni-cell.vue';
	
	export default {
		components: {
			uniCell
		},
		
		data() {
			
			return {
				password: '',
				new_password: '',
				repassword: ''
			};
		}
	}
</script>
<style lang="scss">
@import '../../common/css/variables.scss';


.group {
	background: $uni-text-color-inverse;
	margin: 35upx 0;
}

.group .uni-cell:last-child .uni-cell__container::after {
	height: 0;
}

.vcode {
    line-height: 60upx;
    border-radius: $uni-border-radius-lg;
    padding: 0 25upx;
    border: 1upx solid $uni-border-color;
    margin-right: 10upx;
    font-size: $uni-font-size-sm;
}

.vcode:active {
    background: $uni-border-color;
	color: $uni-bg-color;
}

.input-row {
    justify-content: flex-end;
}

.input-row input {
    text-align: right;
	font-size: $uni-font-size-base;
	padding-right: 20upx;
}

.btns {
	margin: 50upx 10%;
}
</style>