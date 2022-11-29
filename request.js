import {
	reject
} from "lodash";

const baseUrl = 'https://cloudsports-backend.joyteck.top/cloudSport/v1/'
// const baseUrl = "http://192.168.1.8:9000/cloudSport/v1/"

// 请求封装
const request = (options = {}) => {
	options.header = {
		"Content-Type": "application/json",
		"Authorization": uni.getStorageSync("token")
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url || '',
			method: options.type || 'GET',
			data: options.data || {},
			header: options.header || {}
		}).then(data => {
			let [err, res] = data;
			console.log(res)
			switch (res.data.code) {
				case 200:
					resolve(res.data.data);
					break;
				case 300:
					uni.showToast({
						icon: "none",
						title: res.data.message
					})
					reject(res.data.message)
					break;
				case 400:
					uni.showToast({
						icon: "none",
						title: res.data.message
					})
					reject(res.data.err)
					break;
				case 401:
					// #ifdef APP-PLUS || H5
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
									uni.setStorageSync('token', res.jwt);
								});
							}
						}
					});
					// #endif
					break;
			}

		}).catch(error => {
			reject(error)
		})
	});
}

const get = (url, data, options = {}) => {
	options.type = 'GET';
	options.data = data;
	options.url = url;
	return request(options)
}

const post = (url, data, options = {}) => {
	options.type = 'POST';
	options.data = data;
	options.url = url;
	return request(options)
}


export default {
	request,
	get,
	post,
	baseUrl
}
