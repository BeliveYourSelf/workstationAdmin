<template>
	<div class="con-area">
		<div class="width-style">
			<!-- 搜索区域 -->
			<div class="search-area">
				<el-row>
					<el-col :span="20">
						<el-date-picker
							v-model="searchForm.searchData"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							class="data-picker-set">
						</el-date-picker>
					</el-col>
					<el-col :span="4" class="search-btn-area">
						<el-button class="search-btn" type="primary">导出打印</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="test-main">
				<el-table
						class="main-table"
						:data="tableData"
						style="width: 100%"
						:row-class-name="tableRowClassName"
						:header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}"
						:summary-method="getSummaries"
						show-summary>
						<el-table-column type="index" :index="indexMethod" label="序号" width="100" align="center">
						</el-table-column>
						<el-table-column prop="code" label="工号" align="center"></el-table-column>
						<el-table-column prop="departmentName" label="姓名" align="center"></el-table-column>
						<el-table-column prop="abbreviation" label="审方工作量" align="center"></el-table-column>
						<el-table-column prop="pinyin" label="查房工作量" align="center"></el-table-column>
						<el-table-column prop="group" label="监护工作量" align="center"></el-table-column>
						
				 </el-table>
				 <!-- <div class="block page-area">
					  <el-pagination
						 @size-change="handleSizeChange"
						 @current-change="handleCurrentChange"
						 :current-page="currentPage"
						 :page-sizes="[15, 20, 50, 100]"
						 :page-size="length"
						 layout="total, sizes, prev, pager, next, jumper"
						 :total="total">
					  </el-pagination>
				 </div> -->
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
				total: 400,
				searchForm: {
					searchData: ''
				},
				tableData: [{
						code:'767554',
						departmentName:'王晓红',
						abbreviation:'10',
						pinyin:'10',
						group:'10',
						sortNum:10,
						status:1,
					},{
						code:'767554',
						departmentName:'王晓红',
						abbreviation:'20',
						pinyin:'20',
						group:'20',
						sortNum:20,
						status:1,
					},
				],
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
			// 自定义合计
			getSummaries(param) {
				const { columns, data } = param;
				const sums = [];
				columns.forEach((column, index) => {
					const values = data.map(item => Number(item[column.property]));
					if (index === 0) {
						sums[index] = '合计';
						return;
					}
					if (index === 1) {
						sums[index] = '';
						return;
					}
					if (!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if (!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
					} else {
						sums[index] = '';
					}
				});

				return sums;
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
	.data-picker-set >>> .el-range-input{
		font-size: 1.2rem;
	}
	.data-picker-set >>> .el-range__icon {
		line-height: 2.3rem;
	}
	.data-picker-set >>> .el-range__close-icon {
		line-height: 2.3rem;
	}
	.data-picker-set >>> .el-range-separator {
		line-height: 2.3rem;
		font-size: 1.2rem;
	}
	.el-date-editor--daterange.el-input__inner{
		width: 28rem;
	}
</style>
