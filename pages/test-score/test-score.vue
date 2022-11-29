<template>
	<view>
		<lgd-tab :tabValue="tabValue" :tabIndex="tabIndex" @getIndex="tabChange" />
		<view class="" v-if="tabIndex == 0">
			<!-- <lgd-tab :tabValue="section1TabValue" :tabIndex="section1TabIndex" @getIndex="section1TabChange" /> -->
			<view class="margin-tb">
				<picker @change="bindYearPickerChange" :value="yearPickerIndex" :range="yearPickerList">
					<button class="picker cu-btn">
						<text>年份：</text>
						<text class="cuIcon-btn text-blue"></text>
						{{ yearPickerList[yearPickerIndex] }}
					</button>
				</picker>
			</view>
			<view class="section-1-detail">
				<view v-for="(item, index) in section1ScoreList" :key="index">
					<view class="cu-form-group">
						<view class="title" style="width: 50%;">
							<text class="cuIcon-titles text-blue"></text>
							<text>{{ item.name }}</text>
						</view>
						<view class="value">{{ item.value || '暂无' }}</view>
						<view class="cu-tag bg-blue">{{ item.desc }}</view>
					</view>
				</view>
				<view>
					<view class="cu-form-group">
						<view class="title" style="width: 50%;">
							<text class="cuIcon-titles text-blue"></text>
							<text>{{ eye_degree.name }}</text>
						</view>
						<view class="value">{{ eye_degree.value }}</view>
						<button class="cu-btn bg-blue" @click="open()">{{ eye_degree.desc }}</button>
					</view>
					<uni-popup ref="popup" background-color="#fff">
						<view class="popup-content">
							<text class="text">左眼视力:{{ eye_degree.left_value || '暂无' }}</text>
							<text class="text">右眼视力:{{ eye_degree.right_value || '暂无' }}</text>
						</view>
					</uni-popup>
				</view>
			</view>
		</view>
		<view class="" v-if="tabIndex == 1">
			<uni-section title="总分排名" type="line">
				<uni-list><uni-list-item v-for="(item, index) in rankList" :title="item.name" :rightText="item.data.score" :key="index" /></uni-list>
			</uni-section>
			<view class="margin-top">
				<picker @change="bindPickerChange" :value="singleIndex" :range="singlePickerList" range-key="title">
					<button class="picker cu-btn">
						<text class="cuIcon-btn text-blue"></text>
						{{ singlePickerList[singleIndex].title }}
					</button>
				</picker>
				<uni-section :title="singlePickerList[singleIndex].title + `排名`" type="line">
					<uni-list>
						<uni-list-item v-for="(item, index) in singleRankList" :title="item.name" :rightText="item.data[singlePickerList[singleIndex].value]" :key="index" />
					</uni-list>
				</uni-section>
			</view>
		</view>
	</view>
</template>

<script>
import http from '../../request.js';
export default {
	data() {
		return {
			tabValue: ['成绩查询', '成绩排名'],
			tabIndex: 0,
			userInfo: {},
			singleIndex: 0,
			rankList: [],
			singleRankList: [],
			singlePickerList: [
				{
					title: '引体向上',
					value: 'pull_out_sit_up'
				},
				{
					title: '立定跳远',
					value: 'standing_jump'
				},
				{
					title: '坐位体前屈',
					value: 'sit_forward'
				}
			],
			yearPickerList: [
				"2022",
				"2021",
				"2020"
			],
			yearPickerIndex: 0,
			section1ScoreList: [
				{ name: '身高（厘米）', value: '', desc: '正常' },
				{ name: '体重（千克）', value: '', desc: '正常' },
				{ name: '肺活量（毫升）', value: '', desc: '良好' },
				{ name: '立定跳远（厘米）', value: '', desc: '优秀' },
				{ name: '坐位体前屈（厘米）', value: '', desc: '及格' },
				{ name: '引体/仰卧（次）', value: '', desc: '及格' },
				{ name: '50米（秒）', value: '', desc: '优秀' },
				{ name: "800/1000米（分'秒）", value: '', desc: '优秀' }
			],
			eye_degree: {
				name: '视力',
				left_value: '',
				right_value: '',
				desc: '点击查看'
			}
		};
	},
	methods: {
		bindPickerChange(e) {
			this.singleIndex = e.detail.value;
		},
		bindYearPickerChange(e) {
			this.yearPickerIndex = e.detail.value;
			this.getScore()
		},
		tabChange(tabIndex) {
			this.tabIndex = tabIndex;
			console.log(`current tab: ${this.tabValue[tabIndex]}`);
		},
		open() {
			this.$refs.popup.open('center');
		},
		getRank(type) {
			http.post('score/getScoreRank', {
				type
			}).then(res => {
				this.rankList = res.list;
			});
		},
		getSingleRankList(type) {
			http.post('score/getScoreRank', {
				type
			}).then(res => {
				this.singleRankList = res.list;
			});
		},
		getScore() {
			http.post('score/getScore', {
				year: this.yearPickerList[this.yearPickerIndex]
			}).then(res => {
				console.log(res);
				this.section1ScoreList[0].value = res.scoreInfo.height_weight;
				this.section1ScoreList[1].value = res.scoreInfo.vital_capacity;
				this.section1ScoreList[2].value = res.scoreInfo.standing_jump;
				this.section1ScoreList[3].value = res.scoreInfo.sit_forward;
				this.section1ScoreList[4].value = res.scoreInfo.pull_out_sit_up;
				this.section1ScoreList[5].value = res.scoreInfo.run_50;
				this.section1ScoreList[6].value = res.scoreInfo.run_800_1000;
				// this.section1ScoreList[7].score = res.scoreInfo.score;
				this.eye_degree.left_value = res.scoreInfo.left_eye_degree;
				this.eye_degree.right_value = res.scoreInfo.right_eye_degree;
			});
		}
	},
	onShow() {
		this.getRank();
		this.getScore();
		this.getSingleRankList(this.singlePickerList[this.singleIndex].value);
	}
};
</script>

<style scoped>
.popup-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	flex-wrap: nowrap;
	padding: 15upx;
	height: 200upx;
	width: 200upx;
	background-color: #fff;
}
</style>
