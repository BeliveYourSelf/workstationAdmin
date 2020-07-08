<template>
	<div class="con-area">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  <el-breadcrumb-item>查询</el-breadcrumb-item>
				  <el-breadcrumb-item>ADR检测记录</el-breadcrumb-item>
				</el-breadcrumb>
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
								<span class="input-tip">不良反应类别：</span>
								<el-input
									class="input-width"
									placeholder="医疗器械"
									v-model="searchForm.name"
									clearable>
								</el-input>
							</el-col>
							<el-col :span="4" class="search-btn-area">
								<el-button class="search-btn" type="primary">确认</el-button>
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
							>
								<el-table-column type="index" :index="indexMethod" label="序号" width="100" align="center">
								</el-table-column>
								<el-table-column prop="type" label="类别" align="center"></el-table-column>
								<el-table-column prop="describe" label="描述" align="center" :show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="date" label="日期" align="center"></el-table-column>
								
								
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
				total: 400,
				searchForm: {
					searchData: '',
					code: '',
					name: ''
				},
				tableData: [{
						date:'2020-06-12 09:23',
						type: '医疗器械',
						docName:'王晓红',
						userName: '王晓雯',
						room: '心血管内科',
						bed: 'Z-110',
						lavel: '一级',
						describe: '这是一个检测记录的描述这是一个检测记录的描述这是一个检测记录的描述'
					},{
						date:'2020-06-12 09:23',
						type: '医疗器械',
						docName:'王晓红',
						userName: '王晓雯',
						room: '心血管内科',
						bed: 'Z-110',
						lavel: '一级',
						describe: '这是一个检测记录的描述这是一个检测记录的描述这是一个检测记录的描述'
					}
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
	.input-tip{
		margin-left: 4rem;
	}
</style>
