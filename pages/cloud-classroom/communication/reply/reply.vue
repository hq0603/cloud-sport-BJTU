<template>
	<view>
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view>{{data.name || '匿名用户'}}</view>
							<view class="text-gray text-sm flex justify-between">{{data.created_at}}</view>
						</view>
					</view>
				</view>
				<view class="text-content margin-top-sm card-content">{{data.content}}</view>
			</view>
		</view>

		<view class="bg-white margin-top-sm padding-xs" style="margin: 0 15px">
			<view class="text-lg text-black">
				<text class="cuIcon-titles text-blue"></text>
				<text class="text-bold">{{list.length}}</text>
				个回复
			</view>
			<view class="flex align-center margin-tb-sm" v-for="(item,index) in list" :key="index">
				<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
				<view class="margin-left">
					<view>{{item.name || '匿名用户'}}</view>
					<view class="text-grey">{{item.content}}</view>
				</view>
			</view>
		</view>
		
		<view class="btn" @click="showModal = true">
			<button class="cu-btn bg-blue round"><text class="cuIcon-add text-lg text-white"></text></button>
		</view>
		
		<view class="cu-modal" :class="showModal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">发表回复</view>
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
import http from '../../../../request.js';
export default {
	data() {
		return {
			data: null,
			showModal: false,
			content: "",
			list: []
		};
	},
	methods: {
		getData(id) {
			http.post('communication/getReplyList', {
				communication_id: id
			}).then(res => {
				this.list = res.replyList
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
			http.post("communication/createReplyData",{
				communication_id: this.data.uuid,
				content: this.content
			}).then(res=>{
				uni.showToast({
					icon: 'none',
					title: '创建成功'
				});
				this.getData(this.data.uuid)
			})
		},
	},
	onLoad(e) {
		this.data = JSON.parse(e.data)
		this.getData(this.data.uuid)
	}
};
</script>

<style scoped>
	.btn {
		position: absolute;
		bottom: 30px;
		right: 15px;
	}
</style>
