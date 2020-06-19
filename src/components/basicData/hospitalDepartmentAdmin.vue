<template>
	<div class="con-area">
		<div class="width-style">
			<!-- 搜索区域 -->
			<div class="search-area">
				<el-row>
					<el-col :span="20">
						<span class="input-tip">科室名称：</span>
						<el-input
							class="input-width"
							placeholder="请输入科室名称"
							v-model="searchForm.name"
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
						<el-table-column prop="code" label="编码" align="center"></el-table-column>
						<el-table-column prop="departmentName" label="科室名称" align="center"></el-table-column>
						<el-table-column prop="abbreviation" label="简称" align="center"></el-table-column>
						<el-table-column prop="pinyin" label="拼音码" align="center"></el-table-column>
						<el-table-column prop="group" label="组别" align="center"></el-table-column>
						<el-table-column prop="sortNum" label="科室排序" align="center"></el-table-column>
						<el-table-column fixed="right" label="操作" width="120" align="center">
							<template slot-scope="scope">
								<el-button
									type="text"
									size="small">
									<span class="text-default" @click="editDepartment(scope.$index,scope.row)">编辑</span>
								</el-button>
								<el-button
									@click.native.prevent="deleteRow(scope.$index, tableData)"
									type="text"
									size="small">
									<span v-if="scope.row.status == 1" class="text-my-gray">冻结</span>
									<span v-else-if="scope.row.status == 2" class="text-orange">解冻</span>
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
				  <el-input v-model="editForm.abbreviation" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="拼音码:" :label-width="formLabelWidth">
				  <el-input v-model="editForm.pinyin" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="组别:" :label-width="formLabelWidth">
				  <el-input v-model="editForm.group" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="科室排序:" :label-width="formLabelWidth">
				  <el-input v-model="editForm.sortNum" autocomplete="off"></el-input>
				</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="clearForm">确 定</el-button>
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
				searchForm: {
					name: ''
				},
				tableData: [{
						code:'767554',
						departmentName:'呼吸内科',
						abbreviation:'简称',
						pinyin:'HUGCGH',
						group:'组别',
						sortNum:10,
						status:1,
					},{
						code:'767554',
						departmentName:'呼吸内科',
						abbreviation:'简称',
						pinyin:'HUGCGH',
						group:'组别',
						sortNum:20,
						status:2,
					},
				],
				dialogFormVisible: false,
				// 编辑表单
				editForm: {
					code:'',
					departmentName:'',
					abbreviation:'',
					pinyin:'',
					group:'',
					sortNum:'',
					status:'',
				},
				formLabelWidth: '80px',
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

<style>
	/* 编辑表单 */
	.hospital-edit{
		width: 50%;
		margin: 0 auto;
	}
</style>
