<template>
	<div class="con-area">
		<div class="view-tip">查看</div>
		<div class="table-name">溶媒不适宜</div>
		<el-table
		  :data="solventData"
			ref="solventData"
		 >
			<el-table-column prop="prescriptionNumber" label="处方号" width="150" align="center"></el-table-column>
			<el-table-column prop="drug" label="药品" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="actingDrug" label="作用药品" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="describe" label="描述" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="source" label="来源" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="retreat" label="退方人" show-overflow-tooltip align="center"></el-table-column>
		</el-table>
			 <!-- @size-change="(val)=>handleSizeChangeSolvent(val, 'Solvent')" -->
		<div class="block page-area">
			<el-pagination
			 @size-change="handleSizeChangeSolvent"
			 @current-change="handleCurrentChangeSolvent"
			 :current-page="currentPageSolvent"
			 :page-sizes="[5, 10, 15, 50]"
			 :page-size="lengthSolvent"
			 layout="total, sizes, prev, pager, next, jumper"
			 :total="totalSolvent">
			</el-pagination>
		</div>
		<div class="table-name">数量和剂量</div>
		<el-table
		  :data="quantityData"
			ref="quantityData"
		 >
			<el-table-column prop="prescriptionNumber" label="处方号" width="150" align="center"></el-table-column>
			<el-table-column prop="drug" label="药品" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="actingDrug" label="作用药品" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="describe" label="描述" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="source" label="来源" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="retreat" label="退方人" show-overflow-tooltip align="center"></el-table-column>
		</el-table>
			 <!-- @size-change="(val)=>handleSizeChangeSolvent(val, 'Solvent')" -->
		<div class="block page-area">
			<el-pagination
			 @size-change="handleSizeChangeSolvent"
			 @current-change="handleCurrentChangeSolvent"
			 :current-page="currentPageSolvent"
			 :page-sizes="[5, 10, 15, 50]"
			 :page-size="lengthSolvent"
			 layout="total, sizes, prev, pager, next, jumper"
			 :total="totalSolvent">
			</el-pagination>
		</div>
		<div class="table-name">配伍禁忌</div>
		<el-table
		  :data="incompatibilityData"
			ref="incompatibilityData"
		 >
			<el-table-column prop="prescriptionNumber" label="处方号" width="150" align="center"></el-table-column>
			<el-table-column prop="drug" label="药品" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="actingDrug" label="作用药品" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="describe" label="描述" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="source" label="来源" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="retreat" label="退方人" show-overflow-tooltip align="center"></el-table-column>
		</el-table>
			 <!-- @size-change="(val)=>handleSizeChangeSolvent(val, 'Solvent')" -->
		<div class="block page-area">
			<el-pagination
			 @size-change="handleSizeChangeSolvent"
			 @current-change="handleCurrentChangeSolvent"
			 :current-page="currentPageSolvent"
			 :page-sizes="[5, 10, 15, 50]"
			 :page-size="lengthSolvent"
			 layout="total, sizes, prev, pager, next, jumper"
			 :total="totalSolvent">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				// 溶媒不适宜
				pageSolvent: 1,
				currentPageSolvent: 1,
				lengthSolvent: 5,
				totalSolvent: 400,
				solventData: [{
					prescriptionNumber: '784715',//处方号
					drug: '培美曲塞二钠针（江苏豪森）',// 药品
					actingDrug: '',// 作用药品
					describe: '培美曲塞二钠只建议用0.9%的氰化钠注射液（不含防腐剂）溶解稀释至100ml，静脉滴注超过10分钟',// 描述
					source: '药品说明书',// 来源
					retreat: '王静'// 退方人
				}],
				// 数量和剂量
				quantityData: [{
					prescriptionNumber: '729395',//处方号
					drug: '曲妥珠单抗针（赫赛汀440mg）',// 药品
					actingDrug: '水溶性维生素针',// 作用药品
					describe: '药品数量和剂量不同',// 描述
					source: '剂量：330.0000mg与数量：0.75g不符',// 来源
					retreat: '王静'// 退方人
				}],
				// 配伍禁忌
				incompatibilityData: [{
					prescriptionNumber: '5226649',//处方号
					drug: '【J】氟尿嘧啶针',// 药品
					actingDrug: '【J】奥沙利铂针（艾恒）',// 作用药品
					describe: '因与氯化钠和碱性溶液（特别是5-氟尿嘧啶）之间存在配伍禁忌，奥沙利铂不要与上述制剂混合或通过同一条静脉同时给药',// 描述
					source: '药品书名书',// 来源
					retreat: '王静'// 退方人
				}],
				// 相互作用
				interactionData: [{
					prescriptionNumber: '576652',//处方号
					drug: '【J】氟尿嘧啶针',// 药品
					actingDrug: '【J】奥沙利铂针（艾恒）',// 作用药品
					describe: '因与氯化钠和碱性溶液（特别是5-氟尿嘧啶）之间存在配伍禁忌，奥沙利铂不要与上述制剂混合或通过同一条静脉同时给药',// 描述
					source: '药品书名书',// 来源
					retreat: '王静'// 退方人
				}],
				// 审方结果
				trialResultsData: [{
					prescriptionNumber: '576652',//处方号
					drug: '【J】氟尿嘧啶针',// 药品
					actingDrug: '【J】奥沙利铂针（艾恒）',// 作用药品
					describe: '因与氯化钠和碱性溶液（特别是5-氟尿嘧啶）之间存在配伍禁忌，奥沙利铂不要与上述制剂混合或通过同一条静脉同时给药',// 描述
					source: '药品书名书',// 来源
					retreat: '王静'// 退方人
				}],
				// 溶媒限制
				solventLimitData: [{
					prescriptionNumber: '576652',//处方号
					drug: '【J】氟尿嘧啶针',// 药品
					actingDrug: '【J】奥沙利铂针（艾恒）',// 作用药品
					describe: '因与氯化钠和碱性溶液（特别是5-氟尿嘧啶）之间存在配伍禁忌，奥沙利铂不要与上述制剂混合或通过同一条静脉同时给药',// 描述
					source: '药品书名书',// 来源
					retreat: '王静'// 退方人
				}],
			}
		},
		methods: {
			// 数据size改变溶媒不适宜
			handleSizeChangeSolvent(val) {
			  console.log(`每页 ${val} 条`,type);
			},
			// 页数改变溶媒不适宜
			handleCurrentChangeSolvent(val) {
				console.log(`当前页: ${val}`);
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
