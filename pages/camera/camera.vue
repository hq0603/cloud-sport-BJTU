<template>
	<view>
		<camera device-position="front" flash="off" @error="error" style="width: 100%;height:90vh;"></camera>
		<button type="warn" @tap="stopRecord">结束录制</button>
<!-- 		<button type="primary" @tap="record">重新录制</button> -->
		<!-- 		<button class="cu-btn block lg bg-blue" @click="takePhoto">拍照</button> -->
		<uni-popup ref="videoPopup" v-show="showNumber" :is-mask-click="false">
			<view class="number">{{ number || '' }}</view>
		</uni-popup>

		<!-- 预览modal -->
		<view class="cu-modal" :class="showVideoModal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{ videoModalTitle }}</view>	
					<!-- <view class="action" @tap="showVideoModal = false"><text class="cuIcon-close text-red"></text></view> -->
				</view>
				<view class="bg-white"><video :src="videoSrc"></video></view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-gray" @tap="redo">重新录制</button>
						<button class="cu-btn bg-blue margin-left" @tap="upload">上传审核</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import http from '../../request.js';
export default {
	data() {
		return {
			number: 0,
			showNumber: true,
			ctx: null,
			showVideoModal: false,
			videoSrc: '',
			videoModalTitle: '视频预览'
		};
	},
	methods: {
		takePhoto() {
			const ctx = uni.createCameraContext();
			ctx.takePhoto({
				quality: 'high',
				success: res => {
					this.src = res.tempImagePath;
				}
			});
		},
		error(e) {
			console.log(e.detail);
		},
		redo() {
			this.showVideoModal = false;
			this.videoSrc = '';
			this.countDown(3);
		},
		upload() {
			this.showVideoModal = false;
			const self = this;
			wx.showLoading({
				title: '正在处理视频...'
			});
			uni.uploadFile({
				url: http.baseUrl + 'utils/uploadVideo', //仅为示例，非真实的接口地址
				filePath: this.videoSrc,
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
					self.videoSrc = JSON.parse(resData.data.videoInfo).processedVideoUrl;
					self.showVideoModal = true;
					self.videoModalTitle = "结果"
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
		},
		countDown(total) {
			this.showNumber = true;
			this.$refs.videoPopup.open('center');
			const timer = setInterval(() => {
				if (total <= 0) {
					clearInterval(timer);
					this.showNumber = false;
					this.record();
				}
				this.number = total;
				total--;
			}, 1000);
		},
		stopRecord() {
			const self = this
			this.ctx.stopRecord({
				compressed: true,
				success(res) {
					uni.setNavigationBarTitle({
						title: '✅录制完成'
					});
					self.videoSrc = res.tempVideoPath;
					self.showVideoModal = true;
				}
			});
		},
		record() {
			uni.setNavigationBarTitle({
				title: '⏺录制中...'
			});
			this.ctx.startRecord({
				timeout: 60,
				timeoutCallback() {
					this.stopRecord()
				}
			});
		}
	},
	mounted() {
		this.countDown(3);
		this.ctx = uni.createCameraContext();
	}
};
</script>

<style scoped lang="scss">
.number {
	font-size: 100rpx;
	color: white;
	font-weight: 500;
}
</style>
