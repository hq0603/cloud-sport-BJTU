<template>
	<view style="width: 100%;height: 100%;">
		<web-view :src="src" allow="geolocation; microphone; camera; midi; encrypted-media;"></web-view>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	export default {
		data() {
			return {
				src: ""
			}
		},
		methods: {
		},
		onLoad(e) {
			console.log(e.title)
			if(uni.getSystemInfoSync().platform == 'android'){
				console.log("安卓")
				permision.requestAndroidPermission("android.permission.CAMERA")
			}
			
			this.src = `https://webview-1302510758.cos.ap-beijing.myqcloud.com/cloud-sports/action/${e.title}/index.html`
			
		}
		
	}
</script>

<style scoped>

</style>
