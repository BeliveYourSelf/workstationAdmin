<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>查询</el-breadcrumb-item>
		  <el-breadcrumb-item>处方</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row class="my-row">
			<el-col :span="4" class="staff-col">
				<div class="search-staff">
					<!-- 下拉选组 -->
					<el-select placeholder="请选择组别" v-model="searchForm.systemCheckOrPersonCheck" @change="getGroupDepartment">
						<el-option v-for="list in systemCheckOrPersonCheckList" 
							:label="list.name" 
							:value="list.id" 
							:key="list.id"></el-option>
					</el-select>
					<el-input
						class="search-code margin-top"
						placeholder="请输入科室"
						v-model="searchForm.departmentName"
						suffix-icon="el-icon-search"
						clearable
						@keyup.enter.native="getDepartment">
					</el-input>
					<ul class="staff-ul">
						<li v-for="list in departmentList" @click="selDepartment(list.departmentName)">{{list.departmentName}}</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="width-style">
					<!-- 搜索区域 -->
					<div class="search-area">
						<el-row>
							<el-col :span="2" class="search-btn-area left-col">
								<el-tooltip class="item" effect="dark" content="导出打印" placement="top-start">
									<el-button class="el-icon-download" type="primary" @click="downloadExcel"></el-button>
								</el-tooltip>
							</el-col>
							<el-col :span="22" class="right-col">
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
								<el-select
								  v-model="searchForm.checkStatus"
									placeholder="请选择状态"
									clearable class="margin-left"
									@change="initTable">
									<el-option
										v-for="item in checkStatusList"
										:key="item.id"
										:label="item.name"
										:value="item.id">
									</el-option>
								</el-select>
								<el-select
								  v-model="searchForm.drugType"
									placeholder="请选择分类"
									clearable
									class="margin-left"
									@change="initTable">
									<el-option
										v-for="item in drugTypeList"
										:key="item.id"
										:label="item.name"
										:value="item.id">
									</el-option>
								</el-select>
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
								<el-table-column prop="id" label="处方编号" align="center" width="100"></el-table-column>
								<el-table-column prop="ward" label="病区名称" align="center" :show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="patientsName" label="患者姓名" align="center"></el-table-column>
								<!-- 科室 病区名称
								患者姓名 -->
								<el-table-column prop="beInHospitalId" label="住院号" align="center" width="120" :show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="patientCodeHis" label="就诊卡号" align="center" width="120" :show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="bedNumber" label="床号" align="center"></el-table-column>
								<el-table-column label="分类" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.drugType==1">普</span>
										<span v-else-if="scope.row.drugType==2">抗</span>
										<span v-else-if="scope.row.drugType==3">化</span>
										<span v-else-if="scope.row.drugType==4">营</span>
										<span v-else-if="scope.row.drugType==5">中</span>
									</template>
								</el-table-column>
								<el-table-column prop="frequency" label="频次" align="center"></el-table-column>
								<el-table-column prop="startTime" label="开始日期" align="center" width="150"></el-table-column>
								<el-table-column prop="endTime" label="停止日期" align="center" width="150"></el-table-column>
								<el-table-column prop="checkStatusHis" label="系统审方结果" align="center" width="120"></el-table-column>
								<!-- 床号
								医嘱类别 分类
								频次
								开始日期
								结束日期
								审方结果
								备注 -->
								<el-table-column label="状态" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.checkStatus==1">未审</span>
										<span v-else-if="scope.row.checkStatus==2">通过</span>
										<span v-else-if="scope.row.checkStatus==3">未通过</span>
										<span v-else-if="scope.row.checkStatus==4">已停</span>
										<span v-else-if="scope.row.checkStatus==5">暂停</span>
									</template>
								</el-table-column>
								<el-table-column prop="checkStatusHis" label="备注" align="center" width="120"></el-table-column>
								<!-- <el-table-column prop="createTime" label="接收时间" align="center" width="150"></el-table-column> -->
								
								<el-table-column fixed="right" label="操作" width="120" align="center">
									<template slot-scope="scope">
										<el-button
											type="text"
											size="small">
											<span class="text-default" @click="viewTable(scope.$index,scope.row)">查看</span>
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
			</el-col>
				<el-dialog title="查看" :visible.sync="dialogFormVisible" class="view-dialog">
					<p class="dialog-tip">处方信息</p>
					<el-row class="view-info">
						<el-col :span="5">
							<span class="info-label">病区：</span>
							<span class="info-span">{{form.departmentWardName}}</span>
						</el-col>
						<el-col :span="7">
							<span class="info-label">开始时间：</span>
							<span class="info-span">{{form.startTime}}</span>
						</el-col>
						<el-col :span="7">
							<span class="info-label">停止时间：</span>
							<span class="info-span">{{form.endTime}}</span>
						</el-col>
						<el-col :span="5">
							<span class="info-label">医生：</span>
							<span class="info-span">{{form.userName}}</span>
						</el-col>
					</el-row>
					<el-row class="view-info">
						<el-col :span="5">
							<span class="info-label">频次：</span>
							<span class="info-span">{{form.frequency}}</span>
						</el-col>
						<el-col :span="7">
							<span class="info-label">患者：</span>
							<span class="info-span">{{form.patientsName}}</span>
						</el-col>
						<el-col :span="7">
							<span class="info-label">性别：</span>
							<span class="info-span" v-if="form.gander==0">女</span>
							<span class="info-span" v-else-if="form.gander==1">男</span>
						</el-col>
						<el-col :span="5">
							<span class="info-label">出生日期：</span>
							<span class="info-span">{{form.bornDay}}</span>
						</el-col>
						
					</el-row>
					<el-row class="view-info">
						<el-col :span="5">
							<span class="info-label">身高：</span>
							<span class="info-span">{{form.height}}CM</span>
						</el-col>
						<el-col :span="7">
							<span class="info-label">体重：</span>
							<span class="info-span">{{form.weight}}KG</span>
						</el-col>
						<el-col :span="7">
							<span class="info-label">床号：</span>
							<span class="info-span">{{form.bedNumber}}</span>
						</el-col>
						<el-col :span="5">
							<span class="info-label">住院号：</span>
							<span class="info-span">{{form.id}}</span>
						</el-col>
						<!-- 诊断信息 -->
					</el-row>
				  <el-table :data="form.docAdviceDetailsList" class="dialog-table">
				    <el-table-column property="content" label="药品名称" align="center" :show-overflow-tooltip="true"></el-table-column>
				    <el-table-column property="spec" label="规格" align="center"></el-table-column>
				    <el-table-column property="dose" label="剂量" align="center"></el-table-column>
						<!-- 数量 -->
						<!-- 备注 -->
				  </el-table>
					<p class="dialog-tip">系统审方结果</p>
					<div class="opinion-area">
						<template v-if="form.systemCheckResult.executeType == 0">
							<!-- <div class="opinion-ok">未通过</div> -->
							<div class="option-no" >
								<div class="no-tip">{{form.systemCheckResult.censorItem}}</div>
								<div class="no-desc">
									{{form.systemCheckResult.description}}
								</div>
							</div>
						</template>
						<div class="opinion-ok" v-else-if="form.systemCheckResult.executeType == 1">通过</div>
					</div>
					<p class="dialog-tip">人工审方结果</p>
					<div class="opinion-area">
						<div class="opinion-ok" v-if="form.personCheckResult.executeType == 0">未通过</div>
						<div class="opinion-ok" v-else-if="form.personCheckResult.executeType == 1">通过</div>
					</div>
				</el-dialog>
		</el-row>
		
	</div>
</template>

<script>
	export default{
		data() {
			return {
				dialogFormVisible: false,
				page: 1,
				currentPage: 1,
				length: 15,
				total: 400,
				// 科室选择
				departmentList: [],
				// 搜索form
				searchForm: {
					searchData: '',
					code: '',
					checkStatus: '',
					drugType: '',
					departmentName: ''
				},
				// 处方状态list
				checkStatusList: [
					{name: '未审', id: 1},
					{name: '通过', id: 2},
					{name: '未通过', id: 3},
					{name: '已停', id: 4},
					{name: '暂停', id: 5},
				],
				// 药品分类list
				drugTypeList: [
					{name: '普', id: 1},
					{name: '抗', id: 2},
					{name: '化', id: 3},
					{name: '营', id: 4},
					{name: '中', id: 5},
				],
				form: {
					departmentWardName: "",
					startTime: "",
					endTime: "",
					userName: "",
					frequency: "",
					patientsName: "",
					gander: "",
					bornDay: "",
					height: "",
					weight: "",
					bedNumber: "",
					id: "",
					docAdviceDetailsList: [],
				  systemCheckResult: {
						executeType: '',
						censorItem: '',
						description: ''
					},
					personCheckResult: {
						executeType: ''
					},
				},			
				systemCheckOrPersonCheckList: [],
				tableData: [],
				// excel数据
				column: [
					{title:'序号',key:'index'},
					{title:'医嘱号',key:'id'},
					{title:'状态',key:'checkStatusName'},
					{title:'分类',key:'drugTypeName'},
					{title:'频次',key:'frequency'},
					{title:'病区',key:'ward'},
					{title:'床号',key:'bedNumber'},
					{title:'患者',key:'patientsName'},
					{title:'接收时间',key:'createTime'},
					{title:'停止日期',key:'endTime'},
					{title:'开始日期',key:'startTime'},
					{title:'系统审方结果',key:'checkStatusHis'},
					{title:'住院号',key:'beInHospitalId'},
					{title:'病人编号',key:'patientCodeHis'},
				],
				docAdviceId: '',//处方医嘱id用来查询
			}
		},
		mounted() {
			this.getGroup();
			this.getDepartment();
			this.initTable();
		},
		methods: {
			// 获取组别
			getGroup() {
				let apiurl = this.api.slelectDepartmentGroup;
				this.common.getAxios(apiurl, this.returnGroup);
			},
			returnGroup(res) {
				this.systemCheckOrPersonCheckList = res.data.data;
			},
			getGroupDepartment() {
				let apiurl = this.api.slelectDepartment+'?departmentGroupid='+this.searchForm.systemCheckOrPersonCheck;
				this.common.getAxios(apiurl, this.returnGroupDepartment);
			},
			returnGroupDepartment(res) {
				this.departmentList = res.data.data;
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
			// 获取部门信息
			getDepartment() {
				let apiurl = this.api.selectDepartmentListPage+'?page=1&length=10000';
				if(this.searchForm.departmentName != '') {
					apiurl += '&departmentName='+this.searchForm.departmentName;
				}
				this.common.getAxios(apiurl, this.returnDepartment);
			},
			returnDepartment(res) {
				if(res.data.status) {
					this.departmentList = res.data.data.list;
				} else {
					this.$message.error(res.data.msg);
				}
			},
			selDepartment(departmentName) {
				this.searchForm.departmentName = departmentName;
				this.initTable();
			},
			// 初始化table
			initTable() {
				this.page = 1;
				this.getTable();
			},
			// 获取table信息
			getTable() {
				let apiurl = this.api.selectDocAdviceDetailsList+'?page='+this.page+'&length='+this.length;
				if(this.searchForm.checkStatus != '') {
					apiurl += '&checkStatus='+this.searchForm.checkStatus;
				}
				if(this.searchForm.drugType != '') {
					apiurl += '&drugType='+this.searchForm.drugType;
				}
				if(this.searchForm.departmentName != '') {
					apiurl += '&departmentName='+this.searchForm.departmentName;
				}
				if(this.searchForm.searchData != '') {
					apiurl += '&startTime='+this.searchForm.searchData[0]+'&endTime='+this.searchForm.searchData[1];
				}
				this.common.getAxios(apiurl, this.returnTable);
			},
			returnTable(res) {
				var list = res.data.data.list;
				for(var i in list) {
					list[i].startTime = this.moment(list[i].startTime).format("YYYY-MM-Do HH:mm:ss");
					list[i].endTime = this.moment(list[i].endTime).format("YYYY-MM-Do HH:mm:ss");
				}
				this.tableData = res.data.data.list;
				this.total = res.data.data.total;
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
			viewTable(index, row) {
				let _this = this;
				this.docAdviceId = row.id;
				this.getDesc();
			},
			// 获取处方详情
			getDesc() {
				let apiurl = this.api.selectDocAdviceDetailsListOther+'?docAdviceDetailsId='+this.docAdviceId;
				this.common.getAxios(apiurl, this.returnDesc);
			},
			returnDesc(res) {
				console.log(res)
				this.form = res.data.data.docAdviceInfoVO;
				this.form.systemCheckResult = res.data.data.systemCheckResult;
				this.form.personCheckResult = res.data.data.personCheckResult;
				this.dialogFormVisible = true;
			},
			// excel导出打印
			downloadExcel() {
				let apiurl = this.api.selectDocAdviceDetailsListPrint+'?page=1';
				if(this.searchForm.checkStatus != '') {
					apiurl += '&checkStatus='+this.searchForm.checkStatus;
				}
				if(this.searchForm.drugType != '') {
					apiurl += '&drugType='+this.searchForm.drugType;
				}
				if(this.searchForm.departmentName != '') {
					apiurl += '&departmentName='+this.searchForm.departmentName;
				}
				if(this.searchForm.searchData != '') {
					apiurl += '&startTime='+this.searchForm.searchData[0]+'&endTime='+this.searchForm.searchData[1];
				}
				this.common.getAxios(apiurl, this.returnDownloadExcel);
			},
			returnDownloadExcel(res) {
				if(res.data.status) {
					let list = res.data.data;
					for(var i in list) {
						list[i].index = Number(i) + 1;
						if(list[i].checkStatus==1) {
							list[i].checkStatusName = '未审';
						} else if(list[i].checkStatus==2) {
							list[i].checkStatusName = '通过';
						} else if(list[i].checkStatus==3) {
							list[i].checkStatusName = '未通过';
						} else if(list[i].checkStatus==4) {
							list[i].checkStatusName = '已停';
						} else if(list[i].checkStatus==5) {
							list[i].checkStatusName = '暂停';
						}
						if(list[i].drugType==1) {
							list[i].drugTypeName = '普';
						} else if(list[i].drugType==2) {
							list[i].drugTypeName = '抗';
						} else if(list[i].drugType==3) {
							list[i].drugTypeName = '化';
						} else if(list[i].drugType==4) {
							list[i].drugTypeName = '营';
						} else if(list[i].drugType==5) {
							list[i].drugTypeName = '中';
						}
					}
					this.exportExcel.export2Excel(this.column, list, "处方列表");
				}
			}
		}
	}
</script>

<style scoped>
	/* 编辑表单 */
	.view-dialog >>> .el-dialog{
		width: 70%;
		margin: 0 auto;
	}
	.info-label{
		width: 6rem;
		display: inline-block;
		text-align: right;
	}
	.view-dialog >>> .el-dialog__body{
		padding-top: 0;
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
		cursor:pointer;
	}
	.input-tip{
		margin-left: 1rem;
	}
	.view-info{
		font-size: 1.2rem;
		margin-top: 1rem;
	}
	.info-span{
		margin-right: 4rem;
	}
	.dialog-tip{
		font-size: 1.4rem;
		font-weight: bold;
	}
	{
		width: 100%;
	}
	.dialog-table >>> td,.dialog-table >>> th {
		border-bottom: 0.1rem solid #D5D4D4;
	}
	.dialog-table >>> th {
		border-top: 0.1rem solid #D5D4D4;
	}
	.dialog-table {
		border-left:  0.1rem solid #D5D4D4;
		border-right:  0.1rem solid #D5D4D4;
		margin-top: 2rem;
	}
	.dialog-table >>> th {
	    padding: 0.4rem 0px;
	    font-size: 14px;
	}
	.opinion-ok{
		color: #6791E5;
		font-size: 1.4rem;
		font-weight: bold;
		letter-spacing: 0.1rem;
	}
	.no-tip{
		color: #ED0C0C;
		font-size: 1.4rem;
		font-weight: bold;
		letter-spacing: 0.1rem;
	}
	.no-desc{
		color: #333333;
		font-size: 1.2rem;
		margin-top: 1rem;
	}
	.search-btn:first-child{
		margin-bottom: 1rem;
	}
	.margin-top{
		margin-top: 1rem;
	}
</style>
