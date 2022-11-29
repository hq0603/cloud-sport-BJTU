<template>
	<view class="bg-grey">
		<view class="uni-margin-wrap">
			<swiper class="screen-swiper round-dot" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in swiperList" :key="index"><image :src="item.imgUrl" mode="aspectFill"></image></swiper-item>
			</swiper>
		</view>
		<lgd-tab :tabValue="tabValue" @getIndex="tabChange" />
		<view class="">
			<!-- 阅读列表:全部 -->
			<uni-row>
				<uni-col>
					<view class="article-list">
						<uni-row v-for="(item, index) in articleList" :key="index">
							<uni-col :offset="1" :span="22">
								<view class="article" @click="checkNews(item.uuid)">
									<uni-row>
										<uni-col :span="8"><image :src="item.news_cover" style="width: 100%; height: 120upx;" mode="aspectFill"></image></uni-col>
										<uni-col :offset="1" :span="15">
											<view class="text">
												<uni-title :title="item.news_title"></uni-title>
												<view class="desc">
													<view class='cu-tag bg-cyan radius sm'>{{ newsType[item.news_type] }}</view>
													<text class="text-right">{{ formatDate(item.news_release_time) }}</text>
												</view>
											</view>
										</uni-col>
									</uni-row>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</uni-col>
			</uni-row>

			<view class="text-black text-center margin-tb" v-if="pageData.loading || pageData.isLoadAll">{{pageData.loadingTxt}}</view>
		</view>
	</view>
</template>

<script>
import http from '../../request.js';
const dayjs = require('dayjs')
export default {
	data() {
		return {
			// 轮播：start
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			swiperList: [
				{ imgUrl: 'https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/common/f97520220211105311.jpeg' },
				{imgUrl: 'https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/common/f69620220211105310.jpeg'}
			],
			// 轮播：end
			tabValue: ['全部', '新', '健康', '运动'],
			tabIndex: 0,
			articleList: [],
			newsType: Object.freeze({
				0: '全部',
				1: '新闻',
				2: '健康',
				3: '运动'
			}),
			pageData: {
				page: 1,
				pageSize: 10,
				loadingTxt: '加载中...',
				isLoadAll: false,
				loading: true
			},
			section1TabValue: ['2022', '2021', '2020', '2019', '2018'],
			section1TabIndex: 0,
			section1ScoreList: [
				{ name: '身高体重（厘米/千克）', value: '182.5/73.1', desc: '正常' },
				{ name: '肺活量（毫升）', value: '4836', desc: '良好' },
				{ name: '立定跳远（厘米）', value: '280.0', desc: '优秀' },
				{ name: '坐位体前屈（厘米）', value: '16.1', desc: '及格' },
				{ name: '引体/仰卧（次）', value: '15', desc: '及格' },
				{ name: '50米（秒）', value: '6.0', desc: '优秀' },
				{ name: "800/1000米（分'秒）", value: `3\'20\'\'`, desc: '优秀' },
				{ name: '视力', value: '', desc: '点击查看' }
			]
		};
	},
	methods: {
		tabChange(tabIndex) {
			this.tabIndex = tabIndex;
			this.articleList = [];
			this.pageData = {
				page: 1,
				pageSize: 10,
				loadingTxt: '加载中...',
				isLoadAll: false
			};
			this.getNewsData(tabIndex);
			console.log(`current tab: ${this.tabValue[tabIndex]}`);
		},
		section1TabChange(tabIndex) {
			this.section1TabIndex = tabIndex;
			console.log(`current section 1 tab: ${this.section1TabValue[tabIndex]}`);
		},
		changeIndicatorDots(e) {
			this.indicatorDots = !this.indicatorDots;
		},
		changeAutoplay(e) {
			this.autoplay = !this.autoplay;
		},
		intervalChange(e) {
			this.interval = e.target.value;
		},
		durationChange(e) {
			this.duration = e.target.value;
		},
		formatDate(date) {
			return dayjs(date).format('YYYY-MM-DD')
		},
		getNewsData(type) {
			this.pageData.loading = true
			http.post('news/getAllNews', {
				page: this.pageData.page,
				page_size: this.pageData.pageSize,
				type: parseInt(type)
			}).then(res => {
				console.log(res);
				if (res.news && res.news.length !== 0) {
					this.pageData.page++;
					let list = res.news.map(v=>{
						 if (!v.news_cover) {
							 v.news_cover = "https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/news_cover/%E5%9B%BE%E6%80%AA%E5%85%BD_a9df69d2eb669fe66d3fde9b325cdb36_23762.png"
						 }
						 
						 console.log(v.news_cover)
						 return v
					})
					this.articleList.push(...list);
				} else {
					this.pageData.isLoadAll = true;
					this.pageData.loadingTxt = '加载完了哦';
				}
			}).finally(()=>{
				this.pageData.loading = false
				this.pageData.loadingTxt = ""
			})
		},
		checkNews(id) {
			uni.navigateTo({
				url: '/pages/news-detail/news-detail?id=' + id
			});
		}
	},
	onReachBottom() {
		if (!this.pageData.isLoadAll) {
			this.getNewsData(this.tabIndex)
		}
	}
};
</script>

<style lang="less">
.bg-grey {
	background-color: rgb(247, 247, 247);
}
.uni-margin-wrap {
	width: 690upx;
	width: 100%;
}
.swiper {
	height: 300upx;
}
.swiper-item {
	display: block;
	height: 300upx;
	line-height: 300upx;
	text-align: center;
}
.swiper-list {
	margin-top: 40upx;
	margin-bottom: 0;
}
.uni-common-mt {
	margin-top: 60upx;
	position: relative;
}
.info {
	position: absolute;
	right: 20upx;
}
.uni-padding-wrap {
	width: 550upx;
	padding: 0 100upx;
}

.article-list {
	margin-top: 30upx;

	.article {
		border-radius: 10upx;
		background-color: white;
		position: relative;
		height: 120upx;
		padding: 20upx;
		position: relative;
		.desc {
			width: 66%;
			position: absolute;
			bottom: 5upx;
			color: grey;
			font-size: 24upx;
			.text-right {
				right: 10px;
				display: block;
				position: absolute;
				bottom: 0;
			}
		}
	}
}
</style>
