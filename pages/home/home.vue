<template>
	<view class="bg-white" style="height: 100%;">
		<image src="https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/common/基础功能.png" mode="widthFix" class="response"></image>
		<view class="nav-list">
			<view
				hover-class="none"
				class="nav-li"
				:class="'bg-' + item.color"
				:style="[{ animation: 'show ' + ((index + 1) * 0.2 + 1) + 's 1' }]"
				v-for="(item, index) in elements"
				:key="index"
				@click="action(item.name)"
			>
				<view class="nav-title">{{ item.title }}</view>
				<view class="nav-name">{{ item.name }}</view>
				<text :class="'text-white cuIcon-' + item.cuIcon"></text>
			</view>
		</view>
		<!-- 选择HW类型之后的弹窗 -->	
		<view class="cu-modal" :class="showexample ? 'show' : ''">
			<view class='popup-container bg-white justify-end'>
				<view class="cu-bar bg-white justify-end">
					<view class="action" @tap="hideshowexample"><text class="cuIcon-close text-grey"></text></view>
				</view>
				<view class="wx-popup-title">请根据以下给出的教程进行视频录制</view>
                 <view class="wx-popup-con">
					 <image src="https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/common/基础功能.png" mode="widthFix" class="response"></image>
				 </view>
				 <view class="cu-bar bg-white justify-end">
				 	<view class="action">
				 		<button class="cu-btn line-blue text-blue" @tap="hideshowexample">取消</button>
				 		<button class="cu-btn bg-blue margin-left" @tap="showChooseModel">确定</button>
				 	</view>
		     </view>
			</view>
			</view>
		<!-- 选择上传本地视频或者录制 -->
		<view class="cu-modal" :class="ChooseModel ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">录制或者本地选择</view>
					<view class="action" @tap="hideChooseModel"><text class="cuIcon-close text-grey"></text></view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-blue" @tap="hideChooseModel">返回上一页</button>
						<button class="cu-btn bg-blue margin-left" @tap="recordVideo">录制</button>
						<button class="cu-btn bg-blue margin-left" @tap="uploadAIVideo">本地选择</button>
					</view>
				</view>
			</view>
		</view>	
			
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
						<button class="cu-btn bg-blue margin-left" @tap="showshowexample">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from "../../request.js"
export default {
	name: 'basics',
	data() {
		return {
			ChooseModel: false,
			showexample: false,
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
			],
			elements: [
				{
					title: '体测',
					name: 'measurement',
					color: 'cyan',
					cuIcon: 'newsfill'
				},
				{
					title: '锻炼计划',
					name: 'schedule',
					color: 'blue',
					cuIcon: 'footprint'
				},
				{
					title: '作业上传',
					name: 'homework',
					color: 'purple',
					cuIcon: 'font'
				},
				{
					title: 'webview',
					name: 'webview',
					color: 'orange',
					cuIcon: 'font'
				}
				// {
				// 	title: '图标 ',
				// 	name: 'icon',
				// 	color: 'mauve',
				// 	cuIcon: 'cuIcon'
				// },
				// {
				// 	title: '按钮',
				// 	name: 'button',
				// 	color: 'pink',
				// 	cuIcon: 'btn'
				// },
				// {
				// 	title: '标签',
				// 	name: 'tag',
				// 	color: 'brown',
				// 	cuIcon: 'tagfill'
				// },
				// {
				// 	title: '头像',
				// 	name: 'avatar',
				// 	color: 'red',
				// 	cuIcon: 'myfill'
				// },
				// {
				// 	title: '进度条',
				// 	name: 'progress',
				// 	color: 'orange',
				// 	cuIcon: 'icloading'
				// },
				// {
				// 	title: '边框阴影',
				// 	name: 'shadow',
				// 	color: 'olive',
				// 	cuIcon: 'copy'
				// },
				// {
				// 	title: '加载',
				// 	name: 'loading',
				// 	color: 'green',
				// 	cuIcon: 'loading2'
				// }
			]
		};
	},
	methods: {
		action(name) {
			if (name === 'measurement') {
				uni.navigateTo({
					url: '/pages/sports-test/sports-test'
				});
			}
			if (name === 'schedule') {
				uni.navigateTo({
					url: '/pages/sports-schedule/sports-schedule'
				});
			}
			if (name === 'homework') {
				this.showAIHomeworkModal = true
			}
			if (name === 'webview') {
				uni.navigateTo({
					url: "/pages/webview/webview"
				})
			}
		},
		onShareAppMessage: function () {
		  
		},
		AIRadioChange(item) {
			this.AIHomeworkChooseType = item.detail.value;
		},
		hideAIHomeworkModal() {
			this.showAIHomeworkModal = false;
		},
		hideshowexample() {
			this.showexample = false;
			this.showAIHomeworkModal=true;
		},
		showshowexample() {
			if (!this.AIHomeworkChooseType) {
				uni.showToast({
					icon: 'none',
					title: '请选择运动类型'
				});
				return;
			}
			this.showAIHomeworkModal=false;
			this.showexample = true;
		},
		showChooseModel() {
			this.showAIHomeworkModal=false;
			this.showexample = false;
			this.ChooseModel = true;
		},
		hideChooseModel() {
			this.showAIHomeworkModal = false;
			this.ChooseModel = false;
			this.showexample = true;
		},
		uploadAIVideo() {
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
		recordVideo() {
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
						url: http.baseUrl + 'utils/uploadVideo?type=' + self.AIHomeworkChooseType, 
						filePath: res.tempFilePath,
						name: 'file',
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
	},
	
	onShow() {
		console.log('success');
	}
};
</script>

<style lang="scss" scoped>
.page {
	height: 100vh;
}
.popup-container {
  position: absolute;
  left: 50%;
  top: 50%;
   
  width: 100%;
  max-width: 1200rpx;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
  box-sizing: bordre-box;
  transform: translate(-50%, -50%); 
  overflow: hidden;
  background: #fff;
}
.wx-popup-title {
  width: 100%;
  padding: 20rpx;
  text-align: center;
  font-size: 40rpx;
  border-bottom: 2rpx solid red;
}
.wx-popup-con {
  margin: 60rpx 10rpx;
  text-align: center;
}
.nav-list {
	display: flex;
	flex-wrap: wrap;
	padding: 0px 40upx 0px;
	justify-content: space-between;
}

.nav-li {
	padding: 30upx;
	border-radius: 12upx;
	width: 90%;
	margin: 0 2.5% 40upx;
	background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
	background-size: cover;
	background-position: center;
	position: relative;
	z-index: 1;
}

.nav-li::after {
	content: '';
	position: absolute;
	z-index: -1;
	background-color: inherit;
	width: 100%;
	height: 100%;
	left: 0;
	bottom: -10%;
	border-radius: 10upx;
	opacity: 0.2;
	transform: scale(0.9, 0.9);
}

.nav-li.cur {
	color: #fff;
	background: rgb(94, 185, 94);
	box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
}

.nav-title {
	font-size: 32upx;
	font-weight: 300;
}

.nav-title::first-letter {
	font-size: 40upx;
	margin-right: 4upx;
}

.nav-name {
	font-size: 28upx;
	text-transform: Capitalize;
	margin-top: 20upx;
	position: relative;
}

.nav-name::before {
	content: '';
	position: absolute;
	display: block;
	width: 40upx;
	height: 6upx;
	background: #fff;
	bottom: 0;
	right: 0;
	opacity: 0.5;
}

.nav-name::after {
	content: '';
	position: absolute;
	display: block;
	width: 100upx;
	height: 1px;
	background: #fff;
	bottom: 0;
	right: 40upx;
	opacity: 0.3;
}

.nav-name::first-letter {
	font-weight: bold;
	font-size: 36upx;
	margin-right: 1px;
}

.nav-li text {
	position: absolute;
	right: 30upx;
	top: 30upx;
	font-size: 52upx;
	width: 60upx;
	height: 60upx;
	text-align: center;
	line-height: 60upx;
}

.text-light {
	font-weight: 300;
}

@keyframes show {
	0% {
		transform: translateY(-50px);
	}

	60% {
		transform: translateY(40upx);
	}

	100% {
		transform: translateY(0px);
	}
}

@-webkit-keyframes show {
	0% {
		transform: translateY(-50px);
	}

	60% {
		transform: translateY(40upx);
	}

	100% {
		transform: translateY(0px);
	}
}
</style>
