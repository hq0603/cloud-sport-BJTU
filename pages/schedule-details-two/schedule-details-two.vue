<template>
	<view class="layout">
		<view class="section-a">
			<view class="left">
				<uni-title title="跳绳速成计划" type="h3" style="margin-bottom: 40upx;"></uni-title>
				<view>
					<image src="../../static/16-star.png"></image>
					<text>运动强度：中</text>
				</view>
				<view style="margin-top: 30upx;">
					<image src="../../static/clock-fill.png"></image>
					<text>运动周期：28天</text>
				</view>
			</view>
			<view class="right">
				<tui-circular-progress diam="80" progressColor="#EB0909" fontSize="15" fontColor="black" percentage="0"
					percentText="0%进行中"></tui-circular-progress>
			</view>
		</view>
		<view style="align-self: flex-start;" class="section-title section-margin-top">
			计划说明
		</view>
		<view class="section-b">
			<text>运动计划是帮助你更好地进行相关运动的一种辅助方式，能帮助你更好地运动，调节运动能力。</text>
		</view>
		<view style="align-self: flex-start;" class="section-title section-margin-top">
			计划日程
		</view>
		<view class="section-c">
			<text style="margin-left: 20upx;">第一周</text>
			<text style="margin-right: 20upx;">></text>
		</view>
		<view class="section-c">
			<text style="margin-left: 20upx;">第二周</text>
			<text style="margin-right: 20upx;">></text>
		</view>
		<view class="section-c">
			<text style="margin-left: 20upx;">第三周</text>
			<text style="margin-right: 20upx;">></text>
		</view>
		<view class="section-c">
			<text style="margin-left: 20upx;">第四周</text>
			<text style="margin-right: 20upx;">></text>
		</view>
	</view>
</template>

<script>
	import tuiCircularProgress from "@/components/tui-circular-progress/tui-circular-progress"
	export default {
		components: {
			tuiCircularProgress
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.layout {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.section-a {
		background-color: white;
		width: 95%;
		// height: 10em;
		border-radius: 10%;
		display: flex;

		.left {
			display: flex;
			flex-direction: column;
			margin-left: 40upx;
			margin-bottom: 40upx;

			image {
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
			}
		}

		.right {
			margin-left: 120upx;
			margin-top: 40upx;
		}
	}

	.section-b {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		width: 95%;
		border-radius: 10%;
		height: 120upx;

		text {
			// display: flex;
			// justify-content: center;
			// align-items: center;
			// margin-top: 1em;
			margin-left: 40upx;
			margin-right: 20upx;
			font-size: 28upx;
		}
	}
	
	.section-c {
		background-color: white;
		width: 95%;
		border-radius: 10%;
		height: 120upx;
		display: flex;
		justify-content:space-between;
		align-items: center;
		margin-bottom: 20upx;
	}
</style>
