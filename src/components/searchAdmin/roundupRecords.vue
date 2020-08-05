<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>查询</el-breadcrumb-item>
		  <el-breadcrumb-item>查房记录</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="width-style">
			<!-- 搜索区域 -->
			<div class="search-area">
				<el-row>
					<el-col :span="0" class="search-btn-area">
					</el-col>
					<el-col :span="24" class="right-col">
						<el-date-picker
						 @change="initTable"
						 v-model="searchForm.searchData" 
						 type="daterange" 
						 range-separator="至" 
						 start-placeholder="开始日期"
						 end-placeholder="结束日期" 
						 class="data-picker-set"
						 format="yyyy 年 MM 月 dd 日"
						 value-format="yyyy/MM/dd HH:mm:ss">
						</el-date-picker>
						<el-input
						  suffix-icon="el-icon-search"
							class="margin-left input-width"
							placeholder="药师/患者/床号/住院号"
							v-model="searchForm.queryCondition"
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
					<el-table-column prop="pharmacistName" label="药师姓名" align="center"></el-table-column>
					<el-table-column prop="createTime" label="查房时间" align="center" width="180"></el-table-column>
					<el-table-column prop="pharmacistName" label="患者姓名" align="center"></el-table-column>
					<el-table-column prop="patientBeInHospitalId" label="住院号" align="center"></el-table-column>
					<el-table-column prop="departmentWardName" label="科室" align="center"></el-table-column>
					<el-table-column prop="bedNumber" label="床号" align="center" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="monitorLevelName" label="监护级别" align="center"></el-table-column>
					<el-table-column prop="pathogenyDetail" label="病因" align="center" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="checkRecord" label="备注" align="center" :show-overflow-tooltip="true"></el-table-column>
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
					queryCondition: ''
				},
				tableData: [],
			}
		},
		mounted() {
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
				let apiurl = this.api.selectWardRoundRecord+'?page='+this.page+'&length='+this.length;
				if(this.searchForm.queryCondition != '') {
					apiurl += '&queryCondition='+this.searchForm.queryCondition;
				}
				if(this.searchForm.searchData != '') {
					apiurl += '&startTime='+this.searchForm.searchData[0]+'&endTime='+this.searchForm.searchData[1];
				}
				this.common.getAxios(apiurl, this.returnTable);
			},
			returnTable(res) {
				var list = res.data.data.list;
				for(var i in list) {
					list[i].createTime = this.moment(list[i].createTime).format("YYYY-MM-Do HH:mm:ss");
				}
				this.tableData = list;
				this.total = res.data.data.total;
			},
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
				this.length = val;
				this.getTable();
			},
			// 页数改变
			handleCurrentChange(val) {
				this.page = val;
				this.getTable();
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
