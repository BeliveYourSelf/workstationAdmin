<template>
	<div class="con-area">

		<div class="width-style">
			<!-- 搜索区域 -->
			<div class="search-area">
				<el-row>
					<el-col :span="20">
						<el-date-picker v-model="searchForm.searchData" type="daterange" range-separator="至" start-placeholder="开始日期"
						 end-placeholder="结束日期" class="data-picker-set">
						</el-date-picker>
						<span class="input-tip">药师姓名：</span>
						<el-input class="input-width" placeholder="药师姓名" v-model="searchForm.name" clearable>
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
				 :header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}">
					<el-table-column type="index" :index="indexMethod" label="序号" width="100" align="center">
					</el-table-column>
					<el-table-column prop="docName" label="药师姓名" align="center"></el-table-column>
					<el-table-column prop="date" label="查房时间" align="center"></el-table-column>
					<el-table-column prop="userName" label="患者姓名" align="center"></el-table-column>
					<el-table-column prop="room" label="科室" align="center"></el-table-column>
					<el-table-column prop="bed" label="床号" align="center" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="lavel" label="监护级别" align="center"></el-table-column>
					<el-table-column prop="reason" label="病因" align="center" :show-overflow-tooltip="true"></el-table-column>

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
		</el-row>

	</div>
</template>

<script>
	export default {
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
					date: '2020-06-12 09:23',
					docName: '王晓红',
					userName: '王晓雯',
					room: '心血管内科',
					bed: 'Z-110',
					lavel: '一级',
					reason: '这是一个病因描述这是一个病因描述'
				}],
			}
		},
		methods: {
			// 表格隔行颜色设置
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex % 2 == 0) {
					// return 'warning-row';
				} else if (rowIndex % 2 == 1) {
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
	.hospital-edit {
		width: 50%;
		margin: 0 auto;
	}

	.data-picker-set>>>.el-range-input {
		font-size: 1.2rem;
	}

	.data-picker-set>>>.el-range__icon {
		line-height: 2.3rem;
	}

	.data-picker-set>>>.el-range__close-icon {
		line-height: 2.3rem;
	}

	.data-picker-set>>>.el-range-separator {
		line-height: 2.3rem;
		font-size: 1.2rem;
	}

	.el-date-editor--daterange.el-input__inner {
		width: 28rem;
	}

	.input-tip {
		margin-left: 4rem;
	}
</style>
