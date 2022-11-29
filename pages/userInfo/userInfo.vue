<template>
	<view>
		<!-- 表单 -->
		<view>
			<form>
				<view class="text-black text-lg text-bold margin-tb margin-lr-sm">个人信息</view>
				<view v-if="user_form && user_form.length !== 0">
					<view class="cu-form-group" v-for="(v, k) in user_form" :key="k">
						<view class="title">
							<text class="cuIcon-btn text-blue padding-right-xs"></text>
							{{ v.label }}
						</view>
						<view class="cu-avatar radius bg-gray" :style="'background-image:url(' + v.value + ')'" v-if="k === 'avatar'" @click="upload"></view>
					</view>
				</view>
				<view class="text-black text-lg text-bold margin-tb margin-lr-sm">教务信息</view>
				<view class="cu-form-group" v-for="(v, k) in school_form" :key="k">
					<view class="title">
						<text class="cuIcon-btn text-blue padding-right-xs"></text>
						<text>{{ v.label }}</text>
					</view>
					<view v-if="k === 'gender'">
						<picker @change="genderPickerChange" :value="v.value" :range="picker" range-key="label">
							<view class="picker">{{ picker[v.value].label }}</view>
						</picker>
					</view>
					<view v-else-if="k === 'school'">
						<picker @change="schoolPickerChange" :value="v.value" :range="schoolPicker" range-key="label">
							<view class="picker">{{ schoolPicker[v.value].label }}</view>
						</picker>
					</view>
					<view v-else><input v-model="v.value" /></view>
				</view>
			</form>
		</view>

		<!-- 操作 -->
		<view class="text-center padding-sm">
			<button class="cu-btn bg-blue block margin-top lg" @click="update">提交信息</button>

<!-- 			<button class="cu-btn bg-gray block margin-top-xl lg" @click="logout">退出登录</button> -->
		</view>
	</view>
</template>

<script>
import http from '../../request.js';
export default {
	data() {
		return {
			genderValue: -1,
			picker: [
				{
					label: '未知',
					value: -1
				},
				{
					label: '男',
					value: 1
				},
				{
					label: '女',
					value: 2
				}
			],
			schoolPicker: [
				{
					label: "其他",
					value: ""
				},
				{
					label: '北京交通大学',
					value: '北京交通大学'
				},
			],
			index: 1,
			user_form: {
				avatar: {
					label: '头像',
					value: ''
				}
			},
			school_form: {
				school: {
					label: "学校",
					value: ''
				},
				name: {
					label: '姓名',
					value: ''
				},
				gender: {
					label: '性别',
					value: ''
				},
				student_number: {
					label: '学号',
					value: ''
				},
				college: {
					label: '学院',
					value: ''
				},
				major: {
					label: '专业',
					value: ''
				}
			}
		};
	},
	methods: {
		getUserInfo() {
			http.post('user/getData').then(res => {
				console.log(res);
				this.user_form.avatar.value = res.data.avatar;
				this.school_form.name.value = res.data.name;
				this.school_form.gender.value = res.data.gender === -1 ? 0 : res.data.gender;
				this.school_form.college.value = res.data.college;
				this.school_form.major.value = res.data.major;
				this.school_form.student_number.value = res.data.student_number;
				this.school_form.school.value =  this.schoolPicker.findIndex(item=>{
					return item.value === res.data.school
				})
			});
		},
		genderPickerChange(e) {
			this.school_form.gender.value = e.detail.value;
		},
		schoolPickerChange(e) {
			console.log(e)
			this.school_form.school.value = e.detail.value
		},
		logout() {
			uni.clearStorage('token');
			uni.reLaunch({
				url: '/pages/login/login'
			})
		},
		upload() {
			const self = this;
			uni.chooseImage({
				count: 1,
				sourceType: ['album'],
				success: function(res) {
					console.log(res);
					uni.showLoading({
						title: '正在上传头像...'
					});
					uni.uploadFile({
						url: http.baseUrl + 'utils/uploadCOS',
						filePath: res.tempFilePaths[0],
						name: 'file',
						header: {
							Authorization: uni.getStorageSync('token')
						},
						success: function(uploadFileRes) {
							const resp = JSON.parse(uploadFileRes.data);
							self.user_form.avatar.value = resp.data.url;
							console.log(self.user_form.avatar.value);
							uni.showToast({
								title: '上传成功'
							});
							uni.hideLoading();
						},
						fail: function(err) {
							reject(err);
							uni.showToast({
								icon: 'error',
								title: '上传失败'
							});
							uni.hideLoading();
						}
					});
				}
			});
		},
		update() {
			console.log(this.school_form.gender.value)
			http.post('user/update', {
				avatar: this.user_form.avatar.value,
				name: this.school_form.name.value,
				gender: this.school_form.gender.value || -1,
				student_number: this.school_form.student_number.value,
				major: this.school_form.major.value,
				college: this.school_form.college.value,
				school: this.schoolPicker[this.school_form.school.value].value
			}).then(res => {
				console.log(res);
				uni.showToast({
					title: '更新成功',
					icon: 'none'
				});
			});
		}
	},
	onLoad() {
		this.getUserInfo();
		uni.setNavigationBarTitle({
			title: '个人信息'
		});
	}
};
</script>

<style scoped lang="scss"></style>
