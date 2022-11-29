<template>
	<view>
		<lgd-tab :tabValue="tabValue" @getIndex="tabChange" />
		<view class="" v-if="tabIndex == 0">
			<!-- 赛事 -->
			<uni-row>
				<uni-col>
					<view class="recommend-list">
						<view class="cu-bar">
							<view class="action sub-title">
								<text class="text-lg text-bold text-blue">热门推荐</text>
								<text class="bg-blue" style="width:2rem"></text>
							</view>
						</view>
						<!-- <uni-title title="热门推荐" type="h2"></uni-title> -->
						<uni-row v-for="(item, index) in recommendList" :key="index">
							<div @tap="checkDetail(item.uuid)">
								<uni-col :offset="1" :span="22">
									<view class="recommend">
										<uni-row>
											<uni-col :span="16">
												<view class="text">
													<uni-title :title="item.title"></uni-title>
													<view class="desc">
														<text>{{ item.duration }}</text>
														<text class="number">{{ item.join_count }}人报名</text>
													</view>
												</view>
											</uni-col>
											<uni-col :span="8"><image :src="item.cover" style="width: 100%; height: 120upx;" mode="aspectFill"></image></uni-col>
										</uni-row>
									</view>
								</uni-col>
							</div>
						</uni-row>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view class="competition-list">
						<view class="cu-bar">
							<view class="action sub-title">
								<text class="text-lg text-bold text-blue">圈子比赛</text>
								<text class="bg-blue" style="width:2rem"></text>
							</view>
						</view>
						<!-- <uni-title title="圈子比赛" type="h2"></uni-title> -->
						<uni-row v-for="(item, index) in competitionList" :key="index">
							<div @tap="checkDetail(item.uuid)">
								<uni-col :offset="1" :span="22">
									<view class="competition">
										<uni-row>
											<uni-col span="16">
												<view class="text">
													<uni-title :title="item.title"></uni-title>
													<view class="desc">
														<text>{{ item.duration }}</text>
														<text class="number">{{ item.join_count }}人报名</text>
													</view>
												</view>
											</uni-col>
											<uni-col :span="8"><image :src="item.cover" style="width: 100%; height: 120upx;" mode="aspectFill"></image></uni-col>
										</uni-row>
									</view>
								</uni-col>
							</div>
						</uni-row>
						<view class="text-black text-center margin-tb" v-if="pageData.loading || pageData.isLoadAll">{{ pageData.loadingTxt }}</view>
					</view>
				</uni-col>
			</uni-row>
		</view>

		<view class="" v-if="tabIndex == 1">
			<uni-list><uni-list-item :title="item.title" :rightText="item.medal || '进行中'" v-for="(item, index) in scoreList" :key="index" /></uni-list>
		</view>

		<view class="" v-if="tabIndex == 2">
			<uni-section title="奖章" type="line">
				<uni-list><uni-list-item :title="item.title" :rightText="item.medal || '进行中'" v-for="(item, index) in scoreList" :key="index"/></uni-list>
			</uni-section>

			<uni-section title="证书" type="line">
				<uni-list>
<uni-list-item :title="item.title" :rightText="item.cert || '进行中'" v-for="(item, index) in certList" :key="index"/>
				</uni-list>
			</uni-section>
		</view>
	</view>
</template>

<script>
import dataList from './data.json';
import http from '../../request.js';
const dayjs = require('dayjs');
export default {
	data() {
		return {
			tabValue: ['赛事信息', '成绩查询', '奖章证书'],
			pageData: {
				page: 1,
				pageSize: 10,
				loadingTxt: '加载中...',
				isLoadAll: false,
				loading: true
			},
			tabIndex: 0,
			recommendList: [],
			competitionList: [],
			scoreList: [],
			certList: [],
			articleNewsList: [
				{ title: '过个运动健康年', type: '新闻公告', date: '01-29', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png' },
				{ title: '过个运动健康年', type: '新闻公告', date: '01-29', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png' },
				{ title: '过个运动健康年', type: '新闻公告', date: '01-29', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png' }
			],
			articleHealthList: [
				{ title: '过个健康年', type: '健康', date: '01-29', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png' },
				{ title: '过个健康年', type: '健康', date: '01-29', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png' },
				{ title: '过个健康年', type: '健康', date: '01-29', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png' }
			],
			articleSportsList: [
				{ title: '过个运动年', type: '运动', date: '01-29', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png' },
				{ title: '过个运动年', type: '运动', date: '01-29', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png' },
				{ title: '过个运动年', type: '运动', date: '01-29', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png' },
				{ title: '过个运动年', type: '运动', date: '01-29', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png' }
			],
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
			if (this.tabIndex === 0) {
				this.getHotList();
				this.getList();
			}
			if (this.tabIndex === 1) {
				this.getScore();
			}
			if (this.tabIndex === 2) {
				this.getScore()
			}
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
		getHotList() {
			http.post('match/getHotList').then(res => {
				console.log(res);
				this.recommendList = res.list.map(v => {
					v.duration = dayjs(this.formatBackendTime(v.start_date)).format('MM月DD日') + '-' + dayjs(this.formatBackendTime(v.end_date)).format('MM月DD日');
					return v;
				});
			});
		},
		getList() {
			this.pageData.loading = true;
			http.post('match/getList', {
				page: this.pageData.page,
				page_size: this.pageData.pageSize
			})
				.then(res => {
					console.log(res);
					if (res.list && res.list.length !== 0) {
						this.pageData.page++;
						this.competitionList = res.list.map(v => {
							v.duration = dayjs(this.formatBackendTime(v.start_date)).format('MM月DD日') + '-' + dayjs(this.formatBackendTime(v.end_date)).format('MM月DD日');
							return v;
						});
					} else {
						this.pageData.isLoadAll = true;
						this.pageData.loadingTxt = '加载完了哦';
					}
				})
				.finally(() => {
					this.pageData.loading = false;
					this.pageData.loadingTxt = '';
				});
		},
		getScore() {
			http.post('match/getScore').then(res => {
				console.log(res);
				this.scoreList = res.list
				this.certList = res.list
			});
		},
		checkDetail(id) {
			console.log(id);
			uni.navigateTo({
				url: '/pages/competition/detail/detail?id=' + id
			});
		},
		formatBackendTime(time) {
			return time.replace(/T/g, ' ').replace(/Z/g, '');
		}
	},
	mounted() {},
	onReachBottom() {
		if (!this.pageData.isLoadAll) {
			this.getList();
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

.recommend-list {
	background-color: white;
	.recommend {
		border-radius: 10upx;
		background-color: rgb(248, 248, 248);
		position: relative;
		height: 120upx;
		padding: 20upx;
		position: relative;
		margin-bottom: 20upx;
		border-radius: 15upx;
		.desc {
			width: 66%;
			position: absolute;
			bottom: 5upx;
			color: grey;
			font-size: 24upx;
			display: block;
			.number {
				display: block;
			}
		}
	}
}

.competition-list {
	margin-top: 30upx;
	background-color: white;

	.competition {
		border-radius: 10upx;
		background-color: rgb(248, 248, 248);
		position: relative;
		height: 120upx;
		padding: 20upx;
		position: relative;
		margin-bottom: 20upx;
		border-radius: 15upx;
		.desc {
			width: 66%;
			position: absolute;
			bottom: 5upx;
			color: grey;
			font-size: 24upx;
			display: block;
			.number {
				display: block;
			}
		}
	}
}
</style>
