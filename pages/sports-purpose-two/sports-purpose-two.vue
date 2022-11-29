<template>
	<view>
		<uni-title title="请选择您的运动目的" type="h2" align="center"></uni-title>
		<view class="section-sports-jing">
			<view v-for="(item, index) in trainList" :key="index" class="cate-item" @click="next()">
				<view class="bg-white image-container">
					<image :src="item.imgUrl" />
				</view>
				<view style="width: 100%; background-color: white;">
					<uni-title :title="item.title" type="h3" align="center" class="title"></uni-title>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				trainList: [{
						title: '减脂减重',
						imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/02.png'
					},
					{
						title: '提升耐力',
						imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/04.png'
					},
					{
						title: '提升反应力',
						imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/fanyinglixunlian.png'
					}
				],
			}
		},
		methods: {
			next() {
				uni.redirectTo({
					url: '/pages/sports-time/sports-time'
				})
			}
		}
	}
</script>

<style lang="less">
	.section-sports-jing {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;

		.cate-item {
			display: flex;
			box-sizing: border-box;
			flex-direction: column;
			align-items: flex-start;
			font-size: 26upx;
			color: #DCDFE6;
			min-width: 42%;
			margin: 4%;
			// height: 300upx;
			border-radius: 5%;

			.image-container {
				width: 100%;
				height: 250upx;
				border-radius: 1px;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.title {
		background-color: white;
	}
</style>
