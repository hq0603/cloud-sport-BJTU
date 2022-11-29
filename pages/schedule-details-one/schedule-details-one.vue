<template>
	<view class="layout">
		<view class="section-a">
			<view class="left">
				<uni-title title="腿部强化训练" type="h2"></uni-title>
				<text>倒计时：07:11:06</text>
				<progress style="margin-top: 50upx; width:400upx" stroke-width="8"></progress>
			</view>
			<view class="right">
				<image src="../../static/selected.png"></image>
				<text>0%</text>
				<text>完成度</text>
			</view>
		</view>
		<view class="section-b">
			<view class="top">
				<image src="../../static/point.png"></image>
				<text>跳绳</text>
				<text style="margin-left: 150upx;">100个 0/2</text>
				<button type="default" size="mini" @click="nextToScheduleDetails">去完成</button>
			</view>
			<view class="bottom">
				<uni-table>
					<uni-tr>
						<uni-th width="100" align="center">组数</uni-th>
						<uni-th width="100" align="center">成绩</uni-th>
						<uni-th width="100" align="center">评价</uni-th>
					</uni-tr>
					<uni-tr>
						<uni-td width="100" align="center">1/2</uni-td>
						<uni-td width="100" align="center">-</uni-td>
						<uni-td width="100" align="center">-</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td width="100" align="center">2/2</uni-td>
						<uni-td width="100" align="center">-</uni-td>
						<uni-td width="100" align="center">-</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
		<view class="section-c">
			<image src="../../static/point.png"></image>
			<text>脚部触球训练</text>
			<text style="margin-left: 40upx;">01:00 0/2</text>
			<button type="default" style="background-color: orange; border-radius:50upx; margin-right:15upx"
				size="mini">去完成</button>
		</view>
		<view class="section-c">
			<image src="../../static/point.png"></image>
			<text>开合跳</text>
			<text style="margin-left: 150upx;">40个 0/2</text>
			<button type="default" style="background-color: orange; border-radius:50upx; margin-right:0.5em"
				size="mini">去完成</button>
		</view>
		<view class="section-c">
			<image src="../../static/point.png"></image>
			<text>躲避障碍训练</text>
			<text style="margin-left: 40upx;">挑战 0/2</text>
			<button type="default" style="background-color: orange; border-radius:50upx; margin-right:0.5em"
				size="mini">去完成</button>
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
			nextToScheduleDetails() {
				uni.navigateTo({
					url: '/pages/schedule-details-two/schedule-details-two'
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
	}

	.section-a {
		background-color: white;
		width: 95%;
		height: 300upx;
		border-radius: 10%;
		display: flex;

		.left {
			display: flex;
			flex-direction: column;
			margin-left: 50upx;
		}

		.right {
			display: flex;
			flex-direction: column;
			margin-left: 100upx;
			margin-bottom: 30upx;
			justify-content: center;
			align-items: center;

			image {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
			}
		}
	}

	.section-b {
		display: flex;
		flex-direction: column;
		background-color: white;
		width: 95%;
		margin-top: 20upx;
		border-radius: 10%;

		button {
			background-color: orange;
			border-radius: 50upx;
			margin-right: 20upx
		}

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 40upx;

			image {
				width: 80upx;
				height: 80upx;
			}
		}

		.bottom {
			margin-top: 40upx;

		}
	}

	.section-c {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20upx;
		background-color: white;
		width: 95%;
		height: 120upx;
		border-radius: 10%;

		image {
			width: 80upx;
			height: 80upx;
		}
	}
</style>
