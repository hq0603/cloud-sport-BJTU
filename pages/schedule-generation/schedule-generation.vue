<template>
	<view class="layout">
		<!-- <image src="../../static/temp/banner3.jpg"></image> -->
		<uni-title title="计划生成中.." type="h3"></uni-title>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			sleep (time) {
			  return new Promise((resolve) => setTimeout(resolve, time));
			}
		},
		onLoad() {
			this.sleep(1000).then(() => {
			    uni.redirectTo({
			    	url: '/pages/schedule-details-one/schedule-details-one'
			    })
			})
		}
	}
</script>

<style lang="less">
	.layout {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		image {
			width: 300upx;
			height: 300upx;
			border-radius: 50%;
			margin-top: 50%;
			margin-bottom: 10%;
		}
	}
</style>
