<template name="HM-messages">
	<view class="messages" :class="[isShow?'show':'hide']" :style="{backgroundColor:background}">
		<view class="ico" v-if="icon!='none'">
			<view class="icon" :class="[icon]" :style="{color:iconColor}"></view>
		</view>
		<view class="content" :style="{color:fontColor,justifyContent:textAlign}">{{content}}</view>
		<view class="closeBtn" v-if="closeButton" @tap="close" :style="{color:closeButtonColor}">
			<view class="close"></view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "HM-messages",
		data() {
			return {
				isShow: false,
				content: '',
				icon: 'none',
				background: '',
				closeButton: false,
				closeButtonColor: '',
				fontColor: '',
				iconColor: '',
				textAlign: ''
			}
		},
		mounted() {
			this.$emit('complete');
		},
		methods: {
			Timer: null,
			show(content, Setting) {
				if (!content || typeof(content) != "string") {
					console.log('HM-messages: 组件方法调用错误,请检查方法参数');
					return;
				}
				this.Timer && clearTimeout(this.Timer); //清除计时器
				let iconColorArray = {
					'remind': '#5a89ff',
					'error': '#ef6160',
					'danger': '#ff0000',
					'success': '#0ec469',
					'disable': '#8c56a0',
					'help': '#5fb5f5'
				}
				let defaultSetting = {
					icon: 'remind',
					content: content,
					duration: 2000,
					background: 'rgba(238,238,238,0.8)',
					closeButton: false,
					closeButtonColor: "#555555",
					iconColor: iconColorArray['remind'],
					fontColor: "#555555",
					textAlign: "flex-start"

				}
				if (Setting&&!Setting.hasOwnProperty('iconColor') && Setting.hasOwnProperty('icon')) {
					Setting.iconColor = iconColorArray[Setting.icon]
				}
				Setting = Setting?this.extend(defaultSetting, Setting):defaultSetting;
				if (this.isShow) {
					this.isShow = false;
					setTimeout(() => {
						this.setSetting(Setting);
					}, 150)

				} else {
					this.setSetting(Setting);
				}
			},
			setSetting(Setting) {
				this.content = Setting.content;
				this.icon = Setting.icon;
				this.background = Setting.background;
				this.closeButton = Setting.closeButton;
				this.closeButtonColor = Setting.closeButtonColor;
				this.fontColor = Setting.fontColor;
				this.iconColor = Setting.iconColor;
				this.textAlign = Setting.textAlign;
				this.isShow = true;
				if (Setting.duration > 0) {
					this.Timer = setTimeout(() => {
						this.close();
					}, Setting.duration)
				}
			},
			close() {
				this.isShow = false;
				this.Timer && clearTimeout(this.Timer); //清除计时器
			},
			extend(destination, source) {
				for (let property in source) {
					destination[property] = source[property]
				}
				return destination
			}
		}
	}
</script>

<style>
	@font-face {font-family:"HMfont";src:url('data:application/x-font-woff;charset=utf-8;base64,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');}
	.icon {font-family:"HMfont" !important;font-size:25px;font-style:normal;}
	.remind:before {content:"\e719";}
	.error:before {content:"\e71b";}
	.danger:before {content:"\e725";}
	.success:before {content:"\e727";}
	.disable:before {content:"\e734";}
	.help:before {content:"\e73a";}
	.close:before {content:"\e731";}
	.messages {width:100%;height:40px;position:fixed;top:-40px;left:0;z-index:99999;display:flex;justify-content:flex-start;align-items:center;}
	.messages.show {animation:show 0.3s linear both;}
	.messages.hide {animation:hide 0.3s linear both;}
	@keyframes show {0% {transform:translateY(0px);}100% {transform:translateY(40px);}}
	@keyframes hide {0% {transform:translateY(40px);}100% {transform:translateY(0px);}}
	.messages .ico {width:40px;height:40px;display:flex;justify-content:center;align-items:center;margin-left:2%;margin-right:-2%;}
	.messages .content {width:100%;height:40px;padding:0 2%;font-size:15px;white-space:nowrap;display:flex;align-items:center;overflow:hidden;}
	.messages .closeBtn {width:30px;height:40px;display:flex;justify-content:center;align-items:center;margin-right:2%;}
	.messages .closeBtn .close {font-family:"HMfont" !important;font-size:15px;font-style:normal;}
</style>
