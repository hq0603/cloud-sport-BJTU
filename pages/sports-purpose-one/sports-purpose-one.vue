<template>
	<view class="layout">
		<uni-title title="请选择您的运动目的" type="h2"></uni-title>
		<!-- <image class="image" src="../../static/temp/ad2.jpg" @click="next()"></image>
		<image class="image" style="margin-top: 40upx;" src="../../static/temp/ad3.jpg" @click="next()"></image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			next() {
				uni.redirectTo({
					url: '/pages/sports-mode/sports-mode'
				})
			}
		}
	}
</script>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	.image {
		width: 90%; 
		height:400upx; 
		border-radius: 5upx;
	}
</style>