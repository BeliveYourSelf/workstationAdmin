<template>
	<div class="con-area">
		<el-row class="my-row">
			<el-col :span="4" class="staff-col">
				<div class="search-staff">
					<el-input
						class="search-code"
						placeholder="请输入科室"
						v-model="searchForm.code"
						suffix-icon="el-icon-search"
						clearable>
					</el-input>
					<ul class="staff-ul">
						<li>肾脏内科</li>
						<li>血液内科</li>
						<li>甲状腺外科一</li>
						<li>呼吸内五科</li>
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
								<span class="input-tip">状态：</span>
								<el-input
									class="input-width"
									placeholder="不良反应类别:"
									v-model="searchForm.name"
									clearable>
								</el-input>
								<span class="input-tip">分类：</span>
								<el-input
									class="input-width"
									placeholder="不良反应类别:"
									v-model="searchForm.name"
									clearable>
								</el-input>
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
							:header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}">
								<el-table-column type="index" :index="indexMethod" label="序号" width="100" align="center">
								</el-table-column>
								<el-table-column prop="medicalOrderNumber" label="医嘱号" align="center" width="100"></el-table-column>
								<el-table-column prop="status" label="状态" align="center"></el-table-column>
								<el-table-column prop="type" label="分类" align="center"></el-table-column>
								<el-table-column prop="frequency" label="频次" align="center"></el-table-column>
								<el-table-column prop="ward" label="病区" align="center" :show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="bed" label="床号" align="center"></el-table-column>
								<el-table-column prop="patient" label="患者" align="center"></el-table-column>
								<el-table-column prop="receiveTime" label="接收时间" align="center" width="120"></el-table-column>
								<el-table-column prop="stopDate" label="停止日期" align="center" width="120"></el-table-column>
								<el-table-column prop="startDate" label="开始日期" align="center" width="120"></el-table-column>
								<el-table-column prop="systemsResult" label="系统审方结果" align="center" width="120"></el-table-column>
								<el-table-column prop="hospitalNumber" label="住院号" align="center" width="120" :show-overflow-tooltip="true"></el-table-column>
								<el-table-column prop="patientID" label="病人编号" align="center" width="120" :show-overflow-tooltip="true"></el-table-column>
								<el-table-column fixed="right" label="操作" width="120" align="center">
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
			</el-col>
				<el-dialog title="查看" :visible.sync="dialogFormVisible" class="view-dialog">
					<p class="dialog-tip">处方信息</p>
					<div class="view-info">
						<span>病区：</span>
						<span class="info-span">{{form.ward}}</span>
						<span>开始时间：</span>
						<span class="info-span">{{form.startDate}}</span>
						<span>停止时间：</span>
						<span class="info-span">{{form.stopDate}}</span>
						<span>医生：</span>
						<span class="info-span">{{form.patient}}</span>
						<span>频次：</span>
						<span class="info-span">{{form.frequency}}</span>
					</div>
					<div class="view-info">
						<span>患者：</span>
						<span class="info-span">{{form.patient}}</span>
						<span>性别：</span>
						<span class="info-span">女</span>
						<span>年龄：</span>
						<span class="info-span">87</span>
						<span>身高：</span>
						<span class="info-span">160CM</span>
						<span>体重：</span>
						<span class="info-span">60KG</span>
						<span>床号：</span>
						<span class="info-span">{{form.bed}}</span>
						<span>住院号：</span>
						<span class="info-span">{{form.hospitalNumber}}</span>
					</div>
				  <el-table :data="gridData" class="dialog-table">
				    <el-table-column property="name" label="药品" align="center"></el-table-column>
				    <el-table-column property="specification" label="规格" align="center"></el-table-column>
				    <el-table-column property="dose" label="剂量" align="center"></el-table-column>
				  </el-table>
					<p class="dialog-tip">系统审方结果</p>
					<div class="opinion-area">
						<div class="opinion-ok" v-if="form.systemsResult == 0">通过</div>
						<div class="option-no" v-else>
							<div class="no-tip">相互作用</div>
							<div class="no-desc">
								描述：两药物同时使用时可发生体内的药物相互作用，使药理效应增强或降低。
							</div>
						</div>
					</div>
					<p class="dialog-tip">人工审方结果</p>
					<div class="opinion-area">
						<div class="opinion-ok">通过</div>
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
				searchForm: {
					searchData: '',
					code: ''
				},
				gridData: [{
					name: '依托泊苷针（恒瑞）',
					specification: '5ml；0.1mg',
					dose: '0.1mg'
				},{
					name: '依托泊苷针（恒瑞）',
					specification: '5ml；0.1mg',
					dose: '0.1mg'
				},],
				form: {
					medicalOrderNumber: '636482475',
					status: '执行中',
					type: '化',
					frequency: 'QD',
					ward: '血液内科一',
					bed: '25',
					patient: '郭磊',
					receiveTime: '2020/5/18 15:09',
					stopDate: '2020/5/18 15:09',
					startDate: '2020/5/18 11:16',
					systemsResult: '0',
					hospitalNumber: 'ZY010003870820',
					patientID: '0003870820',
				},						
				tableData: [{
						medicalOrderNumber: '636482475',
						status: '执行中',
						type: '化',
						frequency: 'QD',
						ward: '血液内科一',
						bed: '25',
						patient: '郭磊',
						receiveTime: '2020/5/18 15:09',
						stopDate: '2020/5/18 15:09',
						startDate: '2020/5/18 11:16',
						systemsResult: '0',
						hospitalNumber: 'ZY010003870820',
						patientID: '0003870820',
					},{
						medicalOrderNumber: '637386470',
						status: '已停止',
						type: '营',
						frequency: 'PRN',
						ward: 'ICU',
						bed: '27',
						patient: '程建功',
						receiveTime: '2020/5/19 10:43',
						stopDate: '',
						startDate: '2020/5/19 9:39',
						systemsResult: '5',
						hospitalNumber: 'ZY010003853916',
						patientID: '0003853916',
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
			// 查看
			view(index, row) {
				let _this = this;
				_this.dialogFormVisible = true;
				// 回显数据
				_this.$nextTick(function(){
					_this.form = row;
				})
			}
		}
	}
</script>

<style scoped>
	/* 编辑表单 */
	.view-dialog >>> .el-dialog{
		width: 65%;
		margin: 0 auto;
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
	}
	.input-tip{
		margin-left: 2rem;
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
</style>
