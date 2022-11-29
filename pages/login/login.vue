<template>
	<view class="padding content-container">
		<view class="text-xxl text-black text-bold">手机号登录</view>
		<view class="cu-form-group margin-top-xl">
			<view class="title">手机号码</view>
			<input placeholder="请输入" name="input" v-model="phone" :disabled="isSend" />
			<view class="cu-capsule radius">
				<view class="cu-tag bg-blue ">+86</view>
				<view class="cu-tag line-blue">中国大陆</view>
			</view>
		</view>
		<view class="cu-form-group margin-top" v-if="isSend">
			<view class="title">验证码</view>
			<input placeholder="输入验证码" name="input" v-model="code" />
		</view>
		<view class="text-center margin-top-xl">
			<button class="cu-btn bg-blue block lg" @click="action">{{ isSend ? '立即登录' : '发送验证码' }}</button>
		</view>
		<view class="text-center text-grey text-sm margin-top">未注册手机验证后自动登录</view>
	</view>
</template>

<script>
import http from '@/request.js';
export default {
	data() {
		return {
			isSend: false,
			phone: '',
			code: ''
		};
	},
	methods: {
		action() {
			if (this.isSend) {
				this.login();
			} else {
				this.sendMsg();
			}
		},
		sendMsg() {
			console.log("发送短信消息")
			if (!this.phone || !/^1[3-9]\d{9}$/.test(this.phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号校验失败'
				});
				return;
			}
			http.post('utils/sendMessage', {
				phone_number: this.phone
			}).then(res => {
				console.log(res);
				uni.showToast({
					icon: 'none',
					title: '短信已下发，注意查收'
				});
				this.isSend = true;
			});
		},
		login() {
			if (!this.code) {
				uni.showToast({
					icon: 'none',
					title: '验证码不为空'
				});
				return;
			}
			http.post('user/login', {
				platform: uni.getSystemInfoSync().uniPlatform,
				phone: this.phone,
				code: this.code
			}).then(res => {
				console.log(res);
				uni.showToast({
					icon: 'none',
					title: '登陆成功'
				});
				uni.setStorageSync('token', res.jwt);
				uni.reLaunch({
					url: '/pages/home/home'
				});
			});
		}
	}
};
</script>

<style scoped lang="scss">
.content-container {
	background-color: #f7f8fa;
}
</style>
