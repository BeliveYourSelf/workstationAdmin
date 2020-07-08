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
					<el-col :span="20">
						<el-select v-model="searchForm.name" placeholder="请选择排班表">
							<el-option v-for="list in scheduleNameList" :value="list.id" :key="list.id" :label="list.schedulingName"
							 clearable filterable>
							</el-option>
						</el-select>
						<el-button class="el-icon-plus add-schedule" type="primary" plain @click="addSchedule">创建排班表</el-button>


					</el-col>
					<el-col :span="4" class="search-btn-area">
						<el-button class="search-btn" type="primary">提交排班</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="table-name">药师排班2020-06-01-2020-06-06（第1周）</div>
			<div class="table-input-tip">
				<span class="input-tip">A班 08:00-14:00</span>
				<span class="input-tip">B班 14:00-22:00</span>
				<span class="input-tip">C班 22:00-08:00</span>
			</div>
			<div class="test-main">

				<el-table class="main-table" :data="tableData" style="width: 100%" :row-class-name="tableRowClassName"
				 :header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}">
					<el-table-column prop="name" label="药师姓名" align="center"></el-table-column>
					<el-table-column label="时段" align="center" :show-overflow-tooltip="true">
						<template slot-scope="scope">
							<p class="shift-radio">A</p>
							<p class="shift-radio">B</p>
							<p class="shift-radio">C</p>
						</template>
					</el-table-column>
					<template v-for="(item, index) in tableHeader">
						<el-table-column :label="item.date" align="center" min-width="120px">
							<template slot="header" slot-scope="scope">
								<p class="my-header">{{item.date}}</p>
								<p class="my-header">{{item.weekend}}</p>
							</template>
							<template>
								<el-radio-group v-model="item.shiftValue">
									<el-radio class="shift-radio" label="1">&nbsp;</el-radio>
									<el-radio class="shift-radio" label="2">&nbsp;</el-radio>
									<el-radio class="shift-radio" label="3">&nbsp;</el-radio>
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
						<el-date-picker v-model="searchForm.searchData" type="daterange" range-separator="至" start-placeholder="开始日期"
						 end-placeholder="结束日期" class="data-picker-set">
						</el-date-picker>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="clearForm">确 定</el-button>
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
				total: 400,
				dialogFormVisible: false, //false
				labelWidth: '80px',
				searchForm: {
					searchData: '',
					code: '',
					name: ''
				},
				addForm: {
					searchData: '',
					name: ''
				},
				tableData: [{
					date: '2020-06-12 09:23',
					type: '医疗器械',
					name: '王晓红',
					userName: '王晓雯',
					room: '心血管内科',
					bed: 'Z-110',
					lavel: '一级',
					describe: '这是一个检测记录的描述这是一个检测记录的描述这是一个检测记录的描述'
				}],
				scheduleNameList: [],
				tableHeader: [],
				// 日期英文转数字
				englishInt: [{
						english: "one",
						int: '01'
					},
					{
						english: "two",
						int: '02'
					},
					{
						english: "three",
						int: '03'
					},
					{
						english: "four",
						int: '04'
					},
					{
						english: "five",
						int: '05'
					},
					{
						english: "six",
						int: '06'
					},
					{
						english: "seven",
						int: '07'
					},
					{
						english: "eight",
						int: '08'
					},
					{
						english: "nine",
						int: '09'
					},
					{
						english: "ten",
						int: '10'
					},
					{
						english: "eleven",
						int: '11'
					},
					{
						english: "twelve",
						int: '12'
					},
					{
						english: "thirteen",
						int: '13'
					},
					{
						english: "fourteen",
						int: '14'
					},
					{
						english: "fiveteen",
						int: '15'
					},
					{
						english: "sixteen",
						int: '16'
					},
					{
						english: "seventeen",
						int: '17'
					},
					{
						english: "eighteen",
						int: '18'
					},
					{
						english: "nineteen",
						int: '19'
					},
					{
						english: "twenty",
						int: '20'
					},
					{
						english: "twentyOne",
						int: '21'
					},
					{
						english: "twentyTwo",
						int: '22'
					},
					{
						english: "twentyThree",
						int: '23'
					},
					{
						english: "twentyFour",
						int: '24'
					},
					{
						english: "twentyFive",
						int: '25'
					},
					{
						english: "twentySix",
						int: '26'
					},
					{
						english: "twentySeven",
						int: '27'
					},
					{
						english: "twentyEight",
						int: '28'
					},
					{
						english: "twentyNine",
						int: '29'
					},
					{
						english: "thirty",
						int: '30'
					},
					{
						english: "thirtyOne",
						int: '31'
					},
				],
				baseList: [],
			}
		},
		mounted() {
			this.getDate();
			this.getNameList();
			this.getDetails();
		},
		methods: {
			// 获取排班表明细
			getDetails() {
				let apiurl = this.api.getSchedulingCategoryAndDetailsLastTime + '?schedulingCategoryId=1';
				this.common.getAxios(apiurl, this.returnDetails);
			},
			returnDetails(res) {
				// console.log(res)
				// let englishInt = this.englishInt;
				let schedulingDetailsList = res.data.data.schedulingDetailsList;
				let baseList = [];
				for (var i in schedulingDetailsList) {
					if (i == 0 || schedulingDetailsList[i].pharmacistId != schedulingDetailsList[i - 1].pharmacistId) {
						var obj = {
							schedulingCategoryId: schedulingDetailsList[i].schedulingCategoryId,
							pharmacistId: schedulingDetailsList[i].pharmacistId,
							pharmacistName: schedulingDetailsList[i].pharmacistName,
							schedulingDetailsList: [],
							englishInt: this.englishInt
						}
						baseList.push(obj)
					}
					for (var b in baseList) {
						// baseList[b].schedulingDetailsList = [];
						if (baseList[b].pharmacistId == schedulingDetailsList[i].pharmacistId) {
							baseList[b].schedulingDetailsList.push(schedulingDetailsList[i]);
						}
					}
				}
				this.handleBaseList(baseList)
			},
			//处理基本数组
			handleBaseList(baseList) {
				var monthKeys = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
					"thirteen", "fourteen", "fiveteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twentyOne",
					"twentyTwo", "twentyThree", "twentyFour", "twentyFive", "twentySix", "twentySeven", "twentyEight", "twentyNine",
					"thirty", "thirtyOne"
				]
				var arr = [];
				for (var i = 0; i < baseList.length; i++) {
					//遍历基础数组下值班表数组
					var obj = {
						pharmacistId: baseList[i].pharmacistId,
						pharmacistName: baseList[i].pharmacistName,
						schedulingCategoryId: baseList[i].schedulingCategoryId
					}
					var schedulingDetailsList = baseList[i].schedulingDetailsList;
					var englishInt = baseList[i].englishInt;
					obj.englishInt=this.handleEnglishInt(schedulingDetailsList, englishInt);
					arr.push(obj)
				}
				console.log(JSON.stringify(obj))
			},
			handleEnglishInt(schedulingDetailsList, englishInt) {
				var arr = [];
				for (var k = 0; k < schedulingDetailsList.length; k++) {
					var timeInterval = schedulingDetailsList[k].timeInterval;
					var year = schedulingDetailsList[k].year;
					var month = schedulingDetailsList[k].month;
					//遍历基础数组下英文日期数组
					for (var j = 0; j < englishInt.length; j++) {
						englishInt[j].year = year;
						englishInt[j].month = month;
						if (schedulingDetailsList[k][englishInt[j].english]) {
							englishInt[j].isJob = true;
							englishInt[j].timeInterval = timeInterval;
						}
					}
				}
				return englishInt
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
		margin-left: 1.5rem;
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
