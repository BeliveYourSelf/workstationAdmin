<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: 'drugAdmin' }">药品</el-breadcrumb-item>
		  <el-breadcrumb-item>药品详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="width-style drug-dialog">
			
			
				<el-form :model="editForm" class="hospital-edit" ref="editForm">
					<div class="form-tip">药品</div>
					<div class="form-top">
						<el-form-item label="药品编码:" :label-width="formLabelWidth">
							<el-input v-model="editForm.drugCode" autocomplete="off" disabled></el-input>
						</el-form-item>
						<el-form-item label="商品名称:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.productName" autocomplete="off" disabled></el-input>
						</el-form-item>
						<el-form-item label="药品简称:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.drugSimplyName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="拼音码:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.pinyinCode" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="规格描述:" :label-width="formLabelWidth">
							<el-input v-model="editForm.specDescription" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="显示优先级:" :label-width="formLabelWidth1">
							<el-select v-model="editForm.showPriorityId" placeholder="请选择" clearable>
								<el-option
									v-for="item in priorityList"
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
							<el-input class="input-big" v-model="editForm.unitPreparation" readonly @click.native="selUnitPreparation"></el-input>
							
							<el-select v-model="editForm.unitPreparationIdCategoryId" placeholder="请选择" clearable class="unit-select">
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
								<el-select 
								 v-model="editForm.addConditionIdList" 
								 multiple 
								 placeholder="请选择" 
								 class="input-big"
								 @change="$forceUpdate()">
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
					<div class="form-tip">最小包装剂量</div>
					<div class="form-top">
						<el-form-item label="主药剂量:" :label-width="formLabelWidth">
							<el-input v-model="editForm.mainDrugDose" autocomplete="off"></el-input>
							<el-select v-model="editForm.mainDrugDoseId" placeholder="请选择" clearable class="unit-select">
								<el-option
									v-for="item in dosageUnitList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="溶媒剂量:" :label-width="formLabelWidth3">
							<el-input v-model="editForm.menstruumDose" autocomplete="off"></el-input>
							<el-select v-model="editForm.menstruumDoseId" placeholder="请选择" clearable class="unit-select">
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
							<el-input v-model="editForm.smallPackageUnitCount" autocomplete="off" class="amonut-set number-input" type="number"></el-input>
							<span class="operator-set">X</span>
							<el-input v-model="editForm.smallPackageUnit" autocomplete="off" class="amonut-set"></el-input>
							<span class="operator-set">=</span>
						</el-form-item>
						<el-form-item label="大包装单位" label-width="75px">
							<el-input v-model="editForm.bigPackageUnitCount" autocomplete="off" class="amonut-set"></el-input>
						</el-form-item>
						<el-form-item label="货柜号:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.containerNumber" autocomplete="off"></el-input>
						</el-form-item>
						<!-- <el-form-item label="分类:" :label-width="formLabelWidth">
							<el-select v-model="editForm.packageClassifyId" placeholder="请选择" clearable class="unit-select">
								<el-option
									v-for="item in classificationList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item> -->
					</div>
					<div class="form-tip">审方时间系数</div>
					<div class="form-top">
						<el-form-item label="审方时间系数:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.reviewTimeFactor" autocomplete="off" type="number"></el-input>
						</el-form-item>
					</div>
					<div class="form-tip">医生限量设置</div>
					<div class="form-top">
						<el-form-item label="限药时间间隔:" :label-width="formLabelWidth1">
							<el-select v-model="editForm.drugRestrictionIntervalDocId" placeholder="请选择" clearable>
								<el-option
									v-for="item in timeIntervalList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="用药限量:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.docMedicationLimit" autocomplete="off"></el-input>
						</el-form-item>
					</div>
					<div class="form-tip">病区限量设置</div>
					<div class="form-top">
						<el-form-item label="限药时间间隔:" :label-width="formLabelWidth1">
							<el-select v-model="editForm.drugRestrictionIntervalWardId" placeholder="请选择" clearable>
								<el-option
									v-for="item in timeIntervalList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="用药限量:" :label-width="formLabelWidth1">
							<el-input v-model="editForm.wardMedicationLimit" autocomplete="off"></el-input>
						</el-form-item>
					</div>
					
				</el-form>
				<div class="foot-btn">
					<el-button type="primary" @click="saveUpdate">确 定</el-button>
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
								<li v-for="(list,index) in otherConditionsList" @click="selOther(index)" :class="list.target">{{list.name}}</li>
							</ul>
						</div>
						<div>
							<el-button type="primary" @click="editOther">修改</el-button>
							<el-button type="primary" plain @click="delOther">删除</el-button>
						</div>
					</div>
				</el-dialog>
				<el-dialog title="选择单位制剂" :visible.sync="dialogFormVisibleUnit" class="dialog-unit">
					<el-input v-model="unitSearchCondition"></el-input>
					<el-table
					 :data="unitPreparationList"
					 ref="unitPreparationListTable"
					 @row-click="selTable"
					 highlight-current-row>
						<el-table-column prop="usuallyName" label="通用名" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="spec" label="规格" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="englishName" label="英文名" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="spellCode" label="SpellCode" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="nameSpec" label="NameAndSpec" align="center" :show-overflow-tooltip="true"></el-table-column>
					</el-table>
					<div class="block page-area">
						<el-pagination
						 @size-change="handleSizeChange"
						 :current-page="currentPage"
						 :page-size="length"
						 layout="total, prev, pager, next, jumper"
						 :total="total">
						</el-pagination>
					</div>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisibleUnit = false">取 消</el-button>
						<el-button type="primary" @click="saveSelTable">确 定</el-button>
					</div>
				</el-dialog>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				drugCode: this.$route.query.drugCode,
				formLabelWidth: '65px',
				formLabelWidth1: '90px',
				formLabelWidth2: '75px',
				formLabelWidth3: '120px',
				dialogFormVisible: false, //false 附加条件弹窗
				dialogFormVisibleUnit: false, //false 单位制剂弹窗
				unitSearchCondition: '',//单位制剂搜索条件
				page: 1,
				currentPage: 1,
				length: 5,
				total: 0,
				// 编辑表单
				editForm: {
					drugSimplyName : '',//药品名称
					drugCode: '',//药品编码
					productName: '',//商品名称
					pinyinCode: '',//速查码/拼音码
					specDescription: '',//规格描述
					showPriorityId: '',//显示优先级
					mainDrugDose: '',//主药剂量
					drugDose: '',//剂量
					mainDrugDoseId: '',//剂量单位/主药剂量单位
					menstruumDose: '',//溶媒剂量
					menstruumDoseId: '',//溶媒剂量单位
					unitPreparationId: '',//单位制剂
					unitPreparationIdCategoryId: '',//药品属性  单位制剂类别
					// 123 drugConsumables: '',//药品耗材不需要
					// 123 附加条件维护 基本信息等区分标题上  单位制剂选择 详情跳页
					smallPackageUnitCount: '',//小包装数量
					smallPackageUnit: '',//小包装单位
					bigPackageUnit: '',//大包装单位
					containerNumber: '',//货柜号
					packageClassifyId: '',//分类
					reviewTimeFactor: '',//审方时间系数
					drugRestrictionIntervalDocId: '',//医生限药时间间隔
					docMedicationLimit: '',//医生用药限量
					docIntervalDay: '',//医生自定间隔日
					drugRestrictionIntervalWardId: '',//病区限药时间间隔
					wardMedicationLimit: '',//病区用药限量
					wardIntervalDay: '',//病区自定间隔日
					otherConditions: [] ,
					addConditionIdList: [],//附加条件
				},
				// 显示优先级list
				priorityList: [],
				// 剂量单位/主药剂量单位list
				dosageUnitList: [],
				// 溶媒剂量单位list
				vehicleDoseUnitList: [],
				// 药品属性list（单位制剂大类）
				drugAttributesList: [],
				// 药品耗材list
				drugConsumablesList: [
					{name: '注射器', id: 1}
				],
				// 分类list(包装换算、存放位置)
				classificationList: [],
				// 时间间隔list
				timeIntervalList: [],
				// 单位制剂list
				unitPreparationList: [],
				otherConditionsList: [], 
				// 附加条件input
				otherConditionsForm: {
					name: ''
				},
				otherConditionsIsEdit: false, //false 附加条件input是否为修改
				editIndex: '' ,//选中的li
				rowInfo: {}, //选中的单位制剂
			}
		},
		created() {
			this.getPriorityList();
			this.getDosageUnitList();
			this.getDrugAttributesList();
			this.getClassificationList();
			this.getTimeIntervalList();
			this.getUnitPreparationList();
			this.getOtherConditionsList();
		},
		mounted() {
			this.getDrugDesc();
		},
		methods: {
			// 获取附加条件
			getOtherConditionsList() {
				let _this = this;
				let apiurl = this.api.selectAddCondition;
				this.common.getAxios(apiurl, returnList);
				function returnList(res) {
					_this.otherConditionsList = res.data.data;
					for(var i in _this.otherConditionsList) {
						_this.otherConditionsList[i].target = '';
					}
				}
			},
			// 获取显示优先级list
			getPriorityList() {
				let _this = this;
				let apiurl = this.api.displayPriority;
				this.common.getAxios(apiurl, returnList);
				function returnList(res) {
					_this.priorityList = res.data.data;
				}
			},
			// 获取剂量单位/主药剂量单位list|||获取溶媒剂量单位list
			getDosageUnitList()  {
				let _this = this;
				let apiurl = this.api.smallPackageDoseUnit;
				this.common.getAxios(apiurl, returnList);
				function returnList(res) {
					_this.dosageUnitList = res.data.data;
					_this.vehicleDoseUnitList = res.data.data;
				}
			},
			// 获取药品属性list(单位制剂大类)
			getDrugAttributesList()  {
				let _this = this;
				let apiurl = this.api.selectUnitPreparationCategory;
				this.common.getAxios(apiurl, returnList);
				function returnList(res) {
					_this.drugAttributesList = res.data.data;
				}
			},
			// 获取分类list(包装换算、存放位置)
			getClassificationList()  {
				let _this = this;
				let apiurl = this.api.selectStorageLocationClassify;
				this.common.getAxios(apiurl, returnList);
				function returnList(res) {
					_this.classificationList = res.data.data;
				}
			},
			// 获取时间间隔list
			getTimeIntervalList()  {
				let _this = this;
				let apiurl = this.api.selectDrugRestrictionInterval;
				this.common.getAxios(apiurl, returnList);
				function returnList(res) {
					_this.timeIntervalList = res.data.data;
				}
			},
			// 获取单位制剂list
			getUnitPreparationList()  {
				let _this = this;
				let apiurl = this.api.selectUnitPreparationPage+'?pageNum='+this.page+'&pageSize='+this.length;
				if(this.unitSearchCondition!='') {
					apiurl+='&searchCondition='+this.unitSearchCondition;
				}
				this.common.getAxios(apiurl, returnList);
				function returnList(res) {
					_this.unitPreparationList = res.data.data.list;
					_this.total = res.data.data.total;
				}
			},
			// 数据size改变
			handleSizeChange(val) {
				this.length = val;
				this.getUnitPreparationList();
			},
			// 获取药品详情
			getDrugDesc() {
				let apiurl = this.api.selectDrugDetails+'?drugCode='+this.drugCode;
				this.common.getAxios(apiurl, this.returnDrugDesc);
			},
			returnDrugDesc(res) {
				if(res.data.status) {
					this.editForm = res.data.data;
					let selUnitObj = this.unitPreparationList.find((item) => {
						return item.id == res.data.data.unitPreparationId;
					});
					this.editForm.unitPreparation = (`${selUnitObj.usuallyName} | ${selUnitObj.spec} | ${selUnitObj.englishName} | ${selUnitObj.spellCode} | ${selUnitObj.nameSpec}`)
					this.editForm.unitPreparationId = selUnitObj.id;
					this.editForm.addConditionIdList = res.data.data.addConditionId.split(',');
					this.editForm.addConditionIdList = this.editForm.addConditionIdList.map(item => {
						return parseInt(item)
					}); 
					console.log(this.editForm.addConditionIdList)
				} else {
					this.$message.error(res.data.msg)
				}
			},
			// 单位制剂改变
			unitPreparationChange(val) {
				console.log(val)
				let selUnitObj = this.unitPreparationList.find((item) => {
					return item.id == val;
				});
				console.log(selUnitObj)
				this.editForm.unitPreparation = (`${selUnitObj.usuallyName} | ${selUnitObj.spec} | ${selUnitObj.englishName} | ${selUnitObj.spellCode} | ${selUnitObj.nameSpec}`)
				this.editForm.unitPreparationId = selUnitObj.id;
				this.$forceUpdate();//由于编辑的时候会有问题，强制刷新
			},
			// 单位制剂弹窗
			selUnitPreparation() {
				this.dialogFormVisibleUnit = true;
			},
			selTable (row) {
				console.log(row)
				this.rowInfo = row;
			},
			saveSelTable() {
				let rowInfo = this.rowInfo;
				this.editForm.unitPreparation = (`${rowInfo.usuallyName} | ${rowInfo.spec} | ${rowInfo.englishName} | ${rowInfo.spellCode} | ${rowInfo.nameSpec}`)
				this.editForm.unitPreparationId = rowInfo.id;
				this.$forceUpdate();//由于编辑的时候会有问题，强制刷新
				this.dialogFormVisibleUnit = false;
			},
			// 选择li
			selOther(index) {
				this.editIndex = index;
				for(var i in this.otherConditionsList) {
					this.otherConditionsList[i].target = '';
				}
				this.otherConditionsList[index].target='textPrimary';
				this.$forceUpdate();//强制刷新
				console.log(this.otherConditionsList)
			},
			// 添加li
			addOther() {
				let _this = this;
				let apiurl = this.api.insertAddCondition;
				let addCondition = {name: this.otherConditionsForm.name};
				this.common.postAxios(apiurl, addCondition, returnAdd);
				function returnAdd(res) {
					if(res.data.status) {
						_this.$message.success('添加成功');
						_this.otherConditionsForm.name = '';
						_this.getOtherConditionsList();
					} else {
						_this.$message.success(res.data.msg);
					}
				}
			},
			// 取消li
			cancelOther() {
				this.otherConditionsForm.name = '';
			},
			// 删除li
			delOther() {
				let _this = this;
				let addconditionId = this.otherConditionsList[this.editIndex].id;
				let apiurl = this.api.deleteAddCondition+'?addconditionId='+addconditionId;
				this.common.deleteAxios(apiurl, {}, returnPut);
				function returnPut(res) {
					console.log(res)
					if(res.data.status) {
						_this.$message.success('删除成功');
						_this.getOtherConditionsList();
					} else {
						_this.$message.success(res.data.msg);
					}
				}
			},
			// 编辑按钮li
			editOther() {
				this.otherConditionsForm.name = this.otherConditionsList[this.editIndex].name;
				this.otherConditionsIsEdit = true;
			},
			// 编辑确定li
			editSaveOther() {
				let _this = this;
				let apiurl = this.api.updateAddCondition;
				let addCondition = {
					name: this.otherConditionsForm.name,
					id: this.otherConditionsList[this.editIndex].id
				};
				this.common.putAxios(apiurl, addCondition, returnPut);
				function returnPut(res) {
					if(res.data.status) {
						_this.$message.success('修改成功');
						_this.otherConditionsForm.name = '';
						_this.otherConditionsIsEdit = false;
						_this.getOtherConditionsList();
					} else {
						_this.$message.success(res.data.msg);
					}
				}
			},
			saveUpdate() {
				let apiurl = this.api.updateDrug;
				let data = this.editForm;
				this.editForm.addConditionId =this.editForm.addConditionIdList.toString();
				this.common.putAxios(apiurl, data, this.returnSave);
			},
			returnSave(res) {
				if(res.data.status) {
					this.$message.success('更新成功');
					this.$router.go(-1);
				} else {
					this.$message.success(res.data.msg);
				}
			}
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
	.form-top .input-big.el-input{
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
	.number-input >>> .el-input__inner {
		padding-right: 0;
	}
	.dialog-unit >>> .el-table__body tr.current-row>td{
	  background-color: rgba(103,145,229,0.2);
	}
</style>
