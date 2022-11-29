<template>
	<view style="height: 100%;">
		<image :src="image" style="width: 100%;height: 100vh;margin-bottom: 100rpx;"></image>
		<view class="btn">
			<button class="cu-btn bg-cyan block lg" v-if="!isJoin" @click="join()">
				<text class="text-xl text-white margin-tb">马上报名</text>
			</button>
			<button v-else class="cu-btn bg-grey block lg">
				<text class="text-black">已报名</text>
			</button>
		</view>
	</view>
</template>

<script>
	import http from '../../../request.js';
	export default {
		data() {
			return {
				image: "",
				id: "",
				isJoin: false
			}
		},
		methods: {
			getDetail(id) {
				http.post("match/checkDetails",{
					match_id: id
				}).then(res=>{
					console.log(res)
					uni.setNavigationBarTitle({
						title: res.data.title
					})
					this.image = res.data.image
					this.isJoin = res.isJoin
					console.log(this.isJoin)
				})
			},
			join() {
				uni.showLoading()
				http.post("match/joinMatch",{
					match_id: this.id
				}).then(res=>{
					console.log(res)
					this.isJoin = true
				}).finally(()=>{
					uni.hideLoading()
				})
			}
		},
		onLoad(e) {
			console.log(e)
			this.getDetail(e.id)
			this.id = e.id
		}
	}
</script>

<style scoped lang="scss">
.btn {
	width:100%;
	position:fixed;
	bottom:0;
}
</style>
