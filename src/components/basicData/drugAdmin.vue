<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>基本数据管理</el-breadcrumb-item>
		  <el-breadcrumb-item>药品</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="width-style drug-dialog">
			<!-- 搜索区域 -->
			<div class="search-area">
				<el-row>
					<el-col :span="0" class="search-btn-area left-col">
					</el-col>
					<el-col :span="24" class="right-col">
						<el-select v-model="searchForm.drugStatus" class="margin-left" clearable @change="initTable">
							<el-option label="显示" value="false" key="false"></el-option>
							<el-option label="隐藏" value="true" key="true"></el-option>
						</el-select>
						<el-input
						  suffix-icon="el-icon-search"
							class="input-width margin-left"
							placeholder="请输入药品编码"
							v-model="searchForm.drugCode"
							clearable
							@keyup.enter.native="initTable">
						</el-input>
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
						<el-table-column fixed type="index" :index="indexMethod" label="序号" width="100" align="center">
						</el-table-column>
						<el-table-column prop="drugCode" label="药品编码" align="center" min-width="100" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="drugSimplyName" label="药品名称" align="center" min-width="100" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="specDescription" label="规格" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="mainDrugDoseName" label="剂量" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="mainDrugDoseName" label="剂量单位" align="center" :show-overflow-tooltip="true"></el-table-column>
						<!-- <el-table-column prop="mainDrugDose" label="主药剂量" align="center" :show-overflow-tooltip="true"></el-table-column> -->
						<!-- <el-table-column prop="menstruumDose" label="溶媒剂量" align="center" :show-overflow-tooltip="true"></el-table-column> -->
						<el-table-column prop="containerNumber" label="货柜号" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column label="单位制剂" align="center" :show-overflow-tooltip="true">
							<template slot-scope="scope" width="200">
								<span v-if="scope.row.unitPreparationCategoryName!=''&&scope.row.unitPreparationCategoryName!=undefined">
									{{scope.row.unitPreparationName}}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="smallPackageUnit" label="包装单位" align="center" :show-overflow-tooltip="true"></el-table-column>
						<!-- <el-table-column prop="drugConsumables" label="药品耗材" align="center" :show-overflow-tooltip="true"></el-table-column> -->
						<el-table-column prop="pinyinCode" label="速查码" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="unitPreparationCategoryName" label="药品属性" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column fixed="right" label="操作" width="120" align="center">
							
							<template slot-scope="scope">
								<el-button
									type="text"
									size="small"
									v-show="updateSet">
									<span @click="editDepartment(scope.$index,scope.row)">编辑</span>
								</el-button>
								<el-button
									type="text"
									size="small">
									<span v-if="!scope.row.status&&hideSet" class="text-my-gray" @click="setTable(scope.$index, scope.row,'true')">隐藏</span>
									<span v-else-if="scope.row.status&&displaySet" class="text-orange" @click="setTable(scope.$index, scope.row,'false')">显示</span>
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
				total: 0,
				formLabelWidth: '65px',
				formLabelWidth1: '90px',
				formLabelWidth2: '75px',
				// 查询form
				searchForm: {
					drugCode: '',
					drugStatus: ''
				},
				tableData: [],
				displaySet: '',
				hideSet: '',
				updateSet: ''
			}
		},
		mounted() {
			let permissionList = JSON.parse(sessionStorage.getItem('permissionList'));
			let index = this.$route.query.index;
			let childrenIndex = this.$route.query.childrenIndex;
			this.updateSet = this.common.permissionSet(index,childrenIndex,permissionList,'update');
			this.displaySet = this.common.permissionSet(index,childrenIndex,permissionList,'display');
			this.hideSet = this.common.permissionSet(index,childrenIndex,permissionList,'hide');
			this.initTable();
		},
		methods: {
			// 初始化table
			initTable() {
				this.page = 1;
				this.getTable();
			},
			getTable() {
				let apiurl = this.api.selectDrugListPage+'?page='+this.page+'&length='+this.length;
				if(this.searchForm.drugCode!='') {
					apiurl += '&drugCode=' + this.searchForm.drugCode;
				}
				if(this.searchForm.drugStatus!='') {
					apiurl += '&status=' + this.searchForm.drugStatus;
				}
				this.common.getAxios(apiurl, this.returnTable);
			},
			returnTable(res) {
				if(res.data.status) {
					this.tableData = res.data.data.list;
					this.total = res.data.data.total;
				}
			},
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
				this.length = val;
				this.getTable();
			},
			// 页数改变
			handleCurrentChange(val) {
				this.page = val;
				this.getTable();
			},
			// 编辑弹窗
			editDepartment(index, row) {
				let _this = this;
				this.$router.push({path: 'drugAdminDesc',query:{drugCode: row.drugCode}});
			},
			// 重置表单
			clearForm() {
				let _this = this;
				console.log(_this.$refs)
				_this.$refs['editForm'].resetFields(); //重置表单
				_this.dialogFormVisible = false;
			},
			setTable(index, row, type) {
				let apiurl = this.api.updateStatus+'?id='+row.id+'&status='+type;
				let data = {}
				this.common.putAxios(apiurl, data, this.returnSetTable);
			},
			returnSetTable(res) {
				if(res.data.status) {
					this.$message.success('操作成功');
					this.getTable();
				} else {
					this.$message.error(res.data.msg)
				}
			}
		}
	}
</script>

<style scoped>
	
</style>
