<script>
import http from 'request.js';
export default {
	onLaunch: function() {
		console.log(plus)
		// uni.removeStorageSync("token")
		if (!uni.getStorageSync('token')) {
			// #ifdef APP-PLUS
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}, 500);
			// #endif

			// #ifdef MP-WEIXIN
			uni.login({
				provider: 'weixin',
				success: function(res) {
					if (res.code) {
						http.post('user/loginByApplet', {
							code: res.code
						}).then(res => {
							console.log(res);
							uni.showToast({
								icon: 'none',
								title: '登陆成功'
							});
							uni.setStorageSync('token', res.jwt);
						});
					}
				}
			});
			// #endif
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';
// 设置整个项目的背景色

@import '@/colorui/main.css';
@import '@/colorui/icon.css';
@import '@/colorui/animation.css';
page {
	background-color: #f5f5f5;
}

/* #endif */
.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}
.text-right {
	text-align: right;
}
.bg-grey {
	background-color: rgb(247, 247, 247);
}
.bg-white {
	background-color: rgb(255, 255, 255);
}
.section-title {
	margin-left: 30upx;
	font-size: 30upx;
	font-weight: 600;
}
.section-margin-top {
	margin-top: 20upx;
}
.section-margin-bottom {
	margin-bottom: 20upx;
}
.page-bottom {
	height: 60upx;
	width: 100%;
}
</style>
