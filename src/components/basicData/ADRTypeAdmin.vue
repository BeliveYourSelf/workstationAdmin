<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>基本数据管理</el-breadcrumb-item>
		  <el-breadcrumb-item>ADR检测类型</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="width-style">
			<!-- 搜索区域 -->
			<div class="search-area">
				<el-row>
					<el-col :span="2" class="search-btn-area left-col">
						<el-tooltip class="item" effect="dark" content="新增" placement="top-start" v-show="insertSet">
							<el-button class="el-icon-plus" type="primary" @click="addLavel"></el-button>
						</el-tooltip>
					</el-col>
					<el-col :span="22" class="right-col">
						<el-input
						  suffix-icon="el-icon-search"
							class="input-width"
							placeholder="请输入常用语"
							v-model="searchForm.content"
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
						<el-table-column prop="adrMonitorType" label="ADR检测类型" align="center"></el-table-column>
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
									size="small"
									v-show="deleteSet">
									<span class="text-default" @click="tableDel(scope.$index,scope.row)">删除</span>
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
		<el-dialog :title="formType==1?'新增':'编辑'" :visible.sync="dialogFormVisible" :before-close="clearForm">
		  <el-form :model="editForm" class="hospital-edit" ref="editForm">
		    <el-form-item label="类型名称:" :label-width="formLabelWidth" prop="name">
		      <el-input type="textarea" v-model="editForm.adrMonitorType" autocomplete="off" ></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="saveSet">确 定</el-button>
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
				total: 400,
				formType: 1, //1新增2编辑
				searchForm: {
					adrMonitorType: ''
				},
				tableData: [],
				dialogFormVisible: false,
				// 编辑表单
				editForm: {
					name:'',
					weights: '',
					descript:''
				},
				groupList: [{
					name: '1',
					id: '1'
				},{
					name: '2',
					id: '2'
				},{
					name: '3',
					id: '3'
				}],
				formLabelWidth: '80px',
				updateSet: '',
				deleteSet: '',
				insertSet: ''
			}
		},
		mounted() {
			let permissionList = JSON.parse(sessionStorage.getItem('permissionList'));
			let index = this.$route.query.index;
			let childrenIndex = this.$route.query.childrenIndex;
			this.deleteSet = this.common.permissionSet(index,childrenIndex,permissionList,'delete');
			this.updateSet = this.common.permissionSet(index,childrenIndex,permissionList,'update');
			this.insertSet = this.common.permissionSet(index,childrenIndex,permissionList,'insert');
			this.initTable();
		},
		methods: {
			// 初始化table
			initTable() {
				this.page = 1;
				this.getTable();
			},
			// 获取table信息
			getTable() {
				let apiurl = this.api.selectADRMonitorTypeListPage+'?pageNum='+this.page+'&pageSize='+this.length;
				if(this.searchForm.content != '') {
					apiurl += '&content='+this.searchForm.content;
				}
				this.common.getAxios(apiurl, this.returnTable);
			},
			returnTable(res) {
				if(res.data.status) {
					this.tableData = res.data.data.list;
					this.total = res.data.data.total;
				} else {
					this.$message.error(res.data.msg)
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
			// 冻结or解冻
			deleteRow(index,rows) {
				let _this = this;
				let tableData = _this.tableData;
				if(tableData[index].status == 1) {
					_this.tableData[index].status = 2;
				} else if(tableData[index].status == 2) {
					_this.tableData[index].status = 1;
				}
			},
			// 编辑弹窗
			editDepartment(index, row) {
				let _this = this;
				_this.dialogFormVisible = true;
				// 回显数据
				_this.$nextTick(function(){
					_this.editForm = JSON.parse(JSON.stringify(row));
				})
				_this.formType = 2;
			},
			// 添加弹窗
			addLavel() {
				let _this = this;
				_this.dialogFormVisible = true;
				_this.formType = 1;
			},
			saveSet() {
				if(this.formType == 1) {
					let apiurl = this.api.insertADRMonitorType;
					let usuallyLanguage = this.editForm;
					this.common.postAxios(apiurl, usuallyLanguage, this.returnSave);
				} else if(this.formType == 2) {
					let apiurl = this.api.updateADRMonitorType;
					let usuallyLanguage = this.editForm;
					this.common.putAxios(apiurl, usuallyLanguage, this.returnUpdate);
				} 
			},
			returnSave(res) {
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '新增成功'
					});
					this.clearForm();
					this.initTable();
				} else {
					this.$message.error(res.data.msg);
				}
			},
			returnUpdate(res) {
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '修改成功'
					});
					this.clearForm();
					this.initTable();
				} else {
					this.$message.error(res.data.msg);
				}
			},
			// 删除表格信息
			tableDel(index, row) {
				let _this = this;
				 this.$confirm('此操作将永久删除该等级, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let apiurl = _this.api.deleteADRMonitorType+'?ids='+row.id;
						let data = {};
						_this.common.deleteAxios(apiurl, data, _this.returnDel);
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});          
					});
			},
			returnDel(res) {
				if(res.data.status) {
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getTable();
				}
			},
			// 重置表单
			clearForm() {
				let _this = this;
				console.log(_this.$refs['editForm'])
				_this.$refs['editForm'].resetFields(); //重置表单
				_this.dialogFormVisible = false;
				console.log(this.tableData);
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
</style>
