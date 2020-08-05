<template>
	<div class="con-area">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  <el-breadcrumb-item>查询</el-breadcrumb-item>
				  <el-breadcrumb-item>ADR监测记录</el-breadcrumb-item>
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
								<el-select v-model="searchForm.adrMonitorTypeId" @change="initTable" clearable class="margin-left">
									<el-option
									 v-for="list in adrMonitorTypeList"
									 :value="list.id"
									 :key="list.id"
									 :label="list.adrMonitorType">
									</el-option>
								</el-select>
								<el-input
								  suffix-icon="el-icon-search"
									class="input-width margin-left"
									placeholder="监测人/患者姓名/住院号"
									v-model="searchForm.condition"
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
								:header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}"
							>
								<el-table-column fixed type="index" :index="indexMethod" label="序号" width="100" align="center">
								</el-table-column>
								<el-table-column prop="patientName" label="患者姓名" align="center"></el-table-column>
								<el-table-column prop="patientBeInHospitalId" label="住院号" align="center"></el-table-column>
								<el-table-column prop="adrMonitorTypeName" label="类型" align="center"></el-table-column>
								<el-table-column prop="pharmacistName" label="监测人" align="center"></el-table-column>
								<el-table-column prop="descript" label="描述" align="center" :show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="createTime" label="日期" align="center"></el-table-column>
								
								
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
					name: '',
					type: '',
					condition: '',
					adrMonitorTypeId: ''
				},
				adrMonitorTypeList: [],
				tableData: [],
			}
		},
		mounted() {
			this.initTable();
			this.getAdrMonitorTypeList();
		},
		methods: {
			// 初始化table
			initTable() {
				this.page = 1;
				this.getTable();
			},
			// 获取table信息
			getTable() {
				let apiurl=this.api.selectADRMonitorListPage+'?pageNum='+this.page+'&pageSize='+this.length;
				if(this.searchForm.condition!=''){
					apiurl+='&condition='+this.searchForm.condition;
				}
				if(this.searchForm.searchData.length!=''){
					apiurl+='&startTime='+this.searchForm.searchData[0]+'&endTime='+this.searchForm.searchData[1];
				}
				if(this.searchForm.adrMonitorTypeId!=''){
					apiurl+='&adrMonitorTypeId='+this.searchForm.adrMonitorTypeId;
				}
				this.common.getAxios(apiurl, this.returnTable);
			},
			returnTable(res) {
				this.tableData = res.data.data.list;
				this.total = res.data.data.total;
			},
			// 获取adrMonitorTypeList 监测类型
			getAdrMonitorTypeList() {
				let _this = this;
				let apiurl = this.api.selectADRMonitorTypeList;
				this.common.getAxios(apiurl, returnAdrMonitorTypeList);
				function returnAdrMonitorTypeList(res) {
					_this.adrMonitorTypeList = res.data.data;
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
