<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>基本数据管理</el-breadcrumb-item>
		  <el-breadcrumb-item>员工</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="width-style dialog-margin">
			<!-- 搜索区域 -->
			<div class="search-area">
				<el-row>
					<el-col :span="20">
						<span class="input-tip">员工姓名：</span>
						<el-input
							class="input-width"
							placeholder="请输入员工姓名"
							v-model="searchForm.userName"
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
						<el-table-column prop="departmentName" label="科室" align="center"></el-table-column>
						<el-table-column prop="name" label="员工名称" align="center"></el-table-column>
						<el-table-column prop="number" label="工号" align="center"></el-table-column>
						<el-table-column prop="job" label="职务" align="center"></el-table-column>
						<el-table-column prop="title" label="职称" align="center"></el-table-column>
						<!-- 123 科室 -->
						<!-- 123 职称 主任药师等 -->
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
					<div class="form-top">
						<el-form-item label="工号:" :label-width="formLabelWidth">
							<el-input v-model="editForm.number" autocomplete="off" disabled></el-input>
						</el-form-item>
						<el-form-item label="员工名称:" :label-width="formLabelWidth">
							<el-input v-model="editForm.name" autocomplete="off" disabled></el-input>
						</el-form-item>
						<el-form-item label="科室:" :label-width="formLabelWidth">
							<el-input v-model="editForm.departmentName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="职务:" :label-width="formLabelWidth">
							<el-input v-model="editForm.job" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="职称:" :label-width="formLabelWidth">
							<el-input v-model="editForm.title" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="管理员:" :label-width="formLabelWidth">
							<el-switch v-model="editForm.isAdministrator"></el-switch>
						</el-form-item>
					</div>
					<!-- 123 权限部分做表格、穿梭框 -->
					<el-transfer 
					 v-if="editForm.isAdministrator"
					 v-model="editForm.authorityValue" 
					 :props="{key: 'id',label: 'name'}"
					 :titles="['可选权限列表', '已拥有权限列表']"
					 :data="authorityList">
					</el-transfer>
					<!-- <div class="form-bottom" v-if="editForm.isAdministrator">
						<el-form-item label="工作台" :label-width="formLabelWidth1">
							<el-checkbox-group v-model="editForm.workbenchList">
								<el-checkbox v-for="item in workbenchList" :label="item.id" name="workbenchList">{{item.name}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="基本数据管理" :label-width="formLabelWidth1">
							<el-checkbox-group v-model="editForm.basicDataList">
								<el-checkbox v-for="item in basicDataList" :label="item.id" name="basicDataList">{{item.name}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="查询" :label-width="formLabelWidth1">
							<el-checkbox-group v-model="editForm.searchList">
								<el-checkbox v-for="item in searchList" :label="item.id" name="searchList">{{item.name}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="日常管理" :label-width="formLabelWidth1">
							<el-checkbox-group v-model="editForm.dailyManagementList">
								<el-checkbox v-for="item in dailyManagementList" :label="item.id" name="dailyManagementList">{{item.name}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="药学交接班" :label-width="formLabelWidth1">
							<el-checkbox-group v-model="editForm.handoverManagementList">
								<el-checkbox v-for="item in handoverManagementList" :label="item.id" name="handoverManagementList">{{item.name}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</div> -->
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
				formLabelWidth: '80px',
				formLabelWidth1: '150px',
				searchForm: {
					userName: ''
				},
				tableData: [],
				dialogFormVisible: false, //false
				// 编辑表单
				editForm: {
					count:'',
					staffName:'',
					staffCode:'',
					post:'',
					isAdministrator: true,
					authorityValue: [],
					workbenchList: [],
					basicDataList: [],
					searchList: [],
					dailyManagementList: [],
					handoverManagementList: []
				},
				authorityList: [
					{name: '工作台',id: 1,},
					{name: '科室',id: 3},
					{name: '员工',id: 4},
					{name: '药品',id: 5},
					{name: '审方规则',id: 6},
					{name: '处方查询',id: 7},
					{name: '工作量',id: 8},
					{name: '不合理用药',id: 9},
					{name: '查房记录',id: 10},
					{name: '监护记录',id: 11},
					{name: 'ADR检测记录',id: 12},
					{name: '排班管理',id: 13,},
					{name: '药学交接班',id: 14,},
				],
				workbenchList: [
					{name: '工作台',id: 1,},
				],
				basicDataList: [
					{name: '科室',id: 3},
					{name: '员工',id: 4},
					{name: '药品',id: 5},
					{name: '审方规则',id: 6},
				],
				searchList: [
					{name: '处方查询',id: 7},
					{name: '工作量',id: 8},
					{name: '不合理用药',id: 9},
					{name: '查房记录',id: 10},
					{name: '监护记录',id: 11},
					{name: 'ADR检测记录',id: 12},
				],
				dailyManagementList: [
					{name: '排班管理',id: 13,},
				],
				handoverManagementList: [
					{name: '药学交接班',id: 14,},
				],
			}
		},
		mounted() {
			this.initTable();
		},
		methods: {
			// 初始化表格
			initTable() {
				this.page = 1;
				this.getTable();
			},
			// 获取表格信息
			getTable() {
				console.log(this.api)
				let apiurl = this.api.selectUserList+'?page='+this.page+'&length='+this.length;
				if(this.searchForm.userName!='') {
					apiurl += '&userName=' + this.searchForm.userName;
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
				_this.dialogFormVisible = true;
				// 回显数据
				_this.$nextTick(function(){
					_this.editForm = JSON.parse(JSON.stringify(row));
					_this.editForm.count = row.count;
					_this.editForm.staffName = row.staffName;
					_this.editForm.staffCode = row.staffCode;
					_this.editForm.post = row.post;
					_this.editForm.department = row.department;
					_this.editForm.jobTitle = row.jobTitle;
					_this.editForm.isAdministrator = row.isAdministrator;
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
	.dialog-margin >>> .el-dialog{
		margin-top: 7vh!important;
	}
	.hospital-edit{
		width: 95%;
		margin: 0 auto;
	}
	.form-top{
		width: 70%;
		margin: 0 auto;
	}
	.form-bottom >>> .el-form-item__label {
		text-align: center;
	}
	.form-bottom >>> .el-form-item {
		margin-bottom: 0.5rem;
	}
</style>
