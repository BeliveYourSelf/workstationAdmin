<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>查询</el-breadcrumb-item>
		  <el-breadcrumb-item>工作量</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row class="my-row">
			<el-col :span="4" class="staff-col">
				<div class="search-staff">
					<el-input
						class="search-code"
						placeholder="请输入工号"
						v-model="searchForm.code"
						suffix-icon="el-icon-search"
						clearable>
					</el-input>
					<ul class="staff-ul">
						<li>王晓红</li>
						<li>王晓红</li>
						<li>王晓红</li>
						<li>王晓红</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="20">
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
			</el-col>
		</el-row>
		
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
					searchData: '',
					code: ''
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
	.staff-col{
		height: 100%;
	}
	.search-staff{
		height: 45.8rem;
		box-shadow:0rem 0.1rem 1rem 0rem rgba(4,0,0,0.1);
		border-radius:1rem;
		padding: 2rem 1rem;
		margin-left: 2rem;
	}
	.my-row{
		height: 100%;
	}
	.staff-ul{
		padding-left: 3rem;
	}
	.staff-ul li {
		line-height: 2.8rem;
		font-size: 1.4rem;
	}
</style>
