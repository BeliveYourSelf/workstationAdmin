<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{path: 'unreasonableMedication'}">不合理用药</el-breadcrumb-item>
		  <el-breadcrumb-item>不合理用药详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="view-tip">查看</div>
		
		<tableDesc descName="用法用量" :descList="usagedList" v-if="usagedList.length!=0"></tableDesc>
		<tableDesc descName="疾病禁忌" :descList="diseaseTabooList" v-if="diseaseTabooList.length!=0"></tableDesc>
		<tableDesc descName="职业禁忌" :descList="occupationalTabooList" v-if="occupationalTabooList.length!=0"></tableDesc>
		<tableDesc descName="年龄禁忌" :descList="ageTabooList" v-if="ageTabooList.length!=0"></tableDesc>
		<tableDesc descName="相互作用" :descList="interactionList" v-if="interactionList.length!=0"></tableDesc>
		<tableDesc descName="特殊状态禁忌" :descList="specialStateTabooList" v-if="specialStateTabooList.length!=0"></tableDesc>
		<tableDesc descName="交叉过敏" :descList="crossAllergyList" v-if="crossAllergyList.length!=0"></tableDesc>
		<tableDesc descName="浓度限制" :descList="concentrationLimitList" v-if="concentrationLimitList.length!=0"></tableDesc>
		<tableDesc descName="配伍禁忌" :descList="incompatibilityCountNameList" v-if="incompatibilityCountNameList.length!=0"></tableDesc>
		<tableDesc descName="溶媒限制" :descList="solventProhibitList" v-if="solventProhibitListlength!=0"></tableDesc>
		<tableDesc descName="其他" :descList="otherList" v-if="otherList.length!=0"></tableDesc>
	</div>
</template>

<script>
	import tableDesc from './unreasonableMedicationViewTemp'
	export default{
		data() {
			return {
				parmacistId: this.$route.query.parmacistId,
				usagedList: [], //用法用量
				diseaseTabooList: [], //疾病禁忌
				occupationalTabooList: [], //职业禁忌
				ageTabooList: [], //年龄禁忌
				interactionList: [], //相互作用
				specialStateTabooList: [], //特殊状态禁忌
				crossAllergyList: [], //交叉过敏
				concentrationLimitList: [], //浓度限制
				incompatibilityCountNameList: [], //配伍禁忌
				solventProhibitList: [], //溶媒限制
				otherList: [], //其他
			}
		},
		components: {
			tableDesc
		},
		mounted() {
			this.getDesc();
		},
		methods: {
			getDesc() {
			  let apiurl = this.api.selectDocAdviceDetailsStatistics+'?parmacistId='+this.parmacistId;
			  this.common.getAxios(apiurl, this.reutrnDesc);
			},
			reutrnDesc(res) {
				this.usagedList = res.data.data.usagedList;
				this.diseaseTabooList = res.data.data.diseaseTabooList;
				this.occupationalTabooList = res.data.data.occupationalTabooList;
				this.ageTabooList = res.data.data.ageTabooList;
				this.interactionList = res.data.data.interactionList;
				this.specialStateTabooList = res.data.data.specialStateTabooList;
				this.crossAllergyList = res.data.data.crossAllergyList;
				this.concentrationLimitList = res.data.data.concentrationLimitList;
				this.incompatibilityCountNameList = res.data.data.incompatibilityCountNameList;
				this.solventProhibitList = res.data.data.solventProhibitList;
				this.otherList = res.data.data.otherList;
			},
			// 数据size改变溶媒不适宜
			handleSizeChangeSolvent(val) {
			  console.log(`每页 ${val} 条`,type);
			},
			// 页数改变溶媒不适宜
			handleCurrentChangeSolvent(val) {
				console.log(`当前页: ${val}`);
			},
			goBack() {
				console.log(9)
				this.$router.go(-1);
			},
		}
	}
</script>

<style scoped>
	.view-tip{
		font-size: 1.4rem;
		font-weight: bold;
		margin-left: 2.8rem;
	}
	.table-name{
		font-size: 1.6rem;
		font-weight: bold;
		margin-left: 4rem;
		margin-top: 2rem;
	}
	.page-area{
		text-align: right;
		margin-right: 2rem;
		margin-top: 1.5rem;
	}
</style>
