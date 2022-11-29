<template>
	<view class="bg-grey">
		<!-- <lgd-tab :tabValue="tabValue" :tabIndex="tabIndex" @getIndex="tabChange" /> -->
		<view class="" v-if="tabIndex == 0">
			<view class="section-sports-top">
				<view class="sports-container">
					<view class="up">
						<view class="sports-type">
							<text class="selected">计时</text>
<!-- 							<text>计数</text>
							<text>自由</text> -->
						</view>
						<view class="sports-time">
							<image class="icon" src="../../static/sub.png" mode=""></image>
							<text class="time text-white">
								<uni-countdown
									:minute="timerData.minute"
									:second="timerData.second"
									color="white"
									splitorColor="white"
									:fontSize="40"
									:showDay="false"
									:start="timerData.start"
									style="font-size: 40px;"
								></uni-countdown>
							</text>
							<image class="icon" src="../../static/add.png" mode=""></image>
						</view>
						<view class="desc">
							<image src="../../static/huangguan.png" mode="heightFix"></image>
							<text class="text-white">跳绳能力</text>
						</view>
					</view>
					<view class="bottom">
						<view class="main">
							<view class="item" @click="reshen">
								<image src="http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/classroom/%E5%81%A5%E8%BA%AB.png" />
								<text>热身运动</text>
							</view>

							<view class="item start" @click="startTimer">开始</view>

							<view class="item" @click="record">
								<image src="http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/classroom/%E4%BD%9C%E4%B8%9A%E5%88%86%E9%85%8D.png" />
								<text>运动记录</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="section-sports-banner" @click="banner"><image src="http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/banner.png" mode="widthFix"></image></view>

			<view class="section-title text-black">精选动作</view>
			<view class="section-sports-jing">
				<view v-for="(item, index) in jingList" :key="index" class="cate-item" @click="chooseVideo(item)">
					<view class="bg-white image-container"><image :src="item.imgUrl" /></view>
					<view style="width: 100%;"><uni-title :title="item.title" type="h3" align="center" class="title"></uni-title></view>
				</view>
			</view>
		</view>
		<view class="" v-if="tabIndex == 1">
			<view class="section-title section-margin-top text-black">基础运动</view>
			<view class="section-sports-jing">
				<view v-for="(item, index) in trainList" :key="index" class="cate-item" @click="chooseVideo(item)">
					<view class="bg-white image-container"><image :src="item.imgUrl" /></view>
					<view style="width: 100%;"><uni-title :title="item.title" type="h3" align="center" class="title"></uni-title></view>
				</view>
			</view>

			<!-- <view class="section-title section-margin-top text-black">感统训练</view>
			<view class="section-sports-jing">
				<view v-for="(item, index) in sentimentTrainList" :key="index" class="cate-item" @click="navToAdvertTargetPage(item)">
					<view class="bg-white image-container"><image :src="item.imgUrl" /></view>
					<view style="width: 100%;"><uni-title :title="item.title" type="h3" align="center" class="title"></uni-title></view>
				</view>
			</view>

			<view class="section-title section-margin-top text-black">趣味挑战</view>
			<view class="section-sports-jing">
				<view v-for="(item, index) in funChallengeList" :key="index" class="cate-item" @click="navToAdvertTargetPage(item)">
					<view class="bg-white image-container"><image :src="item.imgUrl" /></view>
					<view style="width: 100%;"><uni-title :title="item.title" type="h3" align="center" class="title"></uni-title></view>
				</view>
			</view> -->

			<!-- <view class="section-title section-margin-top text-black">综合训练</view> -->
			<!-- 阅读列表:全部 -->
			<!-- <uni-row>
				<uni-col>
					<view class="article-list">
						<uni-row v-for="(item, index) in articleList" :key="index">
							<uni-col offset="1" :span="22">
								<view class="article">
									<uni-row>
										<uni-col span="8"><image :src="item.imgUrl" style="width: 100%; height: 120upx;" mode="aspectFill"></image></uni-col>
										<uni-col offset="1" span="15">
											<view class="text">
												<uni-title :title="item.title"></uni-title>
												<view class="desc">
													<text>{{ item.desc }}</text>
													<text class="text-right">{{ item.time }}</text>
												</view>
											</view>
										</uni-col>
									</uni-row>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</uni-col>
			</uni-row> -->
		</view>
		<view class="" v-if="tabIndex == 2">
			<view class="square-section">
				<view v-for="(item, index) in squareList" :key="index" class="cate-item" @click="navToAdvertTargetPage(item)">
					<text>{{ item.title }}</text>
					<image :src="item.imgUrl" />
				</view>
			</view>

			<uni-title title="健康检测" type="h1" align="center"></uni-title>

			<view class="cate-section">
				<view v-for="(item, index) in categoryButtomList" :key="index" class="cate-item" @click="navToAdvertTargetPage(item)">
					<image :src="item.imgUrl" />
					<text>{{ item.title }}</text>
				</view>
			</view>
		</view>
		<view class="padding" v-if="tabIndex == 3">
			<view class="section-4-top" @click="nextToScheduleDetails()">
				<text>暂无任何运动计划</text>
				<text>快去创建目标或计划吧</text>
			</view>

			<view class="flex justify-between align-center margin-tb">
				<text>每日目标</text>
				<image src="../../static/add_b8a9ff.png" style="height: 40upx;" mode="heightFix"></image>
			</view>

			<!-- 			<uni-row>
				<uni-col offset="1" :span="11">
					<uni-title title="每日目标" type="h5"></uni-title>
				</uni-col>
				<uni-col :span="11">
					<view class="text-right" style="position: relative;"></view>
				</uni-col>
			</uni-row> -->

			<view class="bg-white flex justify-between align-center padding">
				<view class="flex align-center">
					<image src="http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/goal.png" style="width: 100upx; height: 100upx;" />
					<view class="text-black text-bold">每日跳绳目标</view>
				</view>
				<view>0/100个</view>
			</view>

			<view class="margin-tb"><text>运动计划</text></view>

			<uni-card title="跳绳速成计划" extra="计划终止>" style="margin: 0">
				<view class="flex justify-evenly">
					<view>
						<uni-title title="0%" type="h1"></uni-title>
						<uni-title title="计划完成度" type="h5"></uni-title>
					</view>
					<view>
						<uni-title title="0千卡" type="h1"></uni-title>
						<uni-title title="卡路里总消耗" type="h5"></uni-title>
					</view>
					<view>
						<uni-title title="0.0小时" type="h1"></uni-title>
						<uni-title title="运动总时间" type="h5"></uni-title>
					</view>
				</view>
			</uni-card>

			<view class="section-4-bottom">
				<text class="text-white text-bold">暂无任何运动计划</text>
				<text class="text-white text-bold">快去创建目标或计划吧</text>
				<button type="default" @click="createSchedule()" class="cu-btn"><text class="text-orange">创建计划</text></button>
			</view>

			<view class="page-bottom"></view>
		</view>

		<view class="cu-modal" :class="showModal ? 'show' : ''" v-if="showModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">处理结果</view>
					<view class="action" @tap="showModal = false"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl"><video :src="videoSrc"></video></view>
			</view>
		</view>
	</view>
</template>

<script>
import http from '../../request.js';
export default {
	data() {
		return {
			videoSrc: '',
			timerData: {
				minute: 1,
				second: 0,
				start: false
			},
			showModal: false,
			tabValue: ['跳绳', '训练', '健康', '私人教练'],
			tabIndex: 1,
			squareList: [
				{ title: '身高', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/health/shengao.png' },
				{ title: '体重', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/health/tizhong.png' },
				{ title: '视力', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/health/shili.png' },
				{ title: '听力', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/health/tingli.png' },
				{ title: '色觉', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/health/sejue.png' },
				{ title: '坐位体前屈', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/health/zuoweitiqianqu.png' },
				{ title: '肺活量', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/health/feihuoliang.png' }
			],
			categoryButtomList: [
				{ title: '舌头检测', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/health/shetoujiance.png' },
				{ title: '手指检测', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/health/shouzhijiance.png' },
				{ title: '脸部检测', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/health/lianbujiance.png' },
				{ title: '综合检测', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/health/zonghejiance.png' }
			],

			jingList: [
				{ title: '排球颠球挑战', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/01.png' },
				{ title: '蹲起', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/02.png' },
				{ title: '双臂绕环', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/03.png' },
				{ title: '平板支撑', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/04.png' },
				{ title: '脚部触球训练', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/05.png' },
				{ title: '顺序摸球训练', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/06.png' }
			],

			trainList: [
				{ title: '蹲起', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/02.png' },
				{ title: '开合跳', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/kaihetiao.png' },
				{ title: '坐位体前屈', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/zuoweitiqianqu.png' },
				{ title: '双臂绕环', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/03.png' },
				{ title: '平板支撑', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/04.png' },
				{ title: '仰卧起坐', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/yangwoqizuo.png', value: 'situp' },
				{ title: '俯卧撑', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/02.png', value: 'pushup' }
			],

			sentimentTrainList: [
				{ title: '择物归类', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/zewuguilei.png' },
				{ title: '手部摸球训练', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/shoubumoqiuxunlian.png' },
				{ title: '脚部触球训练', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/jiaobuchuqiuxunlian.png' },
				{ title: '横移训练', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/hengyixunlian.png' },
				{ title: '单脚站立', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/danjiaozhanli.png' },
				{ title: '反应力训练', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/fanyinglixunlian.png' }
			],
			funChallengeList: [
				{ title: '拍球挑战', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/paiqiutiaozhan.png' },
				{ title: '排球颠球挑战', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/paiqiudianqiutiaozhan.png' },
				{ title: '顺序摸球训练', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/shunxumoqiuxunlian.png' },
				{ title: '静态姿势训练', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/jingtaizishixunlian.png' },
				{ title: '颠球训练', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/dianqiuxunlian.png' },
				{ title: '躲避障碍物训练', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/duobizhangaiwuxunlian.png' }
			],
			articleList: [
				{
					title: '身体柔韧性训练',
					desc: '让你的身体更有柔韧性吧',
					time: '4分钟',
					imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png'
				},
				{
					title: 'AI游戏化训练',
					desc: '体验游戏化训练的乐趣吧',
					time: '10分钟',
					imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png'
				},
				{
					title: '身体平衡训练',
					desc: '身体平衡训练，让身体更出彩',
					time: '2分钟',
					imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/img02.png'
				}
			]
		};
	},
	methods: {
		reshen() {
			uni.showToast({
				icon: "none",
				title: "正在开发中..."
			})
		},
		record() {
			uni.showToast({
				icon: "none",
				title: "正在开发中..."
			})
		},
		banner() {
			uni.showToast({
				icon: "none",
				title: "正在开发中..."
			})
		},
		startTimer() {
			this.timerData.start = true;
		},
		tabChange(tabIndex) {
			this.tabIndex = tabIndex;
			console.log(`current tab: ${this.tabValue[tabIndex]}`);
		},
		chooseVideo(item) {
			const self = this;
			uni.chooseVideo({
				sourceType: ['camera'],
				maxDuration: 60,
				success: function(res) {
					console.log(res);
					uni.showLoading({
						title: '正在处理视频...'
					});
					uni.uploadFile({
						url: http.baseUrl + 'utils/uploadVideo?type=' + item.value, //仅为示例，非真实的接口地址
						filePath: res.tempFilePath,
						name: 'file',
						header: {
							Authorization: uni.getStorageSync('token')
						},
						success: function(uploadFileRes) {
							const resData = JSON.parse(uploadFileRes.data);
							console.log(resData)
							// // resData.data.videoInfo = resData.data.videoInfo.replace(/NaN/g, 0);
							// console.log(JSON.parse(resData.data.videoInfo));
							// const res = JSON.parse(resData.data.videoInfo)
							// self.getTask(res.task_id)
							// // self.$refs.videoPopup.open('center');
							// self.videoSrc = JSON.parse(resData.data.videoInfo).processedVideoUrl;
							// self.showVideoModal = true;
							uni.showToast({
								title: '上传成功'
							});
							uni.hideLoading();
							self.getTask(resData.data.task_id)
						},
						fail: function(err) {
							reject(err);
							uni.hideLoading();
						}
					});
				}
			});
		},
		createSchedule() {
			uni.navigateTo({
				url: '/pages/sports-purpose-one/sports-purpose-one'
				// url: '/pages/sports-time/sports-time'
			});
		},
		nextToScheduleDetails() {
			uni.navigateTo({
				url: '/pages/schedule-details-one/schedule-details-one'
			});
		},
		getTask(id) {
			setInterval(() => {
				http.post("utils/getProcessTask",{
					task_id: id
				}).then(res=>{
					console.log(res)
					if (res.data.status === 'processing') {
						uni.showLoading()
					} else {
						uni.hideLoading()
					}
				})
			}, 1500);
		},
		hideModal() {
			self.$refs.videoPopup.close();
		}
	}
};
</script>

<style lang="less">
.section-sports-top {
	width: 94%;
	margin-left: 3%;
	position: relative;
	background-color: rgb(251, 158, 56);
	// height: 400upx;
	border-radius: 20upx;
	margin-top: 30upx;

	.sports-container {
		width: 100%;
		.up {
			width: 100%;
			color: white;

			.sports-type {
				display: flex;
				align-items: center;
				justify-content: space-around;
				height: 100upx;
				line-height: 100upx;
				text {
					display: block;
					color: rgb(235, 215, 175);
					font-size: 32upx;

					&.selected {
						color: white;
						font-size: 40upx;
					}
				}
			}

			.sports-time {
				display: flex;
				align-items: center;
				justify-content: space-around;
				height: 200upx;
				line-height: 200upx;

				.time {
					font-size: 80upx;
					font-weight: 800;
				}

				.icon {
					font-size: 100upx;
					height: 80upx;
					width: 80upx;
					line-height: 80upx;
					color: rgb(251, 158, 56);
					text-align: center;

					image {
						width: 80upx;
						height: 80upx;
					}
				}
			}

			.desc {
				background-color: rgb(241, 151, 51);
				height: 120upx;
				line-height: 120upx;
				box-sizing: border-box;
				padding-left: 30upx;
				color: white;
				display: flex;
				align-items: left;
				// justify-content: space-around;
				position: relative;
				image {
					height: 40upx;
					position: absolute;
					top: 40upx;
				}

				text {
					display: inline-block;
					margin-left: 60upx;
				}
			}
		}
		.bottom {
			background-color: white;
			height: 300upx;
			border-bottom-left-radius: 20upx;
			border-bottom-right-radius: 20upx;
			.main {
				display: flex;
				align-items: center;
				justify-content: space-around;
				.item {
					display: flex;
					align-items: center;
					justify-content: space-around;
					flex-direction: column;

					min-height: 120upx;

					image {
						width: 80upx;
						height: 80upx;
					}

					text {
						margin-top: 20upx;
					}

					&.start {
						background-color: rgb(253, 180, 31);
						margin: 50upx 0;
						width: 200upx;
						height: 200upx;
						border-radius: 50%;
						color: white;
						font-size: 40upx;
					}
				}
			}
		}
	}
}

.section-sports-banner {
	width: 94%;
	margin-left: 3%;
	margin-top: 20upx;
	margin-bottom: 20upx;

	image {
		width: 100%;
	}
}

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
		color: #dcdfe6;
		min-width: 42%;
		margin: 4%;
		height: 300upx;
		border-radius: 5%;

		.image-container {
			width: 100%;
			height: 250upx;
			border-radius: 20upx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
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
		margin: 20upx 0;
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

.bg-grey {
	background-color: rgb(247, 247, 247);
}
/* 方形模块 */
.square-section {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	padding-top: 30upx;
	.cate-item {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		align-items: flex-start;
		font-size: 26upx;
		// color: #DCDFE6;
		min-width: 28%;
		margin: 2%;
		background-color: white;
		height: 25vw;
		margin-bottom: 3vw;
		padding-left: 5%;
		padding-top: 2%;
		border-radius: 5%;
	}
	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 88upx;
		height: 88upx;
		margin-bottom: 14upx;
	}
}

/* 分类 */
.cate-section {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 30upx 22upx;
	.cate-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 26upx;
		color: #dcdfe6;
		min-width: 25%;
	}
	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 88upx;
		height: 88upx;
		margin-bottom: 14upx;
		border-radius: 50%;
		box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
	}
}

.section-4-top {
	background-color: white;
	margin-top: 20upx;
	height: 200upx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	border-radius: 20upx;
}

.section-4-daily-goal {
	background-color: white;
	// height: 150upx;
	border-radius: 20upx;
	text-align: center;

	.height-100 {
		display: flex;
		justify-content: center;
		align-items: center;
		vertical-align: center;
	}
}

.section-4-bottom {
	background-color: rgb(255, 208, 55);
	color: white;
	margin-top: 20upx;
	height: 250upx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	border-radius: 20upx;
}
</style>
