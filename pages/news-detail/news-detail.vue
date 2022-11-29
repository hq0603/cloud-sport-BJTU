<template>
	<view class="padding bg-white">
		<div>
			<text class="cuIcon-titles text-blue"></text>
			<text class="text-lg text-bold">{{ newsInfo.news_title }}</text>
		</div>
		<div class="margin-tb"><rich-text :nodes="newsInfo.news_content"></rich-text></div>
		<div class="text-right">{{ formatDate(newsInfo.news_release_time) }}</div>
	</view>
</template>

<script>
import http from '../../request.js';
const dayjs = require('dayjs')
export default {
	data() {
		return {
			newsInfo: {},
		};
	},
	methods: {
		getDetails(id) {
			http.post('news/getNewsByUuid', {
				uuid: id
			}).then(res => {
				console.log(res);
				this.newsInfo = res.newsInfo;
				uni.setNavigationBarTitle({
					title: res.newsInfo.news_title
				});
			});
		},
		formatDate(date) {
			return dayjs(date).format('YYYY-DD-MM')
		},
	},
	onLoad(e) {
		this.getDetails(e.id);
	}
};
</script>

<style></style>
