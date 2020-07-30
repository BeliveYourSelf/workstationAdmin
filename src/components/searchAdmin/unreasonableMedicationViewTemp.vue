<template>
	<div>
		<div class="table-name">{{descName}}</div>
		<el-table
			class="desc-table"
			:data="descList"
		 >
			<el-table-column prop="docAdviceDetailsId" label="处方号" width="150" align="center" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="drugAName" label="药品" show-overflow-tooltip align="center" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="drugBName" label="作用药品" show-overflow-tooltip align="center" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="descript" label="描述" show-overflow-tooltip align="center" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="origin" label="来源" show-overflow-tooltip align="center" :show-overflow-tooltip="true"></el-table-column>
			<!-- <el-table-column prop="retreat" label="退方人" show-overflow-tooltip align="center"></el-table-column> -->
		</el-table>
	</div>
</template>
<script scoped>
	export default{
		props: {
			descName: String,
			descList: {type: Array, default: () => []}
		},
		updated() {
			// console.log(this)
		},
		data() {
			return {
				
			}
		},
		methods: {
		
		}
	}
</script>
<style>
	.table-name{
		font-size: 1.6rem;
		font-weight: bold;
		margin-left: 4rem;
		margin-top: 2rem;
	}
	.desc-table{
		max-height: 25rem;
		overflow-y: auto;
	}
</style>