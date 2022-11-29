<template>
	<view>
		<lgd-tab :tabValue="tabValue" :tabIndex="tabIndex" @getIndex="tabChange" />
		<view class="" v-if="tabIndex == 0">
			<view class="margin-tb">
				<picker @change="bindYearPickerChange" :value="timesPickerIndex" :range="timesPickerList">
					<button class="picker cu-btn">
						<text>作业序号（第几次作业）：</text>
						<text class="cuIcon-btn text-blue"></text>
						{{ timesPickerList[timesPickerIndex] }}
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
			tabValue: ['平时作业成绩查询', '平时作业排名'],
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
			timesPickerList: [
				"1",
				"2",
				"3",
				"4",
				"5",
			],
			timesPickerIndex: 0,
			section1ScoreList: [
				{ name:' 俯卧撑', value:'', desc: '及格'},
				{ name:' 跳绳', value:'', desc: '及格'},
				{ name:' 立定跳远', value:'', desc: '及格'},
				{ name:' 蹲起', value:'', desc: '及格'},	
				{ name:' 开合跳', value:'', desc: '及格'},	
				{ name:' 坐位体前屈', value:'', desc: '及格'},
				{ name:' 双臂绕环', value:'', desc: '及格'},
				{ name:' 平板支撑', value:'', desc: '及格'},
				{ name:' 仰卧起坐', value:'', desc: '及格'},
				{ name:' 引体向上', value:'', desc: '及格'},
			]
		};
	},
	methods: {
		bindPickerChange(e) {
			this.singleIndex = e.detail.value;
		},
		bindYearPickerChange(e) {
			this.timesPickerIndex = e.detail.value;
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
				times: this.timesPickerList[this.timesPickerIndex]
			}).then(res => {
				console.log(res);
				// 一共有十项，具体的返回得到的数据具体而定，下面的数据是体测成绩获得的示例
				this.section1ScoreList[0].value = res.scoreInfo.height_weight;
				this.section1ScoreList[1].value = res.scoreInfo.vital_capacity;
				this.section1ScoreList[2].value = res.scoreInfo.standing_jump;
				this.section1ScoreList[3].value = res.scoreInfo.sit_forward;
				this.section1ScoreList[4].value = res.scoreInfo.pull_out_sit_up;
				this.section1ScoreList[5].value = res.scoreInfo.run_50;
				this.section1ScoreList[6].value = res.scoreInfo.run_800_1000;
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
