<template>
	<view class="bg-grey">
		<!-- <lgd-tab :tabValue="tabValue" :tabIndex="tabIndex" @getIndex="tabChange" /> -->
		<view class="" v-if="tabIndex == 0">
			<view class="section-0-top">
				<view v-for="(item, index) in squareList" :key="index" class="cate-item" @click="navToAdvertTargetPage(item)">
					<image :src="item.imgUrl" />
					<uni-title :title="item.title" type="h3" class="title"></uni-title>
				</view>
			</view>

			<view class="section-title section-margin-top text-black">非径类项目</view>

			<view class="section-0-jing">
				<view v-for="(item, index) in notJingList" :key="index" class="cate-item" @click="showAction(item)">
					<view class="bg-white image-container"><image :src="item.imgUrl" mode="widthFix" /></view>
					<uni-title :title="item.title" type="h3" class="title"></uni-title>
				</view>
			</view>

			<view class="cu-modal" :class="showActionModal ? 'show' : ''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">身份验证</view>
						<view class="action" @tap="showActionModal = false"><text class="cuIcon-close text-red"></text></view>
					</view>
					<view class="padding-xl text-black text-xxl bg-white"><button class="cu-btn bg-blue" @tap="action">点击验证</button></view>
				</view>
			</view>

			<!-- <view class="section-title section-margin-top">
				径类项目
			</view>
			
			<view class="section-0-jing">
				<view v-for="(item, index) in jingList" :key="index" class="cate-item" @click="navToAdvertTargetPage(item)">
					<view class="bg-white image-container">
						<image :src="item.imgUrl" />
					</view>
					<uni-title :title="item.title" type="h3" class="title"></uni-title>
				</view>
			</view> -->
		</view>

		<view class="" v-if="tabIndex == 1">
			<lgd-tab :tabValue="section1TabValue" :tabIndex="section1TabIndex" @getIndex="section1TabChange" />
			<view class="section-1-top">
				<uni-row>
					<uni-col :span="18">
						<view class="">
							<text class="title">{{ userInfo.name }}</text>
							<text class="icon">优秀</text>
							<text>学号:{{ userInfo.student_number || '暂无' }}</text>
							<text>体测状态:正常 体测说明:暂无</text>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="score-container">
							<text>得分:{{ '暂无' }}</text>
						</view>
					</uni-col>
				</uni-row>
			</view>

			<view class="section-1-detail">
				<uni-row v-for="(item, index) in section1ScoreList" :key="index">
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<text class="name">{{ item.name }}:</text>
							<text>{{ item.value || '暂无' }}</text>
						</view>
						<view>
							<text class="icon">{{ item.desc }}</text>
						</view>
					</view>
					<!-- 					<uni-col span="10">
						<text class="name">{{ item.name }}</text>
					</uni-col>
					<uni-col span="10">
						<text>{{ item.value }}</text>
					</uni-col>
					<uni-col span="4" v-if="item.value">
						<text class="icon">{{ item.desc }}</text>
					</uni-col>
					<uni-col offset="10" span="4" v-else>
						<text class="link">{{ item.desc }}</text>
					</uni-col> -->
				</uni-row>
				<uni-row>
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<text class="name">{{ eye_degree.name }}:</text>
							<text>{{ eye_degree.value }}</text>
						</view>
						<view>
							<text class="link" @click="open()">{{ eye_degree.desc }}</text>
						</view>
					</view>
					<!-- 					<uni-col span="4">
						<text class="icon">{{ eye_degree.desc }}</text>
					</uni-col> -->
					<!-- 					<uni-col offset="10" span="4">
						<text class="link" @click="open()">{{ eye_degree.desc }}</text>
					</uni-col> -->
					<uni-popup ref="popup" background-color="#fff">
						<view class="popup-content">
							<text class="text">左眼视力:{{ eye_degree.left_value || '暂无' }}</text>
							<text class="text">右眼视力:{{ eye_degree.right_value || '暂无' }}</text>
						</view>
					</uni-popup>
				</uni-row>
			</view>
		</view>

		<view class="" v-if="tabIndex == 2">
			<uni-section title="总分排名" type="line">
				<uni-list><uni-list-item v-for="(item, index) in rankList" :title="item.name" :rightText="item.data.score" :key="index" /></uni-list>
			</uni-section>

			<view class="margin-top">
				<picker @change="bindPickerChange" :value="singleIndex" :range="singlePickerList" range-key="title">
					<button class="picker cu-btn"><text class="cuIcon-btn text-blue"></text>{{ singlePickerList[singleIndex].title }}</button>
				</picker>
				<uni-section :title="singlePickerList[singleIndex].title+`排名`" type="line">
					<uni-list><uni-list-item v-for="(item, index) in signleRankList" :title="item.name" :rightText="item.data[singlePickerList[singleIndex].value]" :key="index" /></uni-list>
				</uni-section>
			</view>
		</view>
	</view>
</template>

<script>
import http from '../../request.js';
export default {
	data() {
		return {
			tabValue: ['以测代练', '成绩查询', '成绩排名'],
			tabIndex: 0,
			showActionModal: false,
			chooseTestItem: null,
			singlePickerList: [
				{
					title: '引体向上',
					value: "pull_out_sit_up"
				},
				{
					title: '立定跳远',
					value: "standing_jump"
				},
				{
					title: '坐位体前屈',
					value: "sit_forward"
				},
			],
			singleIndex: 0,
			squareList: [
				{ title: '体测公告', imgUrl: 'https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/common/sport-test/公告.png' },
				{ title: '体测预约', imgUrl: 'https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/common/sport-test/体测预约.png' },
				{ title: '免测申请', imgUrl: 'https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/common/sport-test/免测申请.png' },
				{ title: '评分标准', imgUrl: 'https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/common/sport-test/评分标准.png' }
			],
			notJingList: [
				{ title: '坐位体前屈', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/tc_zuoweitiqianqu.png' },
				{ title: '仰卧起坐', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/tc_yangwoqizuo.png' },
				{ title: '立定跳远', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/jingxuandongzuo/tc_lidingtiaoyuan.png' },
				{ title: '引体向上', imgUrl: 'https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/common/%E5%BC%95%E4%BD%93%E5%90%91%E4%B8%8A.png' }
			],
			jingList: [
				{ title: '50m跑', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/126D185A.png' },
				{ title: '100m跑', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/126D185A.png' },
				{ title: '1000m跑', imgUrl: 'http://typora-maidong.oss-cn-beijing.aliyuncs.com/typora/img/126D185A.png' }
			],
			section1TabValue: ['2022', '2021', '2020', '2019', '2018'],
			section1TabIndex: 0,
			section1ScoreList: [
				{ name: '身高体重（厘米/千克）', value: '', desc: '正常' },
				{ name: '肺活量（毫升）', value: '', desc: '良好' },
				{ name: '立定跳远（厘米）', value: '', desc: '优秀' },
				{ name: '坐位体前屈（厘米）', value: '', desc: '及格' },
				{ name: '引体/仰卧（次）', value: '', desc: '及格' },
				{ name: '50米（秒）', value: '', desc: '优秀' },
				{ name: "800/1000米（分'秒）", value: '', desc: '优秀' }
			],
			eye_degree: {
				name: '视力',
				left_value: '',
				right_value: '',
				desc: '点击查看'
			},
			userInfo: '',
			rankList: [],
			signleRankList: []
		};
	},
	methods: {
		bindPickerChange(e) {
			this.singleIndex = e.detail.value
		},
		tabChange(tabIndex) {
			this.tabIndex = tabIndex;
			console.log(`current tab: ${this.tabValue[tabIndex]}`);
		},
		section1TabChange(tabIndex) {
			this.section1TabIndex = tabIndex;
			console.log(`current section 1 tab: ${this.section1TabValue[tabIndex]}`);
			http.post('score/getScore', {
				year: this.section1TabValue[tabIndex]
			}).then(res => {
				console.log(res);
				this.section1ScoreList[0].value = res.scoreInfo.height_weight;
				this.section1ScoreList[1].value = res.scoreInfo.vital_capacity;
				this.section1ScoreList[2].value = res.scoreInfo.standing_jump;
				this.section1ScoreList[3].value = res.scoreInfo.sit_forward;
				this.section1ScoreList[4].value = res.scoreInfo.pull_out_sit_up;
				this.section1ScoreList[5].value = res.scoreInfo.run_50;
				this.section1ScoreList[6].value = res.scoreInfo.run_800_1000;
				// this.section1ScoreList[7].score = res.scoreInfo.score;
				this.eye_degree.left_value = res.scoreInfo.left_eye_degree;
				this.eye_degree.right_value = res.scoreInfo.right_eye_degree;
			});
		},
		showAction(item) {
			this.showActionModal = true;
			this.chooseTestItem = item;
		},
		navToAdvertTargetPage() {
			uni.showToast({
				icon: 'none',
				title: '正在开发中...'
			});
		},
		action() {
			console.log(this.chooseTestItem)
			const self = this;
			this.showActionModal = false;
			uni.checkIsSupportSoterAuthentication({
				success(res) {
					console.log(res.supportMode);
					if (res.supportMode && res.supportMode.length === 0) {
						uni.showToast({
							icon: 'none',
							title: '不支持身份认证'
						});
					} else {
						let mode = '';
						let info = '';
						if (res.supportMode.includes('facial')) {
							mode = 'facial';
							info = '请使用FaceID验证身份';
						}
						if (res.supportMode.includes('fingerPrint')) {
							mode = 'fingerPrint';
							info = '请使用指纹验证身份';
						}

						uni.startSoterAuthentication({
							requestAuthModes: [mode],
							challenge: '123456',
							authContent: info,
							success(res) {
								console.log(res);
								if (res.errCode === 0) {
									// self.chooseVideo();
									uni.navigateTo({
										url: '/pages/webview/webview?title='+self.chooseTestItem.title
									});
								}
							},
							fail(err) {
								uni.showToast({
									icon: 'none',
									title: '身份验证失败'
								});
							}
						});
					}
				},
				fail(err) {
					console.log(err);
				}
			});
		},
		chooseVideo() {
			const self = this;
			uni.chooseVideo({
				sourceType: ['camera'],
				maxDuration: 60,
				success: function(res) {
					console.log(res);
					wx.showLoading({
						title: '正在处理视频...'
					});
					uni.uploadFile({
						url: http.baseUrl + 'utils/uploadVideo?type=', //仅为示例，非真实的接口地址
						filePath: res.tempFilePath,
						name: 'video',
						header: {
							'Content-Type': 'multipart/form-data',
							accept: 'application/json',
							Authorization: uni.getStorageSync('token')
						},
						success: function(uploadFileRes) {
							const resData = JSON.parse(uploadFileRes.data);
							resData.data.videoInfo = resData.data.videoInfo.replace(/NaN/g, 0);
							console.log(JSON.parse(resData.data.videoInfo));
							self.$refs.videoPopup.open('center');
							self.videoSrc = JSON.parse(resData.data.videoInfo).processedVideoUrl;
							self.showVideoModal = true;
							wx.showToast({
								title: '上传成功'
							});
							wx.hideLoading();
						},
						fail: function(err) {
							reject(err);
							wx.hideLoading();
						}
					});
				}
			});
		},
		open() {
			this.$refs.popup.open('center');
		},
		getRank(type) {
			http.post('score/getScoreRank',{
				type
			}).then(res => {
				this.rankList = res.list;
			});
		},
		getSingleRankList(type) {
			http.post('score/getScoreRank',{
				type
			}).then(res => {
				this.signleRankList = res.list;
			});
		}
	},
	onShow() {
		// this.userInfo = uni.getStorageSync('user-info')
		this.getRank();
		this.getSingleRankList(this.singlePickerList[this.singleIndex].value)
	}
};
</script>

<style lang="less">
.bg-grey {
	background-color: rgb(247, 247, 247);
}
/* 方形模块 */
.section-0-top {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	background-color: #fff;
	margin-top: 20upx;
	.cate-item {
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		align-items: center;
		font-size: 26upx;
		color: #dcdfe6;
		min-width: 46%;
		margin: 2%;
		background-color: white;
		height: 25vw;
		padding-left: 5%;
		border-radius: 5%;
		width: 46%;
		height: 150upx;
	}
	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 100upx;
		height: 100upx;
		margin-right: 10%;
		opacity: 0.7;
	}
}

.section-0-jing {
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
		min-width: 46%;
		margin: 2%;
		height: 300upx;
		margin-bottom: 3vw;
		padding-top: 2%;
		border-radius: 5%;

		.image-container {
			width: 100%;
			height: 230upx;
			border-radius: 20upx;

			image {
				width: 100%;
				height: 150upx;
				margin-bottom: 14upx;
				opacity: 0.7;
			}
		}
	}
}
.section-1-top {
	background-color: white;
	margin: 20upx 20upx;
	padding: 30upx;

	text {
		display: block;
		color: grey;
		font-size: 24upx;

		&.icon {
			background-color: rgb(11, 157, 173);
			color: white;
			display: inline-block;
			// width: 100upx;
			padding: 10upx 20upx;
			border-radius: 10upx;
			margin-bottom: 10upx;
		}

		&.title {
			font-size: 28upx;
			color: black;
		}
	}

	.score-container {
		display: flex;
		align-items: center;
		vertical-align: center;
		justify-content: center;
		height: 160upx;
		color: grey;
		font-size: 28upx;
	}
}

.section-1-detail {
	background-color: white;
	margin: 20upx 20upx;
	padding: 30upx;

	text {
		display: block;
		color: grey;
		font-size: 24upx;

		&.icon {
			background-color: rgb(11, 157, 173);
			color: white;
			display: inline-block;
			// width: 100upx;
			padding: 10upx 20upx;
			border-radius: 10upx;
			margin-bottom: 10upx;
		}

		&.title {
			font-size: 28upx;
			color: black;
		}

		&.link {
			color: red;
		}
	}

	.score-container {
		display: flex;
		align-items: center;
		vertical-align: center;
		justify-content: center;
		height: 160upx;
		color: grey;
		font-size: 28upx;
	}
}

.popup-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	flex-wrap: nowrap;
	padding: 15upx;
	height: 200upx;
	width: 200upx;
	background-color: #fff;
}

.text {
	font-size: 12px;
	color: #333;
}
</style>
