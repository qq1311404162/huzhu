<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/common/css/variables.scss';
	
	page {
		min-height: 100%;
		display: flex;
		
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background: $uni-bg-color-grey;
	}
</style>
