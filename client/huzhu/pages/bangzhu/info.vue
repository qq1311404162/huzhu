<template>
	<view></view>
</template>
<script>
	
	export default {
		data(){
			
			return {
				id: 0,
			};
		},
		onLoad(option){
			
			this.id = option.id;
			console.log(this.id);
		}
	}
</script>