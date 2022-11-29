<template>
	<view>
		<view class="cu-card dynamic" @click="checkReply(v)" v-for="(v, k) in list" :key="k">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view>{{ v.name || '匿名用户' }}</view>
							<view class="text-gray text-sm flex justify-between">{{ formatBackendTime(v.created_at) }}</view>
						</view>
						<view class="flex align-center">
							<view class="cu-tag sm">{{v.reply_count}}</view>
							<view class="text-sm">回复</view>
						</view>
					</view>
				</view>
				<view class="text-content margin-top-sm card-content">{{ v.content }}</view>
			</view>
		</view>

		<view class="text-black text-center margin-tb" v-if="pageData.loading || pageData.isLoadAll">{{ pageData.loadingTxt }}</view>

		<view class="btn" @click="showModal = true">
			<button class="cu-btn bg-blue round"><text class="cuIcon-add text-lg text-white"></text></button>
		</view>

		<view class="cu-modal" :class="showModal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">发表动态</view>
					<view class="action" @tap="showModal = false"><text class="cuIcon-close text-grey"></text></view>
				</view>
				<view class="padding-xl bg-white">
					<view class="shadow-lg text-left"><textarea placeholder="请输入内容" class="bg-white" maxlength="100" v-model="content" /></view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-blue" @tap="showModal = false">取消</button>
						<button class="cu-btn bg-blue margin-left" @tap="createData()">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import http from '../../../request.js';
export default {
	data() {
		return {
			showModal: false,
			content: '',
			pageData: {
				page: 1,
				pageSize: 10,
				loadingTxt: '加载中...',
				isLoadAll: false,
				loading: true
			},
			list: []
		};
	},
	methods: {
		checkReply(data) {
			uni.navigateTo({
				url: '/pages/cloud-classroom/communication/reply/reply?data='+JSON.stringify(data)
			});
		},
		createData() {
			if (!this.content) {
				uni.showToast({
					icon: 'none',
					title: '请检查内容输入'
				});
				return;
			}
			http.post('communication/createData', {
				content: this.content
			}).then(res => {
				console.log(res);
				uni.showToast({
					icon: 'none',
					title: '创建成功'
				});
				this.content = '';
				this.showModal = false;
				this.list = []
				this.pageData.page = 1
				this.getList()
			});
		},
		formatBackendTime(time) {
		  return time.replace(/T/g, " ").replace(/Z/g, "");
		},
		getList() {
			http.post('communication/getList', {
				page: this.pageData.page,
				page_size: this.pageData.pageSize
			})
				.then(res => {
					if (res.list && res.list.length !== 0) {
						this.pageData.page++;
						this.list.push(...res.list);
					} else {
						this.pageData.isLoadAll = true;
						this.pageData.loadingTxt = '加载完了哦';
					}
				})
				.finally(() => {
					this.pageData.loading = false;
					this.pageData.loadingTxt = '';
				});
		}
	},
	mounted() {
		this.getList();
	}
};
</script>

<style scoped lang="scss">
.card-content {
	font-size: 16px;
	word-wrap: break-word;
}

.btn {
	position: absolute;
	bottom: 30px;
	right: 15px;
}
</style>
