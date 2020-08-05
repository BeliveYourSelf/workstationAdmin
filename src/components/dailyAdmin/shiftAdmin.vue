<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>日常管理</el-breadcrumb-item>
		  <el-breadcrumb-item>排班</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="width-style">
			<!-- 搜索区域 -->
			<div class="search-area">
				<el-row>
					<el-col :span="2" class="search-btn-area left-col">
						<!-- <el-tooltip class="item" effect="dark" content="提交" placement="top-start" v-show="updateSet">
							<el-button class="el-icon-check search-btn" type="primary"></el-button>
						</el-tooltip> -->
						<el-tooltip class="item" effect="dark" content="创建排班表" placement="top-start" v-show="insertTableSet">
							<el-button class="el-icon-plus add-schedule" type="primary" @click="addSchedule"></el-button>
						</el-tooltip>
						
					</el-col>
					<el-col :span="22" class="right-col">
						<el-select v-model="searchForm.schedulingCategoryId" placeholder="请选择排班表" @change="getDetails">
							<el-option v-for="list in scheduleNameList" :value="list.id" :key="list.id" :label="list.schedulingName"
							 clearable filterable>
							</el-option>
						</el-select>
					</el-col>
				</el-row>
			</div>
			<div class="table-name">{{schedulingName}}</div>
			<div class="table-input-tip">
				<span class="input-tip">A班 08:00-14:00</span>
				<span class="input-tip">B班 14:00-22:00</span>
				<span class="input-tip">C班 22:00-08:00</span>
			</div>
			<div class="test-main">
				<!-- 删除red -->
				<!-- 编辑blue -->
				<el-table class="main-table" :data="tableData" style="width: 100%" :row-class-name="tableRowClassName"
				 :header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}">
					<el-table-column fixed prop="pharmacistName" label="药师姓名" align="center"></el-table-column>
					
					<el-table-column fixed label="时段" align="center" :show-overflow-tooltip="true">
						<template slot-scope="scope">
							<!-- <p class="shift-radio" v-for="list in timeList">{{list.timeInterval}}</p> -->
							<p class="shift-radio">A</p>
							<p class="shift-radio">B</p>
							<p class="shift-radio">C</p>
						</template>
					</el-table-column>
					<template v-for="(item, index) in tableData[0].schedulingDetailList">
						<el-table-column align="center" min-width="120px">
							<template slot="header" slot-scope="scope">
								<p class="my-header">{{item.date}}</p>
								<p class="my-header">{{item.weekend}}</p>
							</template>
							<template slot-scope="scope">
								<el-radio-group 
								 v-model="scope.row.schedulingDetailList[index].timeInterval" 
								 >
								 <!-- @change="((label,row)=>{changeTime(label,scope.row.schedulingDetailList[index])})" -->
									<el-radio 
									 class="shift-radio" 
									 label="A" 
									 @click.native.prevent="redioClick('A',scope.row.schedulingDetailList[index].timeInterval,scope.$index,index)"
									 :disabled="!updateSet">&nbsp;</el-radio>
									<el-radio 
									 class="shift-radio" 
									 label="B" 
									 @click.native.prevent="redioClick('B',scope.row.schedulingDetailList[index].timeInterval,scope.$index,index)"
									 :disabled="!updateSet">&nbsp;</el-radio>
									<el-radio
									 class="shift-radio" 
									 label="C" 
									 @click.native.prevent="redioClick('C',scope.row.schedulingDetailList[index].timeInterval,scope.$index,index)"
									 :disabled="!updateSet">&nbsp;</el-radio>
								</el-radio-group>
							</template>
						</el-table-column>
					</template>

				</el-table>
				<div class="block page-area">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
					 :page-sizes="[15, 20, 50, 100]" :page-size="length" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</div>

			<el-dialog title="新增" :visible.sync="dialogFormVisible" :before-close="clearForm">
				<el-form :model="addForm" class="add-form" ref="addForm">
					<el-form-item label="排班表名称" :label-width="labelWidth">
						<el-input v-model="addForm.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="日期" :label-width="labelWidth">
						<el-date-picker
						 v-model="addForm.searchData" 
						 type="daterange" 
						 range-separator="至" 
						 start-placeholder="开始日期"
						 end-placeholder="结束日期" 
						 class="data-picker-set"
						 value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="saveTable">确 定</el-button>
					<el-button @click="clearForm">取 消</el-button>
				</div>
			</el-dialog>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				currentPage: 1,
				length: 15,
				total: 0,
				dialogFormVisible: false, //false
				labelWidth: '80px',
				searchForm: {
					searchData: '',
					code: '',
					name: '',
					schedulingCategoryId: ''
				},
				addForm: {
					searchData: '',
					name: ''
				},
				tableData: [],
				timeList: [],
				scheduleNameList: [],
				tableHeader: [],
				baseList: [],
				insertSet: '',
				insertTableSet: '',
				updateSet: '',
				schedulingCategoryId: '',
				radio: '',
				schedulingName: ''
			}
		},
		mounted() {
			let permissionList = JSON.parse(sessionStorage.getItem('permissionList'));
			let index = this.$route.query.index;
			let childrenIndex = this.$route.query.childrenIndex;
			this.insertTableSet = this.common.permissionSet(index,childrenIndex,permissionList,'insert_table');
			this.insertSet = this.common.permissionSet(index,childrenIndex,permissionList,'insert');
			this.updateSet = this.common.permissionSet(index,childrenIndex,permissionList,'update');
			this.getNameList();
			this.getDetails();
		},
		methods: {
			redioClick(e,originalVal,indexOne,indexTwo) {
				console.log(e,originalVal,indexOne,indexTwo)
				e == originalVal?
				(this.tableData[indexOne].schedulingDetailList[indexTwo].timeInterval = 'D'):
				(this.tableData[indexOne].schedulingDetailList[indexTwo].timeInterval = e);
				console.log(this.tableData[indexOne].schedulingDetailList[indexTwo])
				this.changeTime(this.tableData[indexOne].schedulingDetailList[indexTwo]);
			},
			// 更新排班
			changeTime(row) {
				console.log(row);
				let apiurl = this.api.updateSchedulingDetailList;
				row.day = row.day<10&&row.day.length>1?row.day.substr(1):row.day;
				row.month = row.month<10&&row.month.length>1?row.month.substr(1):row.month;
				console.log(row.day)
				let schedulingDetail = {
					timeInterval: row. timeInterval,
					year: row.year,
					month: row.month,
					day: row.day,
					used: row.used,
					userId: row.userId,
					schedulingId: this.schedulingCategoryId
				}
				this.common.putAxios(apiurl, schedulingDetail, this.returnUpdate);
			},
			returnUpdate(res) {
				if(res.data.status) {
					this.$message.success('成功');
				} else {
					this.$message.error(res.data.msg);
				}
			},
			// 新增排班表
			saveTable() {
				let apiurl = this.api.insertSchedulingCategory;
				let schedulingCategory = {
					startTime: this.addForm.searchData[0],
					endTime: this.addForm.searchData[1],
					schedulingName: this.addForm.name
				}
				this.common.postAxios(apiurl, schedulingCategory, this.returnSaveTable)
			},
			returnSaveTable(res) {
				if(res.data.status) {
					this.$message.success('新增成功');
					this.dialogFormVisible = false;
					this.addForm = {
						name: '',
						searchData: ''
					}
					this.getNameList();
				} else {
					this.$message.error(res.data.msg);
				}
			},
			// 获取排班表明细
			getDetails() {
				let apiurl = this.api.getSchedulingCategoryAndDetailsLastTime 
										+ '?pageNum='+this.page
										+ '&pageSize='+this.length
				if(this.searchForm.schedulingCategoryId != '') {
					apiurl+='&schedulingCategoryId='+this.searchForm.schedulingCategoryId;
				}
										// + '&schedulingCategoryId=1';
				this.common.getAxios(apiurl, this.returnDetails);
			},
			returnDetails(res) {
				let _this = this;
				this.total = res.data.data.total;
				this.schedulingName = res.data.data.schedulingName;
				let schedulingDetailsHeadList = res.data.data.schedulingDetailsHeadList;
				this.schedulingCategoryId=schedulingDetailsHeadList[0].schedulingCategoryId;
				for(var i in schedulingDetailsHeadList) {
					for(var j in schedulingDetailsHeadList[i].schedulingDetailList) {
						schedulingDetailsHeadList[i].schedulingDetailList[j].month
						=schedulingDetailsHeadList[i].schedulingDetailList[j].month<10
						?'0'+schedulingDetailsHeadList[i].schedulingDetailList[j].month:
						schedulingDetailsHeadList[i].schedulingDetailList[j].month;
						schedulingDetailsHeadList[i].schedulingDetailList[j].day
						=schedulingDetailsHeadList[i].schedulingDetailList[j].day<10
						?'0'+schedulingDetailsHeadList[i].schedulingDetailList[j].day:
						schedulingDetailsHeadList[i].schedulingDetailList[j].day;
						schedulingDetailsHeadList[i].schedulingDetailList[j].date
						=schedulingDetailsHeadList[i].schedulingDetailList[j].year+'-'
						+schedulingDetailsHeadList[i].schedulingDetailList[j].month+'-'
						+schedulingDetailsHeadList[i].schedulingDetailList[j].day;
						schedulingDetailsHeadList[i].schedulingDetailList[j].weekend 
						=this.moment(schedulingDetailsHeadList[i].schedulingDetailList[j].date).format('ddd');
						console.log(schedulingDetailsHeadList[i].schedulingDetailList[j].timeInterval)
						
					}
				}
				console.log(schedulingDetailsHeadList)
				this.tableData = schedulingDetailsHeadList;
			},
			// 查看排班表名称列表
			getNameList() {
				let apiurl = this.api.getSchedulingCategory;
				this.common.getAxios(apiurl, this.returnNameList);
			},
			returnNameList(res) {
				if (res.data.status) {
					this.scheduleNameList = res.data.data;
				}
			},
			// 根据起始时间计算出所有时间
			getDate() {
				let _this = this;
				let startDate = '2020-06-02';
				let endDate = '2020-06-7';
				let dateList = this.getAllDate(startDate, endDate);
				let list = dateList.map(item => {
					return {
						date: _this.moment(item).format('YYYY-MM-DD'),
						weekend: _this.moment(item).format('ddd'),
						shiftValue: '3',
					}
				})
				this.tableHeader = list;
			},

			// 根据起始时间计算中间时间
			getAllDate: (start, end) => {
				let dateArr = []
				let startArr = start.split('-')
				let endArr = end.split('-')
				let db = new Date()
				db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2])
				let de = new Date()
				de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2])
				let unixDb = db.getTime()
				let unixDe = de.getTime()
				let stamp
				const oneDay = 24 * 60 * 60 * 1000;
				for (stamp = unixDb; stamp <= unixDe;) {
					dateArr.push(stamp)
					stamp = stamp + oneDay
				}
				return dateArr
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
			// 表头自定义
			headerFunction: function(h, {
				column,
				$index
			}) {
				console.log(column)
				console.log(h)
				console.log($index)
				let tebleHeader = this.tebleHeader;
				return (
					`<p>${column.date}</P><p>${column.weekend}</P>`
				)
				// let date = new Date();
				// console.log(this.moment().weekday())
				// // return(
				// // ) 
			},
			// 数据size改变
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			// 页数改变
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			// 创建排班表弹窗
			addSchedule() {
				this.dialogFormVisible = true;
			},
			// 重置表单
			clearForm() {
				let _this = this;
				_this.$refs['addForm'].resetFields(); //重置表单
				_this.dialogFormVisible = false;
			}
		}
	}
</script>

<style scoped>
	/* 编辑表单 */
	.add-form {
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
		width: 100%;
	}

	.input-tip {
		letter-spacing: 0.1rem;
	}

	.input-tip:not(:first-child) {
		margin-left: 4rem;
	}

	.add-schedule {
		margin-left: 1rem;
	}

	.my-header {
		font-size: 1.4rem;
		line-height: 2rem;
		margin: 0;
	}

	.shift-radio {
		display: block;
		line-height: 3.3rem;
		margin: 0;
	}

	.table-name {
		font-size: 1.8rem;
		font-weight: bold;
		text-align: center;
		line-height: 5rem;
	}

	.table-input-tip {
		text-align: center;
	}
</style>
