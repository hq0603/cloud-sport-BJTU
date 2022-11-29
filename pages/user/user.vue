<template>
	<scroll-view scroll-y class="scrollPage">
		<view class="UCenter-bg" @click="navToInfo">
			<view class="cu-avatar xl round" :style="'background-image:url(' + userInfo.avatar + ')'"></view>
			<view class="margin-tb-sm">
				<text class="text-lg text-black text-bold">{{ userInfo.name }}</text>
			</view>
			<image src="https://cloud-sports-1302510758.cos.ap-beijing.myqcloud.com/common/wave.gif" mode="scaleToFill" class="gif-wave"></image>
		</view>
		<view class="padding flex text-center text-grey bg-white shadow-warp">
			<view class="flex flex-sub flex-direction solid-right">
				<view class="margin-top-sm">
					<text class="cuIcon-location"></text>
					{{ userInfo.school }}
				</view>
			</view>
			<view class="flex flex-sub flex-direction solid-right">
				<view class="margin-top-sm">
					<text class="cuIcon-newshot"></text>
					大三
				</view>
			</view>
		</view>
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
			<!-- <view class="cu-item arrow">
				<view class="content" bindtap="CopyLink" data-link="https://github.com/weilanwl/ColorUI">
					<text class="cuIcon-github text-grey"></text>
					<text class="text-grey">GitHub</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/about/log/log" hover-class="none">
					<text class="cuIcon-formfill text-green"></text>
					<text class="text-grey">日志</text>
				</navigator>
			</view> -->
			<view class="cu-item arrow">
				<view class="content" @click="showActionModal = true">
					<text class="cuIcon-selectionfill text-orange"></text>
					<text class="text-grey">生物特征识别</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content" @click="uploadHead = true">
					<text class="cuIcon-selectionfill text-orange"></text>
					<text class="text-grey">上传本人照片</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content" @click="checkHomeworkScore">
					<text class="cuIcon-selectionfill text-orange"></text>
					<text class="text-grey">平时作业成绩</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content" @click="checkTestScore">
					<text class="cuIcon-selectionfill text-orange"></text>
					<text class="text-grey">体测成绩</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="feedback">
					<text class="cuIcon-writefill text-cyan"></text>
					<text class="text-grey">意见反馈</text>
				</button>
			</view>
			<!-- 用户验证弹窗 -->
			<view class="cu-modal" :class="showActionModal ? 'show' : ''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">识别本人</view>
						<view class="action" @tap="showActionModal = false"><text class="cuIcon-close text-red"></text></view>
					</view>
					<view class="padding-xl text-black text-xxl bg-white"><button class="cu-btn bg-blue" @tap="action">点击识别</button></view>
				</view>
			</view>
			<!-- 上传本人头像 -->
			<view class="cu-modal" :class="uploadHead ? 'show' : ''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">上传本人照片</view>
						<view class="action" @tap="uploadHead = false"><text class="cuIcon-close text-red"></text></view>
					</view>
					<view class="padding-xl text-black text-xxl bg-white"><button class="cu-btn bg-blue" @tap="uploadPicture">点击上传</button></view>
				</view>
			</view>

			<!-- <view class="cu-item arrow">
				<navigator class="content" url="/pages/about/test/list" hover-class="none">
					<text class="cuIcon-creativefill text-orange"></text>
					<text class="text-grey">Bug测试</text>
				</navigator>
			</view> -->
		</view>
		<view class="flex justify-center margin-top-xl"><button class="cu-btn bg-red block lg" style="width: 90%;" @click="logout()">退出登录</button></view>
	</scroll-view>
</template>

<script>
import http from '../../request.js';
export default {
	data() {
		return {
			showActionModal: false,
			uploadHead: false,
			userInfo: {}
		};
	},
	methods: {
		getUserInfo() {
			http.post('user/getData').then(res => {
				console.log(res);
				this.userInfo = res.data;
			});
		},
		logout() {
			uni.clearStorage('token');
			uni.reLaunch({
				url: '/pages/login/login'
			});
		},
		navToInfo() {
			uni.navigateTo({
				url: '/pages/userInfo/userInfo'
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
		uploadPicture() {
			const self = this;
			this.uploadHead = false;
			uni.showActionSheet({
			    itemList: ["拍照", "从手机相册选择"],
			    success(res) {
			        let sourceType = "camera";
			        if (res.tapIndex == 0) {
			            sourceType = "camera";
			        } else if (res.tapIndex == 1) {
			            sourceType = "album";
			        }
			        let that = this;
			        uni.chooseImage({
			            count: 2, //最多可以选择的图片张数，默认1
			            sizeType: ["original", "compressed"],   //original 原图，compressed 压缩图，默认二者都有
			            sourceType: [sourceType], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
			            success: function(res) {
			                let tempFilePaths = res.tempFilePaths;
							//这里是按照多个照片的上传写的，上限是上边的count，考虑到未来可能需要多个图片上传
			                for (let i = 0; i < tempFilePaths.length; i++) {
			                  uni.uploadFile({
			                      url:http.baseUrl + 'utils/uploadVideo?type=' + self.AIHomeworkChooseType,
			                      filePath: tempFilePaths[i],   //要上传文件资源的路径
			                      name: "file",  //文件对应的 key 
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
			            }
			          });
			        }
			      });
		},
		checkHomeworkScore() {
			uni.navigateTo({
				url: "/pages/homework-score/homework-score"
			})
		},
		checkTestScore() {
			uni.navigateTo({
				url: "/pages/test-score/test-score"
			})
		}
	},
	onShow() {
		this.getUserInfo();
	}
};
</script>

<style scoped lang="scss">
.UCenter-bg {
	/* background-image: url(https://image.weilanwl.com/color2.0/index.jpg); */
	background-color: #9fd4fd;
	background-size: cover;
	/* 	  height: 550upx; */
	display: flex;
	justify-content: center;
	padding-top: 40upx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
	opacity: 0.8;
}

.UCenter-bg image {
	width: 200upx;
	height: 200upx;
}

.UCenter-bg .gif-wave {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100upx;
}

map,
.mapBox {
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100upx;
}

map,
.mapBox {
	width: 750upx;
	height: 300upx;
}
</style>
