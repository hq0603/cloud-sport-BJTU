<template>
	<view>
		<uni-row class="demo-uni-row">
			<uni-col :offset="1" :span="11">
				<view class="demo-uni-col"><uni-icons type="person-filled" size="30" @click="open()"></uni-icons></view>
			</uni-col>
			<!-- <uni-popup ref="popup" type="dialog">
				<uni-popup-dialog title="信息录入" mode="input" :before-close="true" @close="close" @confirm="confirm">
					<template>
						<uni-forms ref="form" :modelValue="formData" :rules="rules">
							<uni-forms-item label="姓名" name="name"><uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" /></uni-forms-item>
							<uni-forms-item label="性别" name="gender">
								<radio-group name="gender" @change="genderChange">
									<label>
										<radio :value="0" />
										<text>男</text>
										<radio :value="1" class="margin-left-sm" />
										<text>女</text>
									</label>
								</radio-group>
							</uni-forms-item>
							<uni-forms-item label="学号" name="student_number"><uni-easyinput v-model="formData.email" type="text" placeholder="请输入学号" /></uni-forms-item>
							<uni-forms-item label="学院" name="college"><uni-easyinput v-model="formData.college" type="text" placeholder="请输入专业" /></uni-forms-item>
							<uni-forms-item label="专业" name="major"><uni-easyinput v-model="formData.major" type="text" placeholder="请输入专业" /></uni-forms-item>
						</uni-forms>
					</template>
				</uni-popup-dialog>
			</uni-popup> -->
			<uni-col :span="11">
				<view class="demo-uni-col text-right" style="line-height: 80upx;"><uni-icons type="more-filled" size="30"></uni-icons></view>
			</uni-col>
		</uni-row>

		<view>
			<uni-row>
				<uni-col>
					<view class="section-0-top">
						<!-- <uni-title title="北京交通大学" type="h1" color="white"></uni-title> -->
						<view style="font-size: 40upx; font-weight: 800; margin-top: 20upx;">北京交通大学</view>
						<uni-row>
							<uni-col :span="23">
								<view style="float: right; font-weight: 600;">{{ userInfo.student_number || '暂无' }}</view>
							</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="11"><view style="font-weight: 600;">2021-2022下学期</view></uni-col>
							<uni-col :span="12">
								<view style="float: right; font-weight: 600;">{{ userInfo.name || '暂无' }}</view>
							</uni-col>
						</uni-row>
					</view>
				</uni-col>
			</uni-row>
		</view>

		<!-- 轮播下五按钮 -->
		<view class="cate-section">
			<view v-for="(item, index) in categoryButtomList" :key="index" class="cate-item margin-tb-sm" @click="navToAdvertTargetPage(item)">
				<image :src="item.imgUrl" />
				<text>{{ item.title }}</text>
			</view>
		</view>

		<!-- 阅读列表 -->
		<uni-row>
			<uni-col>
				<view class="article-list">
					<view class="flex justify-between align-center padding-lr-sm">
						<uni-title title="推荐阅读" type="h2"></uni-title>
						<view class="text-right" style="color: grey; line-height: 80upx;" @click="checkMoreNews">更多专题></view>
					</view>
					<uni-row v-for="(item, index) in articleList" :key="index">
						<uni-col :offset="1" :span="22">
							<view class="article" @click="navToNews(item)">
								<uni-row>
									<uni-col :span="16">
										<view class="text">
											<!-- <uni-title :title="item.title"></uni-title> -->
											<view>
												<text v-if="item.is_topping" class="top-icon">置顶</text>
												<text>{{ item.news_title }}</text>
											</view>  
											<view class="desc">
												<text>{{ item.reading_number }}人阅读 · {{ item.news_release_time }}</text>
											</view>
										</view>
									</uni-col>
									<uni-col :span="8"><image :src="item.news_cover" style="width: 100%; height: 120upx;" mode="aspectFill"></image></uni-col>
								</uni-row>
							</view>
						</uni-col>
					</uni-row>

					<view class="text-black text-center margin-tb" v-if="pageData.loading || pageData.isLoadAll">{{ pageData.loadingTxt }}</view>
				</view>
			</uni-col>
		</uni-row>

		<!-- AI上传选择类型 -->
		<view class="cu-modal" :class="showAIHomeworkModal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">选择运动类型</view>
					<view class="action" @tap="hideAIHomeworkModal"><text class="cuIcon-close text-grey"></text></view>
				</view>
				<view class="padding bg-white">
					<radio-group class="block" @change="AIRadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item, index) in AIHomeworkTypeList" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{ item.title }}</view>
									<radio class="round" color="#007df0" :checked="AIHomeworkChooseType === item.title" :value="item.title"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-blue" @tap="hideAIHomeworkModal">取消</button>
						<button class="cu-btn bg-blue margin-left" @tap="uploadAIVideo">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import http from '../../request.js';
const dayjs = require('dayjs');
export default {
	data() {
		return {
			pageData: {
				page: 1,
				pageSize: 10,
				loadingTxt: '加载中...',
				isLoadAll: false,
				loading: true
			},
			formData: {
				name: '',
				student_number: '',
				college: '',
				major: '',
				gender: ''
			},
			rules: {
				name: {
					rules: [
						{
							required: true,
							errorMessage: '请输入姓名'
						}
					]
				},
				student_number: {
					rules: [
						{
							required: true,
							errorMessage: '请输入学号'
						},
						{
							format: 'number',
							errorMessage: '请输入正确的学号'
						}
					]
				}
			},
			categoryButtomList: [
				{
					title: '教学视频',
					imgUrl: '../../static/cloud-class/video.svg'
				},
				{
					title: '师生交流',
					imgUrl: '../../static/cloud-class/chat.svg'
				},
				{
					title: '我的课程',
					imgUrl: '../../static/cloud-class/class.svg'
				},
				{
					title: '打卡学习',
					imgUrl: '../../static/cloud-class/sign.svg'
				},
				{
					title: '打卡锻炼',
					imgUrl: '../../static/cloud-class/exercise.svg'
				},
				{
					title: 'AI作业上传',
					imgUrl: '../../static/cloud-class/homework.svg'
				},
				{
					title: '直播课堂',
					imgUrl: '../../static/cloud-class/live.svg'
				},
				{
					title: '校园活动',
					imgUrl: '../../static/cloud-class/activity.svg'
				},
			],
			articleList: [],
			userInfo: '',
			showAIHomeworkModal: false,
			AIHomeworkChooseType: '',
			AIHomeworkTypeList: [
				{
					title: '俯卧撑'
				},
				{
					title: '跳绳'
				},
				{
					title: '立定跳远'
				},
				{
					title: '蹲起'
				},
				{
					title: '开合跳'
				},
				{
					title: '坐位体前屈'
				},
				{
					title: '双臂绕环'
				},
				{
					title: '平板支撑'
				},
				{
					title: '仰卧起坐'
				},
				{
					title: '引体向上'
				}
			]
		};
	},
	methods: {
		// 跳转到广告目标页
		navToAdvertTargetPage(advert) {
			console.log(advert);
			// 针对Advert Type 不同做不同跳转
			if (advert.title === 'AI作业上传') {
				this.showAIHomeworkModalFunc();
				return;
			}
			if (advert.title === '师生交流') {
				uni.navigateTo({
					url:"/pages/cloud-classroom/communication/communication"
				})
				return
			}
			// const { unionType, unionValue } = advert;
			// let url = '/pages/index/index';
			// if (unionType === 1) {
			// 	url = '/pages/product/detail?id=' + unionValue;
			// } else if (unionType === 2) {
			// 	url = '/pages/product/list?tid=' + unionValue;
			// } else if (unionType === 3) {
			// 	url = '/pages/product/list?keyword=' + unionValue;
			// } else if (unionType === 4) {
			// 	url = unionValue;
			// }
			// uni.navigateTo({
			// 	url: url
			// });
			uni.showToast({
				icon:'none',
				title: "正在开发中..."
			})
		},

		checkMoreNews() {
			uni.switchTab({
				url: '/pages/square/square'
			});
		},

		AIRadioChange(item) {
			this.AIHomeworkChooseType = item.detail.value;
		},

		genderChange(evt) {
			this.formData.gender = evt.detail.value;
		},

		navToNews(item) {
			uni.navigateTo({
				url: '/pages/news-detail/news-detail?id=' + item.uuid
			});
		},

		getNewsData(type) {
			this.pageData.loading = true;
			http.post('news/getAllNews', {
				page: this.pageData.page,
				page_size: this.pageData.pageSize,
				type: parseInt(type)
			})
				.then(res => {
					console.log(res);
					if (res.news && res.news.length !== 0) {
						this.pageData.page++;
						let list = res.news.map(v => {
							if (!v.news_cover) {
								v.news_cover =
									'https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/news_cover/%E5%9B%BE%E6%80%AA%E5%85%BD_a9df69d2eb669fe66d3fde9b325cdb36_23762.png';
							}
							v.news_release_time = dayjs(v.news_release_time).format('YYYY-MM-DD');

							console.log(v.news_cover);
							return v;
						});
						this.articleList.push(...list);
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

		open() {
			// this.$refs.popup.open();
			uni.navigateTo({
				url:"/pages/userInfo/userInfo"
			})
		},

		close() {
			this.$refs.popup.close();
		},

		confirm(value) {
			this.$refs.form
				.validate()
				.then(res => {
					console.log(res)
					http.post('user/update', {
						name: res.name,
						student_number: res.student_number.toString(),
						major: res.major,
						college: res.college,
						gender: parseInt(res.gender)
					}).then(res => {
						console.log(res)
						// this.userInfo = res.userInfo;
						// uni.setStorageSync('user-info', this.userInfo);
						uni.showToast({
							icon: 'none',
							title: '更新成功'
						});
					});
					this.$refs.popup.close();
				})
				.catch(err => {
					console.log('表单错误信息：', err);
					uni.showToast({
						icon: 'none',
						title: '请检查表单'
					});
				});
			// this.$refs.popup.close()
		},
		showAIHomeworkModalFunc() {
			this.showAIHomeworkModal = true;
		},
		uploadAIVideo() {
			if (!this.AIHomeworkChooseType) {
				uni.showToast({
					icon: 'none',
					title: '请选择运动类型'
				});
				return;
			}
			const self = this;
			uni.chooseVideo({
				sourceType: ['album'],
				maxDuration: 60,
				success: function(res) {
					console.log(res);
					wx.showLoading({
						title: '正在上传视频...'
					});
					uni.uploadFile({
						url: http.baseUrl + 'utils/uploadAIHomeworks?type=' + self.AIHomeworkChooseType,
						filePath: res.tempFilePath,
						name: 'video',
						header: {
							Authorization: uni.getStorageSync('token')
						},
						success: function(uploadFileRes) {
							wx.showToast({
								title: '上传成功'
							});
							wx.hideLoading();
							self.hideAIHomeworkModal();
						},
						fail: function(err) {
							reject(err);
							wx.showToast({
								icon: 'error',
								title: '上传失败'
							});
							wx.hideLoading();
						}
					});
				}
			});
		},
		hideAIHomeworkModal() {
			this.showAIHomeworkModal = false;
		}
	},
	onLoad() {
		this.userInfo = uni.getStorageSync('user-info');
	},
	mounted() {
		this.getNewsData(1);
	}
};
</script>

<style lang="less" scoped>
.section-0-top {
	width: 94%;
	margin: 0 3%;
	background-color: rgb(89, 111, 169);
	border-radius: 10upx;
	color: white;
	box-sizing: border-box;
	padding: 20upx;
}

.demo-uni-row {
	margin-bottom: 10px;
	/* QQ、字节小程序文档写有 :host，但实测不生效 */
	/* 百度小程序没有 :host，需要设置block */
	/* #ifdef MP-TOUTIAO || MP-QQ || MP-BAIDU */
	display: block;
	/* #endif */
}

/* 支付宝小程序没有 demo-uni-row 层级 */
/* 微信小程序使用了虚拟化节点，没有 demo-uni-row 层级 */
/* #ifdef MP-ALIPAY || MP-WEIXIN */
/deep/ .uni-row {
	margin-bottom: 10px;
}

/* #endif */

.demo-uni-col {
	height: 36px;
	border-radius: 4px;
}

.dark_deep {
	background-color: rgb(89, 111, 169);
	color: white;
}

.dark {
	background-color: #d3dce6;
}

.light {
	background-color: #e5e9f2;
}

/* 分类 */
.cate-section {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 30upx 22upx;
	background: #fff;

	.cate-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 26upx;
		color: #000000;
		min-width: 25%;
	}

	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 88upx;
		height: 88upx;
		margin-bottom: 14upx;
		border-radius: 50%;
		// opacity: .7;
		// box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
	}
}

.article-list {
	margin-top: 30upx;
	background-color: white;

	.article {
		position: relative;
		height: 120upx;
		padding: 20upx;
		border-bottom: 1px solid #e0e0e0;

		.desc {
			width: 66%;
			position: absolute;
			bottom: 5upx;
			color: grey;
			font-size: 24upx;

			.text-right {
				float: right;
			}
		}

		.top-icon {
			display: inline-block;
			background-color: red;
			padding: 5upx 10upx;
			color: white;
			font-size: 24upx;
			line-height: 34upx;
			border-radius: 5upx;
		}
	}
}
</style>
