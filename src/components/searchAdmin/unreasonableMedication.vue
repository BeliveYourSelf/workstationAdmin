<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>查询</el-breadcrumb-item>
		  <el-breadcrumb-item>不合理用药</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="width-style">
			<!-- 搜索区域 -->
			<div class="search-area">
				<el-row>
					<el-col :span="4" class="search-btn-area left-col">
						<el-tooltip class="item" effect="dark" content="导出打印" placement="top-start">
							<el-button class="el-icon-download" type="primary" @click="downloadExcel"></el-button>
						</el-tooltip>
					</el-col>
					<el-col :span="20" class="right-col">
						<el-select v-model="searchForm.systemCheckOrPersonCheck" @change="initTable">
							<el-option v-for="list in systemCheckOrPersonCheckList" 
								:label="list.name" 
								:value="list.id" 
								:key="list.id"></el-option>
						</el-select>
						 <el-date-picker
						  v-model="searchForm.searchData" 
						  type="daterange" 
						  range-separator="至" 
						  start-placeholder="开始日期"
						  end-placeholder="结束日期" 
						  class="data-picker-set"
						  format="yyyy 年 MM 月 dd 日"
						  value-format="yyyy/MM/dd HH:mm:ss"
							 @change="initTable">
						 </el-date-picker>
						</el-date-picker>
						<!-- <span class="input-tip">药师姓名：</span>
						<el-input class="input-width" placeholder="药师姓名" v-model="searchForm.name" clearable>
						</el-input> -->
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
					<el-table-column fixed prop="pharmacistName" label="医师" align="center"></el-table-column>
					<el-table-column prop="incompatibilityCount" label="配伍禁忌" align="center"></el-table-column>
					<el-table-column prop="interaction" label="相互作用" align="center"></el-table-column>
					<el-table-column prop="usaged" label="用法用量" align="center"></el-table-column>
					<el-table-column prop="solventProhibit" label="溶媒限制" align="center"></el-table-column>
					<el-table-column prop="concentrationLimit" label="浓度限制" align="center"></el-table-column>
					<el-table-column prop="ageTaboo" label="年龄禁忌" align="center"></el-table-column>
					<el-table-column prop="occupationalTaboo" label="职业禁忌" align="center"></el-table-column>
					<el-table-column prop="specialStateTaboo" label="特殊状态禁忌" align="center" width="120"></el-table-column>
					<el-table-column prop="crossAllergy" label="交叉过敏" align="center"></el-table-column>
					<el-table-column prop="diseaseTaboo" label="疾病禁忌" align="center"></el-table-column>
					<el-table-column prop="other" label="其他" align="center"></el-table-column>
					<el-table-column prop="total" label="总计" align="center"></el-table-column>
					<el-table-column label="操作" width="120" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button
								type="text"
								size="small">
								<span class="text-default" @click="view(scope.$index,scope.row)">查看</span>
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
		</el-row>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				system: true,//系统
				people: false,//人工
				page: 1,
				currentPage: 1,
				length: 15,
				total: 400,
				searchForm: {
					searchData: '',
					code: '',
					name: '',
					systemCheckOrPersonCheck: 1//1系统2人工
				},
				systemCheckOrPersonCheckList: [
					{name: '系统审方不合理用药',id:1},
					{name: '人工审方不合理用药',id:2},
				],
				tableData: [],
				// excel数据
				column: [
					{title:'序号',key:'index'},
					{title:'医师',key:'pharmacistName'},
					{title:'配伍禁忌',key:'incompatibilityCount'},
					{title:'相互作用',key:'interaction'},
					{title:'用法用量',key:'usaged'},
					{title:'溶媒限制',key:'solventProhibit'},
					{title:'浓度限制',key:'concentrationLimit'},
					{title:'年龄禁忌',key:'ageTaboo'},
					{title:'职业禁忌',key:'occupationalTaboo'},
					{title:'特殊状态禁忌',key:'specialStateTaboo'},
					{title:'交叉过敏',key:'crossAllergy'},
					{title:'疾病禁忌',key:'diseaseTaboo'},
					{title:'其他',key:'other'},
					{title:'总计',key:'total'},
				],
			}
		},
		// 需要详情返回来触发的写activated中
		beforeRouteLeave(to, from, next) {
			//[].includes()  是es7写法，用来判断某个数组里是否包含有个元素，这里前边放详情页的名字,to.name是指即将跳转页面的name
			if (["unreasonableMedicationView"].includes(to.name)) {
				from.meta.keepAlive = true;
			} else {
				from.meta.keepAlive = false;
			}
			next();
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
				let apiurl = this.api.selectDocAdviceStatistics
										+'?page='+this.page
										+'&length='+this.length
										+'&systemCheckOrPersonCheck='+this.searchForm.systemCheckOrPersonCheck;
				if(this.searchForm.searchData != '') {
					apiurl += '&startTime=' + this.searchForm.searchData[0] + '&endTime=' + this.searchForm.searchData[1];
				}
				this.common.getAxios(apiurl, this.returnTable);
			},
			returnTable(res) {
				this.tableData = res.data.data.list;
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
			// 查看
			view(index, row) {
				this.$router.push({path: 'unreasonableMedicationView',query: {parmacistId: row.parmacistId}})
			},
			// excel导出打印
			downloadExcel() {
				let apiurl = this.api.selectDocAdviceStatisticsPrint
									 +'?systemCheckOrPersonCheck='+this.searchForm.systemCheckOrPersonCheck;
				if(this.searchForm.searchData != '') {					apiurl += '&startTime=' + this.searchForm.searchData[0] + '&endTime=' + this.searchForm.searchData[1];				}
				this.common.getAxios(apiurl, this.returnDownloadExcel);
			},
			returnDownloadExcel(res) {
				if(res.data.status) {
					let list = res.data.data;
					for(var i in list) {
						list[i].index = Number(i) + 1;
					}
					this.exportExcel.export2Excel(this.column, list, "不合理用药列表");
				}
			}
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
	.un-type{
		border:0.1rem solid rgba(224,224,224,1);
		border-radius:0.3rem;
		height: 2.8rem;
		line-height: 2.8rem;
		display: inline-block;
		font-size: 1.2rem;
		color: #666;
		padding: 0 1.5rem;
		margin-right: 2rem;
	}
	.un-type-active{
		color: #fff;
		background: #6791E5;
	}
</style>
