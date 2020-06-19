<template>
	<div class="con-area">
		<div class="width-style drug-dialog">
			<!-- 搜索区域 -->
			<div class="search-area">
				<el-row>
					<el-col :span="20">
						<span class="input-tip">药品编码：</span>
						<el-input
							class="input-width"
							placeholder="请输入药品编码"
							v-model="searchForm.drugCode"
							clearable>
						</el-input>
					</el-col>
					<el-col :span="4" class="search-btn-area">
						<el-button class="search-btn" type="primary" icon="el-icon-search">查询</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="test-main">
				<el-table
						class="main-table"
						:data="tableData"
						style="width: 100%"
						:row-class-name="tableRowClassName"
						:header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}">
						<el-table-column type="index" :index="indexMethod" label="序号" width="100" align="center">
						</el-table-column>
						<el-table-column prop="drugCode" label="药品编码" align="center" min-width="100" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="drugName" label="药品名称" align="center" min-width="100" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="specification" label="规格" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="drugDose" label="剂量" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="dosageUnit" label="剂量单位" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="mainDose" label="主药剂量" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="vehicleDose" label="溶媒剂量" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="quickCheckCode" label="速查码" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="containerNumber" label="货柜号" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="unitPreparation" label="单位制剂" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="drugConsumables" label="药品耗材" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="drugAttributes" label="药品属性" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column fixed="right" label="操作" width="120" align="center">
							<template slot-scope="scope">
								<el-button
									type="text"
									size="small">
									<span class="text-default" @click="editDepartment(scope.$index,scope.row)">编辑</span>
								</el-button>
							</template>
						</el-table-column>
				 </el-table>
				 <div class="block page-area">
					  <el-pagination
						 @size-change="handleSizeChange"
						 @current-change="handleCurrentChange"
						 :current-page="currentPage"
						 :page-sizes="[15, 20, 50, 100]"
						 :page-size="length"
						 layout="total, sizes, prev, pager, next, jumper"
						 :total="total">
					  </el-pagination>
				 </div>
			</div>
			<!-- 编辑弹窗 -->
			<el-dialog title="编辑" :visible.sync="dialogFormVisible" :before-close="clearForm" class="my-dialog">
				<el-form :model="editForm" class="hospital-edit" ref="editForm">
					<div class="form-tip">药品</div>
					<div class="form-top">
						<el-form-item label="药品简称:" :label-width="formLabelWidth">
							<el-input v-model="editForm.drugName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="药品编码:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.drugCode" autocomplete="off" disabled></el-input>
						</el-form-item>
						<el-form-item label="商品名称:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.commodityName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="拼音码:" :label-width="formLabelWidth">
							<el-input v-model="editForm.quickCheckCode" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="规格描述:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.specification" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="显示优先级:" :label-width="formLabelWidth1">
							<el-select v-model="editForm.priority" placeholder="请选择" clearable>
								<el-option
									v-for="item in priorityList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="form-tip">最小包装剂量</div>
					<div class="form-top">
						<el-form-item label="主药剂量:" :label-width="formLabelWidth">
							<el-input v-model="editForm.mainDose" autocomplete="off"></el-input>
							<el-select v-model="editForm.dosageUnit" placeholder="请选择" clearable class="unit-select">
								<el-option
									v-for="item in dosageUnitList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="溶媒剂量:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.vehicleDose" autocomplete="off"></el-input>
							<el-select v-model="editForm.vehicleDoseUnit" placeholder="请选择" clearable class="unit-select">
								<el-option
									v-for="item in vehicleDoseUnitList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="form-tip">匹配</div>
					<div class="form-top">
						<el-form-item label="单位制剂:" :label-width="formLabelWidth">
							<el-input v-model="editForm.unitPreparation" autocomplete="off" class="input-big"></el-input>
							<el-select v-model="editForm.drugAttributes" placeholder="请选择" clearable class="unit-select">
								<el-option
									v-for="item in drugAttributesList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="药品耗材:" :label-width="formLabelWidth1">
							<el-select v-model="editForm.drugConsumables" placeholder="请选择" clearable>
								<el-option
									v-for="item in drugConsumablesList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="form-tip">包装换算、存放位置</div>
					<div class="form-top">
						<el-form-item label="小包装单位" :label-width="formLabelWidth2">
							<el-input v-model="editForm.smallPackageUnit" autocomplete="off" class="amonut-set"></el-input>
							<span class="operator-set">X</span>
							<el-input v-model="editForm.smallPackageNum" autocomplete="off" class="amonut-set"></el-input>
							<span class="operator-set">=</span>
						</el-form-item>
						<el-form-item label="大包装单位" label-width="75px">
							<el-input v-model="editForm.bigPackageUnit" autocomplete="off" class="amonut-set"></el-input>
						</el-form-item>
						<el-form-item label="货柜号:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.containerNumber" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="分类:" :label-width="formLabelWidth">
							<el-select v-model="editForm.classification" placeholder="请选择" clearable class="unit-select">
								<el-option
									v-for="item in classificationList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="form-tip">审方时间系数</div>
					<div class="form-top">
						<el-form-item label="审方时间系数:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.trialTimeCoefficient" autocomplete="off" type="number"></el-input>
						</el-form-item>
					</div>
					<div class="form-tip">医生限量设置</div>
					<div class="form-top">
						<el-form-item label="限药时间间隔:" :label-width="formLabelWidth1">
							<el-select v-model="editForm.restrictionInterval" placeholder="请选择" clearable>
								<el-option
									v-for="item in timeIntervalList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
							<el-input v-model="editForm.docIntervalDay" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="用药限量:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.docMedicationLimit" autocomplete="off"></el-input>
						</el-form-item>
					</div>
					<div class="form-tip">病区限量设置</div>
					<div class="form-top">
						<el-form-item label="限药时间间隔:" :label-width="formLabelWidth1">
							<el-select v-model="editForm.wardInterval" placeholder="请选择" clearable>
								<el-option
									v-for="item in timeIntervalList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
							<el-input v-model="editForm.wardIntervalDay" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="用药限量:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.wardMedicationLimit" autocomplete="off"></el-input>
						</el-form-item>
					</div>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="clearForm">确 定</el-button>
					<el-button @click="clearForm">取 消</el-button>
				</div>
			</el-dialog>
			<!-- 编辑弹窗 -->
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				page: 1,
				currentPage: 1,
				length: 15,
				total: 400,
				formLabelWidth: '65px',
				formLabelWidth1: '90px',
				formLabelWidth2: '75px',
				// 查询form
				searchForm: {
					drugCode: ''
				},
				tableData: [{
						drugCode: '11101050208',//药品编码
						drugName: '卡全针(脂肪乳氨基酸(17)葡萄糖(19%))',//药品名称
						specification: '1026ml',//规格
						drugDose: '1026',//剂量
						dosageUnit: 'ml',//剂量单位
						mainDose: '1026ml',//主药剂量
						vehicleDose: '1026ml',//溶媒剂量
						quickCheckCode: 'ZFRAJS17PTT19ZSY',//速查码
						containerNumber: '310100',//货柜号
						unitPreparation: '脂肪乳氨基酸(17)葡萄糖(19％)注射液｜2053nl',//单位制剂
						drugConsumables: '',//药品耗材
						drugAttributes: '营养药'//药品属性
					},{
						drugCode: '2301010108',//药品编码
						drugName: '[Ｊ]50%葡萄糖针(100ml)',//药品名称
						specification: '50%*100ml',//规格
						drugDose: '100',//剂量
						dosageUnit: 'ml',//剂量单位
						mainDose: '100ml',//主药剂量
						vehicleDose: '100ml',//溶媒剂量
						quickCheckCode: 'PTTZSY',//速查码
						containerNumber: '310100',//货柜号
						unitPreparation: '葡萄糖注射液｜100ml：50% / 50g（葡萄糖）',//单位制剂
						drugConsumables: '',//药品耗材
						drugAttributes: '普通药'//药品属性
					}
				],
				dialogFormVisible: false,
				// 编辑表单
				editForm: {
					drugName: '',//药品名称
					drugCode: '',//药品编码
					commodityName: '',//商品名称
					quickCheckCode: '',//速查码/拼音码
					specification: '',//规格描述
					priority: '',//显示优先级
					mainDose: '',//主药剂量
					drugDose: '',//剂量
					dosageUnit: '',//剂量单位/主药剂量单位
					vehicleDose: '',//溶媒剂量
					vehicleDoseUnit: '',//溶媒剂量单位
					unitPreparation: '',//单位制剂
					drugAttributes: '',//药品属性
					drugConsumables: '',//药品耗材
					smallPackageNum: '',//小包装数量
					smallPackageUnit: '',//小包装单位
					bigPackageUnit: '',//大包装单位
					containerNumber: '',//货柜号
					classification: '',//分类
					trialTimeCoefficient: '',//审方时间系数
					restrictionInterval: '',//医生限药时间间隔
					docMedicationLimit: '',//医生用药限量
					docIntervalDay: '',//医生自定间隔日
					wardInterval: '',//病区限药时间间隔
					wardMedicationLimit: '',//病区用药限量
					wardIntervalDay: '',//病区自定间隔日
				},
				// 显示优先级list
				priorityList: [
					{name: '1', id: 1},
					{name: '2', id: 2},
					{name: '3', id: 3},
					{name: '4', id: 4},
					{name: '5', id: 5},
					{name: '6', id: 6},
					{name: '7', id: 7},
					{name: '8', id: 8},
					{name: '9', id: 9},
					{name: '0', id: 0},
				],
				// 剂量单位/主药剂量单位list
				dosageUnitList: [
					{name: 'g', id: 1},
					{name: 'IU', id: 2},
					{name: 'mg', id: 3},
					{name: 'ml', id: 4},
					{name: 'USP', id: 5},
					{name: '袋', id: 6},
					{name: '复方', id: 7},
					{name: '瓶', id: 8},
					{name: '支', id: 9},
				],
				// 溶媒剂量单位list
				vehicleDoseUnitList: [
					{name: 'ml', id: 1},
				],
				// 药品属性list
				drugAttributesList: [
					{name: '普通药', id: 1},
					{name: '抗生素', id: 2},
					{name: '化疗药', id: 3},
					{name: '营养药', id: 4},
					{name: '中药', id: 5}
				],
				// 药品耗材list
				drugConsumablesList: [
					{name: '注射器', id: 1}
				],
				// 分类list
				classificationList: [
					{name: '0', id: 1}
				],
				// 时间间隔list
				timeIntervalList: [
					{name: '自然月', id: 1},
					{name: '自然季', id: 2},
					{name: '自然年', id: 3},
					{name: '自定间隔日', id: 4},
				]
			}
		},
		methods: {
			// 表格隔行颜色设置
			tableRowClassName({row, rowIndex}) {
			  if (rowIndex%2 == 0) {
			    // return 'warning-row';
			  } else if (rowIndex%2 == 1) {
			    return 'success-row';
			  }
			  return '';
			},
			// 序号设置
			indexMethod(index) {
			  return (this.page - 1) * 10 + index + 1;
			},
			// 数据size改变
			handleSizeChange(val) {
			  console.log(`每页 ${val} 条`);
			},
			// 页数改变
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			// 编辑弹窗
			editDepartment(index, row) {
				let _this = this;
				_this.dialogFormVisible = true;
				// 回显数据
				_this.$nextTick(function(){
					_this.editForm = row;
				})
			},
			// 重置表单
			clearForm() {
				let _this = this;
				console.log(_this.$refs)
				_this.$refs['editForm'].resetFields(); //重置表单
				_this.dialogFormVisible = false;
			}
		}
	}
</script>

<style scoped>
	/* 编辑表单 */
	.drug-dialog >>> .el-dialog{
		margin-top: 1vh!important;
		width: 100rem;
	}
	.drug-dialog >>> .el-dialog__body{
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	.hospital-edit{
		margin: 0 auto;
		margin-left: 3rem;
	}
	.form-top{
		margin: 0 auto;
	}
	.form-top .el-form-item{
		display: inline-block;
	}
	.form-top .el-input{
		width: 17.7rem;
	}
	.form-top .amonut-set.el-input{
		width: 5.6rem;
	}
	.form-top .input-big.el-input{
		width: 30rem;
	}
	.operator-set{
		text-align: center;
	}
	.form-top .el-select{
		width: 11.7rem;
	}
	.form-top  .unit-select.el-select{
		width: 10.3rem;
		/* font-size: 1.2rem; */
	}
	.form-bottom >>> .el-form-item__label {
		text-align: center;
	}
	.form-bottom >>> .el-form-item {
		margin-bottom: 0.5rem;
	}
	.form-tip{
		font-size: 1.4rem;
		color: #000;
		margin-bottom: 1rem;
	}
	.el-form-item{
		margin-bottom: 1rem;
	}
	.drug-dialog >>> .el-form-item__label{
		
	}
</style>
