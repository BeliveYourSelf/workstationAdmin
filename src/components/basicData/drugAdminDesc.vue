<template>
	<div class="con-area">
		<div class="width-style drug-dialog">
			
			
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
						<el-form-item label="拼音码:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.quickCheckCode" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="规格描述:" :label-width="formLabelWidth">
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
						<el-form-item label="溶媒剂量:" :label-width="formLabelWidth3">
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
					<div class="form-tip">匹配</div>
					<div class="form-top">
						<el-form-item label="单位制剂:" :label-width="formLabelWidth">
							<el-select 
							 v-model="editForm.unitPreparation" 
							 placeholder="请选择" 
							 clearable 
							 class="input-big"
							 @change="unitPreparationChange">
								<el-option disabled :value="0">
									<span class="sel-table-header">通用名</span>
									<span class="sel-table-header">规格</span>
									<span class="sel-table-header">英文名</span>
									<span class="sel-table-header">Spellcode</span>
									<span class="sel-table-header">NameAndSpec</span>
								</el-option>
								<el-option
									v-for="item in unitPreparationList"
									:key="item.id"
									:value="item.id">
									<span class="sel-table-header">{{item.name}}</span>
									<span class="sel-table-header">{{item.specification}}</span>
									<span class="sel-table-header">{{item.englishName}}</span>
									<span class="sel-table-header">{{item.spellcode}}</span>
									<span class="sel-table-header">{{item.nameAndSpec}}</span>
								</el-option>
							</el-select>
							<el-select v-model="editForm.drugAttributes" placeholder="请选择" clearable class="unit-select">
								<el-option
									v-for="item in drugAttributesList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<div class="form-tip">附件条件</div>
						<div class="form-top">
							<el-form-item label="附件条件:" :label-width="formLabelWidth">
								<el-select v-model="editForm.otherConditions" multiple placeholder="请选择" class="input-big">
									<el-option
										v-for="item in otherConditionsList"
										:key="item.id"
										:label="item.name"
										:value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
							<el-button class="other-btn" icon="el-icon-plus" type="primary" @click="dialogFormVisible = true">添加附加条件</el-button>
						</div>
					</div>
				</el-form>
				 <div class="foot-btn">
					 <el-button type="primary">确 定</el-button>
					 <el-button>取 消</el-button>
				 </div>
					<el-dialog title="添加药品附加条件" :visible.sync="dialogFormVisible">
						<div class="dialog-con">
							<div>
								<el-input class="add-input" v-model="otherConditionsForm.name"></el-input>
								<el-button type="primary" class="dialog-addbtn" v-if="otherConditionsIsEdit" @click="editSaveOther">保存</el-button>
								<el-button type="primary" class="dialog-addbtn" v-else @click="addOther">添加</el-button>
								<el-button type="primary" plain class="dialog-addbtn" @click="cancelOther">取消</el-button>
							</div>
							<div class="dialog-list">
								<ul>
									<li v-for="(list,index) in otherConditionsList" @click="selOther(index)">{{list.name}}</li>
								</ul>
							</div>
							<div>
								<el-button type="primary" @click="editOther">修改</el-button>
								<el-button type="primary" plain @click="delOther">删除</el-button>
							</div>
						</div>
					</el-dialog>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				formLabelWidth: '65px',
				formLabelWidth1: '90px',
				formLabelWidth2: '75px',
				formLabelWidth3: '120px',
				dialogFormVisible: false, //false
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
					// 123 drugConsumables: '',//药品耗材不需要
					// 123 附加条件维护 基本信息等区分标题上  单位制剂选择 详情跳页
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
					otherConditions: [] //附加条件
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
				],
				// 单位制剂list
				unitPreparationList: [
					{
						name: '乙氧苯柳胺软膏',
						specification: 'N/A',
						englishName: 'Etosamine ointment',
						spellcode: 'VVBLARG',
						nameAndSpec:　'乙氧苯柳胺软膏',
						id: 1,
					},{
						name: '乙氧苯柳胺软膏1',
						specification: 'N/A',
						englishName: 'Etosamine ointment',
						spellcode: 'VVBLARG1',
						nameAndSpec:　'乙氧苯柳胺软膏1',
						id: 2
					}
				],
				otherConditionsList: [
					{name: '化疗药先用水溶',id: 1},
					{name: '化疗药，倒置混合，禁摇，专用溶剂',id: 2},
				],
				// 附加条件input
				otherConditionsForm: {
					name: ''
				},
				otherConditionsIsEdit: false, //false 附加条件input是否为修改
				editIndex: '' //选中的li
			}
		},
		methods: {
			// 单位制剂改变
			unitPreparationChange(val) {
				console.log(val)
				let selUnitObj = this.unitPreparationList.find((item) => {
					return item.id == val;
				});
				this.editForm.unitPreparation = (`${selUnitObj.name} | ${selUnitObj.specification} | ${selUnitObj.englishName} | ${selUnitObj.spellcode} | ${selUnitObj.nameAndSpec}`)
			},
			// 选择li
			selOther(index) {
				this.editIndex = index;
			},
			// 添加li
			addOther() {
				this.otherConditionsList.unshift(
					{name: this.otherConditionsForm.name},
				)
				this.otherConditionsForm.name = '';
			},
			// 取消li
			cancelOther() {
				this.otherConditionsForm.name = '';
			},
			// 删除li
			delOther() {
				this.otherConditionsList.splice(this.editIndex, 1);
			},
			// 编辑按钮li
			editOther() {
				this.otherConditionsForm.name = this.otherConditionsList[this.editIndex].name;
				this.otherConditionsIsEdit = true;
			},
			// 编辑确定li
			editSaveOther() {
				this.otherConditionsList[this.editIndex].name = this.otherConditionsForm.name;
				this.otherConditionsForm.name = '';
				this.otherConditionsIsEdit = false;
			},
		}
	}
</script>

<style scoped>
	/* 编辑表单 */
	/* .drug-dialog >>> .el-dialog{
		margin-top: 1vh!important;
		width: 100rem;
	} */
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
	.form-top .input-big.el-select{
		width: 70rem;
	}
	.operator-set{
		text-align: center;
	}
	.form-top .el-select{
		width: 17.7rem;
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
		font-weight: bold;
		color: #000;
		margin-bottom: 1rem;
	}
	.form-tip:not(:first-child) {
		border-top: 0.1rem solid rgba(238,238,238,1);
		margin-top: 1rem;
		padding-top: 2rem;
	}
	.el-form-item{
		margin-bottom: 1rem;
	}
	.drug-dialog >>> .el-form-item__label{
		
	}
	.sel-table-header{
		color: #333333;
		font-size: 1.2rem;
		display: inline-block;
		text-align: center;
		width: 15rem;
	}
	.other-btn{
		margin-left: 5rem;
	}
	.foot-btn{
		margin-top: 2rem;
		margin-left: 2.5rem;
	}
	/* .dialog-con{
		width: 85%;
		margin: 0 auto;
	} */
	.add-input{
		width: 40rem;
		margin-right: 9.2rem;
	}
	.dialog-list{
		height: 25rem;
		overflow-y: auto;
		border: 0.1rem solid #eee;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
	}
	
	.dialog-list ul{
		padding: 1rem 2rem;
		margin: 0;
	}
	.dialog-list ul li {
		font-size: 1.2rem;
		line-height: 2.4rem;
	}
</style>
