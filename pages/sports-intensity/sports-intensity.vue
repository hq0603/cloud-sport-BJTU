<template>
	<view>
		<uni-title title="选择强度" type="h2" align="center"></uni-title>
		<view class="layout">
			<view>
				<text>高</text>
			</view>
			<view class="selected">
				<text>中</text>
			</view>
			<view style="margin-bottom: 60upx;">
				<text>低</text>
			</view>
			<button type="default" size="mini" @click="next()">下一步</button>
		</view>
		
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
					url: '/pages/schedule-length/schedule-length'
				})
			}
		}
	}
</script>

<style lang="less">
	.layout {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		margin-top: 80upx;

		// view {
		// 	margin-bottom: 1.5em;
		// }
		
		button {
			margin-top: 60%;
			background-color: rgb(255, 208, 55);
			border-radius: 50upx;
		}
	}

	.selected {
		background-color: rgb(254, 244, 216);
		color: rgb(255, 206, 71);
		width: 100%;
		height: 120upx;
		margin: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>
