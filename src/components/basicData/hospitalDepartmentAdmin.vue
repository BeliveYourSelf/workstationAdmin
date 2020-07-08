<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>基本数据管理</el-breadcrumb-item>
		  <el-breadcrumb-item>科室</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="width-style">
			<!-- 搜索区域 -->
			<div class="search-area">
				<el-row>
					<el-col :span="20">
						<span class="input-tip">科室名称：</span>
						<el-input
							class="input-width"
							placeholder="请输入科室名称"
							v-model="searchForm.departmentName"
							clearable
							 @keyup.enter.native="initTable">
						</el-input>
					</el-col>
					<el-col :span="4" class="search-btn-area">
						<el-button class="search-btn" type="primary" icon="el-icon-search" @click="initTable">查询</el-button>
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
						<el-table-column prop="code" label="编码" align="center"></el-table-column>
						<el-table-column prop="departmentName" label="科室名称" align="center"></el-table-column>
						<el-table-column prop="simpleName" label="简称" align="center"></el-table-column>
						<el-table-column prop="pinyinCode" label="拼音码" align="center"></el-table-column>
						<el-table-column prop="departmentGroupName" label="组别" align="center"></el-table-column>
						<el-table-column prop="serialNumber" label="科室排序" align="center"></el-table-column>
						<el-table-column fixed="right" label="操作" width="120" align="center">
							<template slot-scope="scope">
								<el-button
									type="text"
									size="small">
									<span class="text-default" @click="editDepartment(scope.$index,scope.row)">编辑</span>
								</el-button>
								<el-button
									type="text"
									size="small">
									<span v-if="!scope.row.status" class="text-my-gray" @click="setTable(scope.$index, scope.row,'true')">冻结</span>
									<span v-else-if="scope.row.status" class="text-orange" @click="setTable(scope.$index, scope.row,'false')">解冻</span>
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
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑" :visible.sync="dialogFormVisible" :before-close="clearForm">
		  <el-form :model="editForm" class="hospital-edit" ref="editForm">
		    <el-form-item label="科室名称:" :label-width="formLabelWidth">
		      <el-input v-model="editForm.departmentName" autocomplete="off" disabled></el-input>
		    </el-form-item>
				<el-form-item label="编码:" :label-width="formLabelWidth">
				  <el-input v-model="editForm.code" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="简称:" :label-width="formLabelWidth">
				  <el-input v-model="editForm.simpleName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="拼音码:" :label-width="formLabelWidth">
				  <el-input v-model="editForm.pinyinCode" autocomplete="off"></el-input>
				</el-form-item>
				<!-- 123 可以自定义下拉框 -->
				<el-form-item label="组别:" :label-width="formLabelWidth">
				  <!-- <el-input v-model="editForm.group" autocomplete="off"></el-input> -->
					<el-select
					    v-model="editForm.departmentGroupName"
					    filterable
					    allow-create
					    default-first-option
					    placeholder="请选择组别">
					    <el-option
					      v-for="item in groupList"
					      :key="item.name"
					      :label="item.name"
					      :value="item.name">
					    </el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="科室排序:" :label-width="formLabelWidth">
				  <el-input v-model="editForm.serialNumber" autocomplete="off"></el-input>
				</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="saveEdit">确 定</el-button>
		    <el-button @click="clearForm">取 消</el-button>
		  </div>
		</el-dialog>
		<!-- 编辑弹窗 -->
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
				searchForm: {
					departmentName: ''
				},
				tableData: [],
				dialogFormVisible: false,
				// 编辑表单
				editForm: {
					code:'',
					departmentName:'',
					simpleName:'',
					pinyinCode:'',
					departmentGroupName:'',
					serialNumber:'',
					status:'',
				},
				groupList: [{
					name: '11',
					id: '1'
				},{
					name: '21',
					id: '2'
				},{
					name: '31',
					id: '3'
				}],
				formLabelWidth: '80px',
			}
		},
		mounted() {
			this.initTable();
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
			// 初始化table
			initTable() {
				this.page = 1;
				this.getTable();
			},
			// 获取table信息
			getTable() {
				let apiurl = this.api.selectDepartmentListPage+'?page='+this.page+'&length='+this.length;
				if(this.searchForm.departmentName != '') {
					apiurl += '&departmentName='+this.searchForm.departmentName;
				}
				this.common.getAxios(apiurl, this.returnTable);
			},
			returnTable(res) {
				if(res.data.status) {
					this.tableData = res.data.data.list;
					this.total = res.data.data.total;
				} else {
					this.$message.error(res.data.msg);
				}
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
			// 冻结or解冻
			setTable(index,row,type) {
				let apiurl = this.api.freezeDepartment+'?departmentId='+row.id+'&freezeStatus='+type;
				let data = {};
				this.common.putAxios(apiurl, data, this.returnSet);
			},
			returnSet(res) {
				this.$message.success(res.data.msg);
				this.getTable();
			},
			// 编辑弹窗
			editDepartment(index, row) {
				let _this = this;
				_this.dialogFormVisible = true;
				delete row.departmentGroupId;
				// 回显数据
				_this.$nextTick(function(){
					_this.editForm = JSON.parse(JSON.stringify(row));
					_this.getGroupList();
				})
			},
			// 查看组别集合
			getGroupList() {
				let apiurl = this.api.selectDepartmentGroupList;
				this.common.getAxios(apiurl, this.returnGroupList);
			},
			returnGroupList(res) {
				if(res.data.status) {
					this.groupList = res.data.data;
				}
			},
			// 保存更新
			saveEdit() {
				let apiurl = this.api.updateDepartment;
				let department = this.editForm;
				this.common.putAxios(apiurl, department, this.returnSaveEdit);
			},
			returnSaveEdit(res) {
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '更新成功'
					});
					this.$refs['editForm'].resetFields(); //重置表单
					this.dialogFormVisible = false;
					this.getTable();
				} else {
					this.$message.error(res.data.msg);
				}
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
	.hospital-edit{
		width: 50%;
		margin: 0 auto;
	}
	.el-select{
		width: 100%;
	}
</style>
